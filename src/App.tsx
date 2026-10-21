import { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

interface UserProfile {
  email: string;
  name: string;
  picture: string;
  sub: string;
  [key: string]: unknown;
}

function decodeJwtPayload(token: string): UserProfile | null {
  try {
    const base64 = token.split(".")[1];
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [status, setStatus] = useState<string>("");
  const [backendResponse, setBackendResponse] = useState<Record<
    string,
    unknown
  > | null>(null);

  const handleSuccess = (response: { credential?: string }) => {
    if (response.credential) {
      const profile = decodeJwtPayload(response.credential);
      if (profile) {
        setUser(profile);
        setStatus("sending");
        fetch("http://localhost:3000/auth/google-authentication", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: response.credential,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setBackendResponse(data);
            setStatus("success");
          })
          .catch((err: Error) => {
            setBackendResponse({ error: err.message });
            setStatus("error");
          });
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId="997769782773-1kb5mbq1vmt1qleikvqbt1b6kbgqmagi.apps.googleusercontent.com">
      <div className="container">
        <h1>NestJS Google Auth Demo</h1>
        <p className="subtitle">
          Sign in with Google and send the credential token to your NestJS
          backend at <code>/auth/google-authentication</code>
        </p>

        {!user ? (
          <div className="card">
            <GoogleLogin
              text="signin_with"
              onSuccess={handleSuccess}
              onError={() => setStatus("error")}
            />
          </div>
        ) : (
          <div className="profile-section">
            <div className="card profile-card">
              <img src={user.picture} alt={user.name} className="avatar" />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p className="sub-tag">Google ID: {user.sub}</p>
              {status === "sending" && (
                <p className="status pending">Authenticating with backend...</p>
              )}
              {status === "success" && (
                <p className="status ok">Backend authenticated successfully</p>
              )}
              {status === "error" && (
                <p className="status fail">Backend authentication failed</p>
              )}
            </div>

            <div className="card payload-card">
              <h3>Decoded JWT Payload</h3>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>

            {backendResponse && (
              <div className="card payload-card">
                <h3>Backend Response</h3>
                <pre>{JSON.stringify(backendResponse, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
