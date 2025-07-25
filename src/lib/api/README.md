# API Client

Type-safe, auto-generated API client for our application using OpenAPI schemas and React Query.

## 📁 Structure

```
src/lib/api/
├── client.ts      ✨ (generated) - Main API client with auth
├── helpers.ts     ✨ (generated) - Server component functions
├── hooks.ts       ✨ (generated) - React Query hooks
├── hooksBase.ts   📋 (manual) - Base useTypedQuery/useTypedMutation utilities
├── types.ts       📋 (manual) - ApiError, QueryConfig interfaces
├── config.ts      📋 (manual) - Auth token management
└── index.ts       ✨ (generated) - Barrel exports
```

## 🚀 Quick Start

### 1. Generate TypeScript Types

```bash
# Generate types from OpenAPI schema
npx openapi-typescript openapi/api.json -o src/types/api.ts
```

### 2. Generate API Client

```bash
# Generate helpers, hooks, and client
npm run generate:api
```

### 3. Use in Components

**Client Components (React Query hooks):**

```typescript
"use client";
import { useGetUsersQuery, useCreateUserMutation } from "@/lib/api";

export function UsersList() {
  const { data: users, isLoading } = useGetUsersQuery();
  const createUser = useCreateUserMutation({
    onSuccess: () => console.log("User created!"),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={() => createUser.mutate({ name: "John" })}>
        Add User
      </button>
    </div>
  );
}
```

**Server Components (Direct helpers):**

```typescript
import { getUsers, createUser } from "@/lib/api";

export default async function UsersPage() {
  const { data: users } = await getUsers();

  return (
    <div>
      <h1>Users ({users?.length})</h1>
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 🔐 Authentication

### Login Flow

```typescript
import { useLoginMutation, setAuthToken } from "@/lib/api";

function LoginForm() {
  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      // Set token globally - all API calls will include it
      setAuthToken(data.access_token);

      // Redirect to dashboard
      router.push("/dashboard");
    },
  });

  const handleSubmit = (credentials) => {
    loginMutation.mutate(credentials);
  };
}
```

### Token Management

```typescript
import { setAuthToken, clearAuthToken, getAuthToken } from "@/lib/api";

// Set token (auto-applied to all requests)
setAuthToken("your-jwt-token");

// Check current token
const token = getAuthToken();

// Clear token (logout)
clearAuthToken();
```

## 📊 Error Handling

### Global Error Handling

All API calls return a consistent format:

```typescript
const { data, error } = await getUsers();

if (error) {
  console.error("API Error:", error.message);
  console.error("Status:", error.status);
  console.error("Details:", error.details);
}
```

### React Query Error Handling

```typescript
const { data, error, isError } = useGetUsersQuery(
  {},
  {
    onError: (error) => {
      toast.error(`Failed to load users: ${error.message}`);
    },
    retry: (failureCount, error) => {
      // Don't retry on 404 or auth errors
      if (error.status === 404 || error.status === 401) return false;
      return failureCount < 3;
    },
  }
);
```

## 🛠️ Development Workflow

### 1. Update API Schema

When your API changes, update the OpenAPI schema:

```bash
# Download latest schema from your API
curl https://api.yourapp.com/openapi.json > openapi/api.json
```

### 2. Regenerate Everything

```bash
# Update TypeScript types
npx openapi-typescript openapi/api.json -o src/types/api.ts

# Regenerate client code
npm run generate:api
```

### 3. Use New Endpoints

All new endpoints are immediately available:

```typescript
// If you added a new endpoint `POST /api/posts`
import { useCreatePostMutation } from "@/lib/api";

const createPost = useCreatePostMutation();
```

## 📋 Available Scripts

```json
{
  "scripts": {
    "generate:api": "node scripts/generate-api.js",
    "generate:types": "npx openapi-typescript openapi/api.json -o src/types/api.ts",
    "generate:all": "npm run generate:types && npm run generate:api"
  }
}
```

## 🎯 Best Practices

### Client vs Server Components

**✅ Use React Query hooks in client components:**

```typescript
"use client";
import { useGetUsersQuery } from "@/lib/api";

// Automatic caching, loading states, error handling
const { data, isLoading, error } = useGetUsersQuery();
```

**✅ Use helpers in server components:**

```typescript
import { getUsers } from "@/lib/api";

// Direct async/await calls
const { data } = await getUsers();
```

### Error Boundaries

Wrap your app in error boundaries to catch API errors:

```typescript
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <YourApp />
    </ErrorBoundary>
  );
}
```

### Query Keys

React Query keys are automatically generated with consistent patterns:

```typescript
["api", "getUsers"][("api", "getUsers", { page: 1 })][ // GET /users // GET /users?page=1
  ("api", "getUserById", { id: 123 })
]; // GET /users/123
```

## 🔧 Customization

### Custom Hook Options

You can override default React Query options:

```typescript
const { data } = useGetUsersQuery(
  {},
  {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    enabled: isLoggedIn, // Conditional queries
  }
);
```

### Custom Error Handling

```typescript
const mutation = useCreateUserMutation({
  onError: (error, variables, context) => {
    if (error.status === 409) {
      toast.error("User already exists");
    } else {
      toast.error("Failed to create user");
    }
  },
  onSuccess: (data, variables, context) => {
    toast.success("User created successfully");
    queryClient.invalidateQueries(["api", "getUsers"]);
  },
});
```

## 📚 TypeScript Benefits

### Full Type Safety

```typescript
// TypeScript knows the exact shape of your API
const { data } = useGetUsersQuery() // data is User[] | undefined

// Parameters are typed
const { data } = useGetUserByIdQuery({ id: 123 }) // id must be number

// Mutations are typed
createUser.mutate({
  name: 'John',     // ✅ Required
  email: 'john@...' // ✅ Required
  age: 'invalid'    // ❌ TypeScript error
})
```

### Auto-completion

Your IDE will provide full auto-completion for:

- All available endpoints
- Request parameters
- Response data structure
- Error types

## 🚨 Troubleshooting

### Common Issues

**Missing operationId in OpenAPI schema:**

```
⚠️ Endpoint GET /users missing operationId, skipping...
```

Solution: Add `operationId` to your OpenAPI schema endpoints.

**Type errors after schema update:**

```bash
# Regenerate types and client
npm run generate:all
```

**Authentication not working:**

```typescript
// Make sure token is set
import { setAuthToken, getAuthToken } from "@/lib/api";

console.log("Current token:", getAuthToken());
setAuthToken("your-token-here");
```

### Debug Mode

Enable request/response logging:

```typescript
// In client.ts, add debugging
apiClient.use({
  onRequest({ request }) {
    console.log("→", request.method, request.url);
    return request;
  },
  onResponse({ response }) {
    console.log("←", response.status, response.url);
    return response;
  },
});
```

## 🔄 Migration Guide

### From Manual Fetch

**Before:**

```typescript
const response = await fetch("/api/users", {
  headers: { Authorization: `Bearer ${token}` },
});
const users = await response.json();
```

**After:**

```typescript
const { data: users } = useGetUsersQuery();
```

### From Axios

**Before:**

```typescript
const response = await axios.get("/api/users");
const users = response.data;
```

**After:**

```typescript
const { data: users } = await getUsers(); // Server component
// or
const { data: users } = useGetUsersQuery(); // Client component
```
