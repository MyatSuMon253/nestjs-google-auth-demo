import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="73028571094-ok0geg8ovenb4bv3ash97eighk41kb77.apps.googleusercontent.com">
      <div className="container">
        <h1>NestJS Google Auth Demo</h1>
        <p className="subtitle">
          Sign in with Google and send the credential token to your NestJS backend
          at <code>/auth/google-authentication</code>
        </p>
        <div className="card">
          <GoogleLogin
            text="signin_with"
            onSuccess={(response) => {
              console.log(response);
              fetch("http://localhost:3000/auth/google-authentication", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token: response.credential,
                }),
              })
                .then((response) => response.json())
                .then((data) => console.log(data));
            }}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
