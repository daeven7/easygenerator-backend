# Easygenerator

Easygenerator is a full-stack application built with modern technologies to provide robust functionality and seamless user experience. It features a secure JWT-based authentication system, a responsive frontend, and a highly modular and scalable backend.

## Repository Links
* **Frontend:**   [easygenerator-frontend](https://github.com/daeven7/easygenerator-frontend)
* **Backend:**  [easygenerator-backend](https://github.com/daeven7/easygenerator-backend)

## How to Run  
## Frontend Setup  
1. Install dependencies:
```
npm install
```
2. Create a .env file in the root directory and add the following:
```
# Base URL for API endpoints
VITE_BASE_URL=http://localhost:3000 
```

3. Start the development server:
```
npm run dev
```

## Backend Setup  
1. Install dependencies:
```
npm install
```
2. Create a .env file in the root directory and configure the following:
```
PORT=3000 # Port on which the backend will run
CORS_ORIGIN=http://localhost:5173 # Frontend origin for CORS, replace with your origin
MONGODB_URI="Your MongoDB URI"

COOKIE_PATH='/'
COOKIE_SAMESITE='none' # Use 'none' for local development and 'strict' in production
COOKIE_SECURE=true
COOKIE_MAXAGE=2592000000 # Cookie expiration time (in milliseconds)

JWT_ACCESS_SECRET="Your JWT access secret"
JWT_REFRESH_SECRET="Your JWT refresh secret"
JWT_ACCESS_EXPIRY=15s    # Access token expiry (e.g., '15s', '15m', etc.)
JWT_REFRESH_EXPIRY=30s   # Refresh token expiry (e.g., '30s', '30d', etc.)
```
3. Start the backend server:
```
npm run start
```

## Technologies Used

## Frontend
1. **React:** Component-based library for building user interfaces.
2. **Vite:**  Fast build tool and development server.
3. **Zustand:**  State management library for React.
4. **React-Query:** Data fetching and state management for api state.
5. **Modular SCSS:** Modular styles for better code organization.
6. **TypeScript:** Enforces type safety for clean and maintainable code.
7. **Ant Design (antd):**  UI framework for polished, professional design.

## Backend
1. **NestJS:**  NodeJS framework for building efficient, scalable server-side applications
2. **TypeScript:** Enforces type safety for clean and maintainable code.
3. **Mongoose:**  ODM for MongoDB integration.

## Database
* **MongoDB:**  NoSQL database for high scalability and performance

## Security Practices
1. **JWT Refresh Token Strategy**  
   * Refresh tokens enable secure re-authentication by generating short-lived access         tokens without re-entering credentials.
   * Implemented token rotation to enhance security.
   * Blacklists previously used refresh tokens to prevent it's reuse, even if someone        gains access to the token.
2. **Persistent Authentication and Silent Refresh of token:**
    * Ensures the user remains authenticated even after refreshing the page.
    * Refresh tokens are refreshed automatically when the access token expires, without the user noticing.
3. **Secure Token Storage:**  
    * Access tokens are stored in memory for immediate use.
    * Refresh tokens are securely stored in HTTP-only cookies.
4.  **Automatic Logout and Seamless Data Access:**
    * Protected endpoints automatically attempt token refresh if the access token is expired.
    * Logs out users only if both token refresh and subsequent data requests fail.
    * Logs out users automatically when both the access token as well as the refresh token is invalid.
5. **Secured Routes:**
    * Guards on the backend and protected routes on the frontend prevent unauthorized access.

## Additional Features
1. **Backend Logging:**
    * Implemented comprehensive logging for debugging and monitoring.
2. **TypeScript Across the Stack:**
    * Ensures type safety for both frontend and backend.
3. **Frontend and Backend Separation:**
    * Independent development and deployment of frontend and backend components.



