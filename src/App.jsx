import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { Menubar, Sidebar } from "./components/layout/index";
import {
  HomePage,
  ExplorePage,
  ProfilePage,
  BookmarksPage,
  MessagePage,
  TweetPage,
} from "./pages/index";
import "./index.css";
import { Register, Login } from "./components/auth/index";
import { useAction } from "./store/actionContext";
import { LogoutFooter } from "./components/layout/index";
import { useAuthContext } from "./store/authContext";

const App = () => {
  const { showLogin, showRealLogin, showNotification } = useAction();
  const { user } = useAuthContext();

  return (
    <section className="App">
      <Menubar />
      <div className="Content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/tweet" element={<TweetPage />} />
        </Routes>
      </div>
      <Sidebar />
      {showLogin && <Register />}
      {showRealLogin && <Login />}
      {!user.isLoggedIn && <LogoutFooter />}
      {showNotification && <p className="notification">{showNotification}</p>}
      <ToastContainer />
    </section>
  );
};

export default App;
