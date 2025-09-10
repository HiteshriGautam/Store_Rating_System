# 📚 Store Rating Backend API Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL](#base-url)
4. [User Roles](#user-roles)
5. [API Endpoints](#api-endpoints)
6. [Request/Response Examples](#request-response-examples)
7. [Error Handling](#error-handling)
8. [Testing Guide](#testing-guide)
9. [Postman Collection](#postman-collection)

---

## 🎯 Overview

The Store Rating Backend API provides a comprehensive system for managing stores, users, and ratings with role-based authentication. Built with Express.js and MySQL, it supports three user roles with different access levels.

### 🛠️ Tech Stack
- **Backend**: Express.js (ES6 Modules)
- **Database**: MySQL with Connection Pooling
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: bcryptjs for password hashing
- **CORS**: Open policy for all origins

---

## 🔐 Authentication

### JWT Token Authentication
All protected endpoints require a valid JWT token in the Authorization header.

```http
Authorization: Bearer <your-jwt-token>
```

### Token Lifecycle
- **Expires In**: 7 days (configurable)
- **Format**: Bearer token
- **Validation**: Server validates token on each request

---

## 🌐 Base URL

```
http://localhost:5000
```

---

## 👥 User Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **System Administrator** | Full system access | Create users/stores, view all data, dashboard access |
| **Normal User** | Standard user access | Register, login, view stores, submit ratings |
| **Store Owner** | Store management access | Login, view store dashboard, see store ratings |

---

## 🛣️ API Endpoints

### 🏠 System Endpoints

#### Health Check
```http
GET /
```
**Access**: Public  
**Description**: Basic server status check

#### Detailed Health Status
```http
GET /health
```
**Access**: Public  
**Description**: Detailed server health information

---

### 🔐 Authentication Endpoints (`/api/auth`)

#### 1. User Registration
```http
POST /api/auth/register
```
**Access**: Public (Normal Users only)  
**Description**: Register a new normal user account

**Request Body**:
```json
{
  "name": "John Doe Smith Example User",
  "email": "john@example.com",
  "password": "Password123!",
  "address": "123 Main Street, Example City"
}
```

**Validation Rules**:
- `name`: 2-60 characters
- `email`: Valid email format
- `password`: 8-16 characters, must include uppercase letter and special character
- `address`: Max 400 characters (optional)

#### 2. User Login
```http
POST /api/auth/login
```
**Access**: Public (All roles)  
**Description**: Authenticate user and receive JWT token

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

#### 3. Update Password
```http
PUT /api/auth/password
```
**Access**: Authenticated users  
**Description**: Update user password

**Request Body**:
```json
{
  "currentPassword": "Password123!",
  "newPassword": "NewPassword456@"
}
```

---

### 👥 User Management Endpoints (`/api/users`)

#### 4. Get Dashboard Statistics
```http
GET /api/users/dashboard/stats
```
**Access**: System Administrator only  
**Description**: Get system-wide statistics

#### 5. Get All Users
```http
GET /api/users
```
**Access**: System Administrator only  
**Description**: Retrieve all users with filtering and sorting

**Query Parameters**:
- `name`: Filter by name (partial match)
- `email`: Filter by email (partial match)
- `address`: Filter by address (partial match)
- `role`: Filter by role (exact match)
- `sortBy`: Sort field (name, email, role, created_at)
- `sortOrder`: Sort direction (ASC, DESC)

**Example**:
```http
GET /api/users?name=john&role=Normal User&sortBy=created_at&sortOrder=DESC
```

#### 6. Create New User
```http
POST /api/users
```
**Access**: System Administrator only  
**Description**: Create a new user with any role

**Request Body**:
```json
{
  "name": "Jane Smith Example Store Owner",
  "email": "jane@storeowner.com",
  "password": "StorePass123!",
  "address": "456 Business Street, Commerce City",
  "role": "Store Owner"
}
```

#### 7. Get User by ID
```http
GET /api/users/{id}
```
**Access**: System Administrator only  
**Description**: Get detailed user information by ID

---

### 🏪 Store Management Endpoints (`/api/stores`)

#### 8. Get Store Owner Dashboard
```http
GET /api/stores/dashboard
```
**Access**: Store Owner or System Administrator  
**Description**: Get store dashboard data for store owners

#### 9. Get All Stores
```http
GET /api/stores
```
**Access**: All authenticated users  
**Description**: Get all stores with optional search and sorting

**Query Parameters**:
- `name`: Search by store name (partial match)
- `address`: Search by store address (partial match)
- `sortBy`: Sort field (name, email, address, average_rating, total_ratings, created_at)
- `sortOrder`: Sort direction (ASC, DESC)

**Example**:
```http
GET /api/stores?name=pizza&address=downtown&sortBy=average_rating&sortOrder=DESC
```

#### 10. Create New Store
```http
POST /api/stores
```
**Access**: System Administrator only  
**Description**: Create a new store

**Request Body**:
```json
{
  "name": "Pizza Palace Downtown",
  "email": "contact@pizzapalace.com",
  "address": "789 Food Street, Downtown District",
  "owner_email": "jane@storeowner.com"
}
```

#### 11. Get Store by ID
```http
GET /api/stores/{id}
```
**Access**: All authenticated users  
**Description**: Get detailed store information

#### 12. Get Store Ratings
```http
GET /api/stores/{id}/ratings
```
**Access**: Store Owner (own store) or System Administrator  
**Description**: Get all ratings for a specific store

---

### ⭐ Rating Management Endpoints (`/api/ratings`)

#### 13. Submit Rating
```http
POST /api/ratings
```
**Access**: Normal User or System Administrator  
**Description**: Submit a new rating for a store

**Request Body**:
```json
{
  "store_id": 123,
  "rating": 5
}
```

**Validation**:
- `store_id`: Valid store ID (integer)
- `rating`: Integer between 1-5

#### 14. Update Rating
```http
PUT /api/ratings
```
**Access**: Normal User or System Administrator  
**Description**: Update an existing rating

**Request Body**:
```json
{
  "store_id": 123,
  "rating": 4
}
```

#### 15. Get User's Rating for Store
```http
GET /api/ratings/store/{storeId}
```
**Access**: Normal User or System Administrator  
**Description**: Get current user's rating for a specific store

---

## 📝 Request/Response Examples

### ✅ Successful Login Response
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJOb3JtYWwgVXNlciIsImlhdCI6MTcwNDY5NjYzOCwiZXhwIjoxNzA1MzAxNDM4fQ.signature",
  "user": {
    "id": 1,
    "name": "John Doe Smith Example User",
    "email": "john@example.com",
    "role": "Normal User"
  }
}
```

### 🏪 Get Stores Response (Normal User)
```json
[
  {
    "id": 1,
    "name": "Pizza Palace Downtown",
    "email": "contact@pizzapalace.com",
    "address": "789 Food Street, Downtown District",
    "owner_id": 2,
    "average_rating": "4.5",
    "total_ratings": 10,
    "created_at": "2025-01-08T06:37:18.000Z",
    "updated_at": "2025-01-08T07:15:30.000Z",
    "user_rating": 5,
    "user_rating_date": "2025-01-08T07:15:30.000Z"
  },
  {
    "id": 2,
    "name": "Burger Junction",
    "email": "info@burgerjunction.com",
    "address": "456 Fast Food Lane, Food Court",
    "owner_id": 3,
    "average_rating": "3.8",
    "total_ratings": 7,
    "created_at": "2025-01-08T08:20:15.000Z",
    "updated_at": "2025-01-08T09:10:45.000Z",
    "user_rating": null,
    "user_rating_date": null
  }
]
```

### 📊 Dashboard Statistics Response
```json
{
  "totalUsers": 25,
  "totalStores": 8,
  "totalRatings": 142
}
```

### 🏪 Store Owner Dashboard Response
```json
{
  "store": {
    "id": 1,
    "name": "Pizza Palace Downtown",
    "email": "contact@pizzapalace.com",
    "address": "789 Food Street, Downtown District",
    "average_rating": "4.5",
    "total_ratings": 10
  },
  "ratings": [
    {
      "id": 1,
      "user_id": 5,
      "store_id": 1,
      "rating": 5,
      "created_at": "2025-01-08T07:15:30.000Z",
      "updated_at": "2025-01-08T07:15:30.000Z",
      "user_name": "John Doe Smith Example User",
      "user_email": "john@example.com"
    },
    {
      "id": 2,
      "user_id": 6,
      "store_id": 1,
      "rating": 4,
      "created_at": "2025-01-08T08:22:15.000Z",
      "updated_at": "2025-01-08T08:22:15.000Z",
      "user_name": "Alice Johnson Sample User Name",
      "user_email": "alice@example.com"
    }
  ]
}
```

---

## 🚨 Error Handling

### Error Response Format
```json
{
  "message": "Error description",
  "error": "ERROR_CODE",
  "timestamp": "2025-01-08T06:48:09.000Z"
}
```

### Common Error Codes

#### 400 - Bad Request
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name must be between 20 and 60 characters"
    },
    {
      "field": "password",
      "message": "Password must contain at least one uppercase letter and one special character"
    }
  ]
}
```

#### 401 - Unauthorized
```json
{
  "message": "Access token required",
  "error": "MISSING_TOKEN"
}
```

```json
{
  "message": "Invalid email or password",
  "error": "INVALID_CREDENTIALS"
}
```

#### 403 - Forbidden
```json
{
  "message": "Access denied. Insufficient permissions.",
  "requiredRoles": ["System Administrator"],
  "userRole": "Normal User",
  "error": "INSUFFICIENT_PERMISSIONS"
}
```

```json
{
  "message": "Token expired",
  "error": "TOKEN_EXPIRED"
}
```

#### 404 - Not Found
```json
{
  "message": "Store not found",
  "error": "STORE_NOT_FOUND"
}
```

#### 500 - Internal Server Error
```json
{
  "message": "Internal server error",
  "error": "DATABASE_ERROR"
}
```

---

## 🧪 Testing Guide

### Prerequisites
1. Server running on `http://localhost:5000`
2. MySQL database connected
3. Environment variables configured

### Testing with cURL

#### 1. Test Server Health
```bash
curl http://localhost:5000/health
```

#### 2. Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Smith Example User",
    "email": "john@example.com",
    "password": "Password123!",
    "address": "123 Main Street, Example City"
  }'
```

#### 3. Login to Get JWT Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123!"
  }'
```

#### 4. Get All Stores (Save token from step 3)
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:5000/api/stores
```

#### 5. Submit a Rating
```bash
curl -X POST http://localhost:5000/api/ratings \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "store_id": 1,
    "rating": 5
  }'
```

#### 6. Search Stores
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "http://localhost:5000/api/stores?name=pizza&sortBy=average_rating&sortOrder=DESC"
```

### Testing Admin Functionality

#### 1. Create Admin User (Run in MySQL)
```sql
INSERT INTO users (name, email, password, role) VALUES 
('System Administrator User Name', 'admin@system.com', '$2a$12$YourHashedPasswordHere', 'System Administrator');
```

#### 2. Login as Admin
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@system.com",
    "password": "AdminPassword123!"
  }'
```

#### 3. Get Dashboard Statistics
```bash
curl -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  http://localhost:5000/api/users/dashboard/stats
```

#### 4. Create a New Store
```bash
curl -X POST http://localhost:5000/api/stores \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Restaurant Downtown",
    "email": "restaurant@test.com",
    "address": "456 Food Street, Downtown District"
  }'
```

### Testing Store Owner Functionality

#### 1. Create Store Owner (Admin only)
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith Example Store Owner",
    "email": "jane@storeowner.com",
    "password": "StorePass123!",
    "address": "456 Business Street, Commerce City",
    "role": "Store Owner"
  }'
```

#### 2. Login as Store Owner
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@storeowner.com",
    "password": "StorePass123!"
  }'
```

#### 3. Get Store Dashboard
```bash
curl -H "Authorization: Bearer STORE_OWNER_JWT_TOKEN" \
  http://localhost:5000/api/stores/dashboard
```

---

## 📮 Postman Collection

### Environment Variables
```json
{
  "baseUrl": "http://localhost:5000",
  "authToken": "{{token}}",
  "adminToken": "{{adminToken}}",
  "storeOwnerToken": "{{storeOwnerToken}}"
}
```

### Collection Structure
```
Store Rating API/
├── System/
│   ├── Health Check (GET /)
│   └── Health Status (GET /health)
├── Authentication/
│   ├── Register User (POST /api/auth/register)
│   ├── Login User (POST /api/auth/login)
│   └── Update Password (PUT /api/auth/password)
├── User Management/
│   ├── Get Dashboard Stats (GET /api/users/dashboard/stats)
│   ├── Get All Users (GET /api/users)
│   ├── Create User (POST /api/users)
│   └── Get User by ID (GET /api/users/:id)
├── Store Management/
│   ├── Get Store Dashboard (GET /api/stores/dashboard)
│   ├── Get All Stores (GET /api/stores)
│   ├── Create Store (POST /api/stores)
│   ├── Get Store by ID (GET /api/stores/:id)
│   └── Get Store Ratings (GET /api/stores/:id/ratings)
└── Rating Management/
    ├── Submit Rating (POST /api/ratings)
    ├── Update Rating (PUT /api/ratings)
    └── Get User Rating (GET /api/ratings/store/:storeId)
```

### Pre-request Scripts
For authenticated requests, add this pre-request script:
```javascript
// Set auth token if available
if (pm.environment.get("authToken")) {
    pm.request.headers.add({
        key: "Authorization",
        value: "Bearer " + pm.environment.get("authToken")
    });
}
```

### Tests Scripts
For login requests, add this test script:
```javascript
// Save token from login response
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.token) {
        pm.environment.set("authToken", response.token);
    }
}
```

---

## 🔧 Additional Information

### Rate Limiting
Currently no rate limiting is implemented. Consider adding rate limiting for production use.

### CORS Policy
The API has an open CORS policy (`origin: '*'`) suitable for development. Restrict this for production.

### Database Indexes
The following indexes are created for optimal performance:
- Users: `email`, `role`
- Stores: `owner_id`, `email`, `average_rating`
- Ratings: `store_id`, `user_id`, `rating`, `unique(user_id, store_id)`

### Security Considerations
- Passwords are hashed using bcryptjs with 12 rounds
- JWT tokens expire in 7 days
- SQL injection prevention through parameterized queries
- Input validation on all endpoints

---

## 📞 Support

For issues or questions regarding this API:
1. Check the error response for specific error codes
2. Ensure all required fields are provided
3. Verify JWT token is valid and not expired
4. Check user role permissions for the endpoint

---

**Last Updated**: January 8, 2025  
**API Version**: 1.0.0  
**Author**: Ashish Choudhari