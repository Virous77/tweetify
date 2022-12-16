import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/authContext";
import { TweetContextProvider } from "./store/tweetContext";
import { ActionContextProvider } from "./store/actionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TweetContextProvider>
          <ActionContextProvider>
            <App />
          </ActionContextProvider>
        </TweetContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
