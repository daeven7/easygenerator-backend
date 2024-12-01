# Easygenerator Assignment Task

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

JWT_ACCESS_SECRET="Your JWT access secret"
JWT_REFRESH_SECRET="Your JWT refresh secret"
JWT_ACCESS_EXPIRY=10m    # Access token expiry (e.g., '15s', '15m', etc.)
JWT_REFRESH_EXPIRY=30d   # Refresh token expiry (e.g., '30s', '30d', etc.)
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


##  Demo:  [link](https://github.com/daeven7/easygenerator-frontend/issues/1)

**Signup Page**
![Signup Page](https://private-user-images.githubusercontent.com/40667696/391272969-e9868346-a1c0-4dd0-a5b4-39c3859d9f8e.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMwMzU4OTgsIm5iZiI6MTczMzAzNTU5OCwicGF0aCI6Ii80MDY2NzY5Ni8zOTEyNzI5NjktZTk4NjgzNDYtYTFjMC00ZGQwLWE1YjQtMzljMzg1OWQ5ZjhlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjAxVDA2NDYzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQ3MDUwMGRiY2Q4YzVhYjAzMDM4ZjUwOGM1MWIzYThmMzliM2Q3OTZjZmNkNjYyY2E4YmNjZDVhZDIyNWFkMzUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.eg_unA7TwORQb96AbUjLDwBlKfheCZ-729w_fELuyUU)

**Email and password validations on signup page**
![Email and password validations on signup page](https://private-user-images.githubusercontent.com/40667696/391273049-2feaeeed-da01-4282-8526-7772cf0dc107.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMwMzU4OTgsIm5iZiI6MTczMzAzNTU5OCwicGF0aCI6Ii80MDY2NzY5Ni8zOTEyNzMwNDktMmZlYWVlZWQtZGEwMS00MjgyLTg1MjYtNzc3MmNmMGRjMTA3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjAxVDA2NDYzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTQ4NWQzMWRiMmQ4MDY4MDU3NDVmNjY2NmU1NmJmOWU0NTRiZjg0ODNmOGZkMmE5MGNiYmM2Yzk5MTVlODM0ZWQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.7mRkywcWYVSyf1oN5iiYPkuGcb9cJ-ChWKOhZSorcFQ)

**Email and password validations on signup page**
![Email and password validations on signup page](https://private-user-images.githubusercontent.com/40667696/391273056-155045e5-605d-4517-bb49-e64a45273278.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMwMzU4OTgsIm5iZiI6MTczMzAzNTU5OCwicGF0aCI6Ii80MDY2NzY5Ni8zOTEyNzMwNTYtMTU1MDQ1ZTUtNjA1ZC00NTE3LWJiNDktZTY0YTQ1MjczMjc4LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjAxVDA2NDYzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWE0YjlkMTE0Y2QyYTdhYjVmOWQ3YjgzNTkxYjYxNDQ2ODdjNmUxOGRhY2U2YTFlYzRiNTZiODY1MDU3NTQyNDYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.BVwsuNXGuE1VbvVQ96H78FdcgropTxqYzJQha3xKmlg)

**Signin Page**
![Signin Page](https://private-user-images.githubusercontent.com/40667696/391273568-fa1b13c5-7bc2-4ef5-a10a-04371c3a573e.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMwMzU4OTgsIm5iZiI6MTczMzAzNTU5OCwicGF0aCI6Ii80MDY2NzY5Ni8zOTEyNzM1NjgtZmExYjEzYzUtN2JjMi00ZWY1LWExMGEtMDQzNzFjM2E1NzNlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjAxVDA2NDYzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQyZmVjNDY1ZTcxMmE2MTcxMzkzMzI3MDc0ZWQ0MGI2MzU2YTYyOTY0ZWE1MTA5ZDYyNjA1NjE3OTExMTRiZDYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Tu7s_OKJLUAFawQYRycdaFY3OBqIArBkUzxHBBX2CQc)

**On successful signin/signup user is redirected to welcome page which displays the name of the user along with the logout option**
![On successful signin/signup user is redirected to welcome page which displays the name of the use along with the logout option](https://private-user-images.githubusercontent.com/40667696/391274020-3c13ae71-5ba2-46f5-9ee9-1453b18fb2ed.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMwMzU4OTgsIm5iZiI6MTczMzAzNTU5OCwicGF0aCI6Ii80MDY2NzY5Ni8zOTEyNzQwMjAtM2MxM2FlNzEtNWJhMi00NmY1LTllZTktMTQ1M2IxOGZiMmVkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjAxVDA2NDYzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTJkOTNhNjg1ODY5ZDQwNTFlNjMzODQ0MGNmODFkY2U4N2NlMWQ0ZDM4ZTljZDE3MTViOWViYjhhMmU0NmJmNGYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.e-sE7Y-1MOPf2RC8_JdaHatnVN6-TFoVUYo8eaIlyPE)

**Automatic silent refresh when access token expires**
![Automatic silent refresh when access token expires](https://private-user-images.githubusercontent.com/40667696/391274863-b109a874-cbfe-42af-9199-4bf3e3834a14.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMwMzU4OTgsIm5iZiI6MTczMzAzNTU5OCwicGF0aCI6Ii80MDY2NzY5Ni8zOTEyNzQ4NjMtYjEwOWE4NzQtY2JmZS00MmFmLTkxOTktNGJmM2UzODM0YTE0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjAxVDA2NDYzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWFmODBkNTQxMGJmZGVkMmQ1MWFiNTA1YWZmN2FkOWU5Yjk1MWU4MDk2MjE1MmJhNDFkOTFiOGNhZTY3NDdlMzAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.JX_Z_WvT2BL0sEYBdGnIqZUCVQfbC8B-mmUv1UDR0RM)

**Refresh token stored securely in http only cookie**
![Refresh token stored securely in http only cookie](https://private-user-images.githubusercontent.com/40667696/391288246-7e7a219d-be82-44f6-ad17-30386c20ca52.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMwMzU4OTgsIm5iZiI6MTczMzAzNTU5OCwicGF0aCI6Ii80MDY2NzY5Ni8zOTEyODgyNDYtN2U3YTIxOWQtYmU4Mi00NGY2LWFkMTctMzAzODZjMjBjYTUyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjAxVDA2NDYzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTMyOTA1MWY3MDMyOTJkY2QyZTEyNzNhNWI4Zjk5NjUxZWU2MzgzY2RmYzBmNDM3NWY4ZWM0YjEyNDIwOTdiMDMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.i4KL-0PUkoeyPHJ87EzysSOwlD4yWSDqOhO9Pgt6TDA)

**Error handling for other cases of an invalid user: Password is incorrect on signin**
![Error handling for other cases of an invalid user: Password is incorrect on signin](https://private-user-images.githubusercontent.com/40667696/391288892-2c5ca2fe-1daa-4f3b-901f-eb0df110df2a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMwMzU4OTgsIm5iZiI6MTczMzAzNTU5OCwicGF0aCI6Ii80MDY2NzY5Ni8zOTEyODg4OTItMmM1Y2EyZmUtMWRhYS00ZjNiLTkwMWYtZWIwZGYxMTBkZjJhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjAxVDA2NDYzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWZlMDQ5YzkwYjE0MGFiYjRmYzQ4N2Q4YjU2NDA4ZjUwMTk1ZmM5ODM1MjA5MmRkZmU1ZDcwMDk3MzA5Njg2MDUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.QDSYJNo8REzt_RE73sTvDnyRgjDENZImZMX8GAIy7xQ)

**Error handling for other cases of an invalid user: User does not exist**
![Error handling for other cases of an invalid user: User does not exist](https://private-user-images.githubusercontent.com/40667696/391288981-ec273c61-c682-47b1-8baa-8a4cc51e6148.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMwMzU4OTgsIm5iZiI6MTczMzAzNTU5OCwicGF0aCI6Ii80MDY2NzY5Ni8zOTEyODg5ODEtZWMyNzNjNjEtYzY4Mi00N2IxLThiYWEtOGE0Y2M1MWU2MTQ4LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjAxVDA2NDYzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWUwNWNjZjYxODkxY2ExYjE5YzEzNzNjYWVhYTc2NWJlNmJjZjA5ZmZkOGNkNWQ0ZWNmMTYwYzNmZGEzZDFhOGYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.8NxYLr1wLI1UKl-E9sBF9AVLF647lQCBlPDjBnuU2nI)

**Error handling for other cases of an invalid user: User already exists during signup**
![Error handling for other cases of an invalid user: User already exists during signup](https://private-user-images.githubusercontent.com/40667696/391288939-e69a6a6d-fe62-42d0-9ea5-fc0b449ec9b5.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMwMzU4OTgsIm5iZiI6MTczMzAzNTU5OCwicGF0aCI6Ii80MDY2NzY5Ni8zOTEyODg5MzktZTY5YTZhNmQtZmU2Mi00MmQwLTllYTUtZmMwYjQ0OWVjOWI1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjAxVDA2NDYzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTFiYjFkNjgzODI0N2FlNzE4YTE1OWU3MTZhN2EyZGRhNjkxYmE1NDQ3ZDlkYTUyYThkMmJjY2QzZWVjZjQ5MTEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.dah1zKrxh9VawS0DrdlvfVwzVkkttTtI-kNTyUwknPg)

