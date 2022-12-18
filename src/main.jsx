import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/authContext";
import { TweetContextProvider } from "./store/tweetContext";
import { ActionContextProvider } from "./store/actionContext";
import { ProfileContextProvider } from "./store/profileContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ActionContextProvider>
        <AuthContextProvider>
          <TweetContextProvider>
            <ProfileContextProvider>
              <App />
            </ProfileContextProvider>
          </TweetContextProvider>
        </AuthContextProvider>
      </ActionContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
