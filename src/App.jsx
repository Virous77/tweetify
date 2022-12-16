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
} from "./pages/index";
import "./index.css";
import Register from "./components/auth/Register";
import { useAction } from "./store/actionContext";

const App = () => {
  const { showLogin } = useAction();

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
        </Routes>
      </div>

      <Sidebar />
      {showLogin && <Register />}
      <ToastContainer />
    </section>
  );
};

export default App;
