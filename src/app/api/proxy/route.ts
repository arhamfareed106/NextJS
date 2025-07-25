// src/app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

// Helper function to parse response safely
const parseResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");

  if (!contentType) {
    // No content type, try to get text
    const text = await response.text();
    return text || null;
  }

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch (e) {
      // If JSON parsing fails, get text
      console.warn("Failed to parse JSON response, falling back to text");
      return await response.text();
    }
  }

  // For non-JSON content types, return as text
  return await response.text();
};

// Helper function to make the proxied request
const makeProxiedRequest = async (
  url: string,
  method: string,
  headers: Record<string, string>,
  data?: any
) => {
  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Only include body for methods that typically have one
  // DELETE, GET, and HEAD should not have a body
  if (
    method !== "GET" &&
    method !== "DELETE" &&
    method !== "HEAD" &&
    data !== undefined
  ) {
    requestOptions.body = JSON.stringify(data);
  }

  // console.log('Proxy request:', {
  //   url,
  //   method,
  //   headers: requestOptions.headers,
  //   hasBody: !!requestOptions.body,
  //   bodyData: requestOptions.body ? 'Present' : 'None'
  // });

  return await fetch(url, requestOptions);
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, method = "POST", headers = {}, data } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (!method) {
      return NextResponse.json(
        { error: "Method is required" },
        { status: 400 }
      );
    }

    // Make the proxied request
    const response = await makeProxiedRequest(url, method, headers, data);

    // Parse the response
    const responseData = await parseResponse(response);

    // console.log('Proxy response:', {
    //   status: response.status,
    //   statusText: response.statusText,
    //   contentType: response.headers.get('content-type'),
    //   hasData: responseData !== null && responseData !== undefined,
    //   dataType: responseData
    // });

    // Return the response with the same status code
    // If responseData is null or undefined, return an empty object for successful requests
    const returnData =
      responseData !== null && responseData !== undefined
        ? responseData
        : response.ok
        ? {}
        : { error: "No response data" };

    return NextResponse.json(returnData, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);

    // Check if it's a fetch error (network issues, etc.)
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        { error: "Network error: Unable to reach the target server" },
        { status: 502 } // Bad Gateway
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process request",
        type: "proxy_error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    const headersParam = searchParams.get("headers");

    if (!url) {
      return NextResponse.json(
        { error: "URL parameter is required" },
        { status: 400 }
      );
    }

    let headers = {};
    if (headersParam) {
      try {
        headers = JSON.parse(headersParam);
      } catch (e) {
        console.warn("Failed to parse headers parameter, using empty headers");
      }
    }

    // Make the proxied request
    const response = await makeProxiedRequest(url, "GET", headers);

    // Parse the response
    const responseData = await parseResponse(response);

    // console.log('Proxy GET response:', {
    //   status: response.status,
    //   statusText: response.statusText,
    //   contentType: response.headers.get('content-type'),
    //   hasData: responseData !== null && responseData !== undefined
    // });

    // Return the response with the same status code
    const returnData =
      responseData !== null && responseData !== undefined
        ? responseData
        : response.ok
        ? {}
        : { error: "No response data" };

    return NextResponse.json(returnData, { status: response.status });
  } catch (error) {
    console.error("Proxy GET error:", error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        { error: "Network error: Unable to reach the target server" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process request",
        type: "proxy_error",
      },
      { status: 500 }
    );
  }
}
