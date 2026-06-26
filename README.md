# NestJS Google Auth Demo

A React frontend demo for Google OAuth 2.0 authentication with a NestJS backend.

## How it works

1. User clicks **Sign in with Google**
2. Google returns an ID token (JWT)
3. Frontend decodes and displays the JWT payload
4. Token is sent to the NestJS backend at `POST /auth/google-authentication`
5. Backend verifies the token and returns a response

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **@react-oauth/google** for the Google Sign-In button

## Getting Started

```bash
npm install
npm run dev
```

The app runs at **http://localhost:3001**. Make sure this origin is listed in your Google Cloud project's authorized JavaScript origins.

## Prerequisites

- A NestJS backend running at `http://localhost:3000` with a `POST /auth/google-authentication` endpoint
- A Google Cloud project with an OAuth 2.0 client ID configured
