Based on the API documentation for PROFILE

## GET /api/profile

### Overview

- **Endpoint**: `/api/profile`
- **Method**: GET
- **Description**: Retrieves the authenticated user's profile details
- **Tags**: UserProfile
- **Operation ID**: getUserProfile

### Authentication

This endpoint requires authentication using an API key. The API key must be included in the request header.

### Request

No request parameters are required for this endpoint.

### Security

- **Type**: API Key
- **Name**: api_key
- **Location**: Header

### Responses

#### 200 OK - Success

Returns the user's profile details in JSON format.

Response body schema: `UserProfile`

```json
{
  "email": "user@example.com",
  "company_name": "Example Ltd.",
  "company_code": "12345678",
  "company_vat_code": "LT100001234",
  "company_address": "123 Business Street, Vilnius, Lithuania",
  "pickup_country": "Lithuania",
  "pickup_city": "Vilnius",
  "pickup_street": "Main Street",
  "pickup_street_number": "12A",
  "pickup_zip_code": "LT-12345",
  "return_country": "Lithuania",
  "return_city": "Kaunas",
  "return_street": "Return Avenue",
  "return_street_number": "5B",
  "return_zip_code": "LT-54321",
  "name": "John",
  "last_name": "Doe",
  "phone_number": "+37060000000",
  "bank_name": "Bank of Lithuania",
  "iban": "LT601010012345678901"
}
```

#### 401 Unauthorized

Returned when the user is not authenticated.

```json
{
  "error": "Unauthenticated"
}
```

### Example Request

```bash
curl -X GET "http://157.230.121.159/api/profile" \
     -H "api_key: your_api_key_here"
```

## POST /api/profile

The `POST /api/profile` endpoint is similar to `GET /api/profile` but serves a different purpose - it's for updating the user profile rather than retrieving it. Let me provide you with the details for this endpoint:

## POST /api/profile

### Overview

- **Endpoint**: `/api/profile`
- **Method**: POST
- **Description**: Updates the authenticated user's profile details
- **Tags**: UserProfile
- **Operation ID**: updateUserProfile

### Authentication

This endpoint requires authentication using an API key. The API key must be included in the request header.

### Request

The request must include a JSON body with the user profile data to update.

#### Required Fields:

- `company_name` (string): Company name
- `company_code` (string): Company registration code
- `company_vat_code` (string): Company VAT number
- `company_address` (string): Company address
- `pickup_country` (string): Country for pickup location
- `pickup_city` (string): City for pickup location
- `pickup_street` (string): Street for pickup location
- `pickup_street_number` (string): Street number for pickup location
- `pickup_zip_code` (string): ZIP code for pickup location
- `return_country` (string): Country for return location
- `return_city` (string): City for return location
- `return_street` (string): Street for return location
- `return_street_number` (string): Street number for return location
- `return_zip_code` (string): ZIP code for return location

#### Optional Fields:

- `name` (string): User's first name
- `last_name` (string): User's last name
- `phone_number` (string): User's phone number
- `bank_name` (string): Bank name
- `iban` (string): User's IBAN for financial transactions

### Security

- **Type**: API Key
- **Name**: api_key
- **Location**: Header

### Responses

#### 200 OK - Success

Returns the updated user profile details in JSON format.

Response body schema: `UserProfile` (same as for GET /api/profile)

#### 400 Bad Request

Returned when there are validation errors in the request data.

```json
{
  "error": "The company_name field is required."
}
```

#### 401 Unauthorized

Returned when the user is not authenticated.

```json
{
  "error": "Unauthenticated"
}
```

### Example Request

```bash
curl -X POST "http://157.230.121.159/api/profile" \
     -H "api_key: your_api_key_here" \
     -H "Content-Type: application/json" \
     -d '{
           "company_name": "Updated Company Ltd.",
           "company_code": "87654321",
           "company_vat_code": "LT100009876",
           "company_address": "456 New Street, Vilnius, Lithuania",
           "pickup_country": "Lithuania",
           "pickup_city": "Vilnius",
           "pickup_street": "New Street",
           "pickup_street_number": "456",
           "pickup_zip_code": "LT-54321",
           "return_country": "Lithuania",
           "return_city": "Kaunas",
           "return_street": "Return Road",
           "return_street_number": "10",
           "return_zip_code": "LT-12345",
           "name": "Jane",
           "last_name": "Smith",
           "phone_number": "+37060012345",
           "bank_name": "Bank of Lithuania",
           "iban": "LT601010012345678902"
         }'
```
