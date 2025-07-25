// lib/services/profile.ts
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface ProfileData {
  email: string;
  company_name: string;
  company_code: string;
  company_vat_code: string;
  company_address: string;
  pickup_country: string;
  pickup_city: string;
  pickup_street: string;
  pickup_street_number: string;
  pickup_zip_code: string;
  return_country: string;
  return_city: string;
  return_street: string;
  return_street_number: string;
  return_zip_code: string;
  name: string;
  last_name: string;
  phone_number: string;
  bank_name: string;
  iban: string;
}

const getHeaders = () => {
  const token = Cookies.get("access_token");
  console.log("Access token from cookie:", token);
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const profileService = {
  async getProfile(): Promise<ProfileData> {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  async updateProfile(data: ProfileData): Promise<ProfileData> {
    const token = Cookies.get("access_token");
    console.log("Token being used:", token);

    const requestBody = JSON.stringify(data);
    console.log("Making POST request to:", `${API_BASE_URL}/api/profile`);
    console.log("Request headers:", {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
    console.log("Request body:", requestBody);

    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: requestBody,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        requestBody: requestBody,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    return response.json();
  },
};
