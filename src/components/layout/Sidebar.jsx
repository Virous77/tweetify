import React from "react";
import "./Layout.css";
import LogoutSidebar from "./LogoutSidebar";
import { useAuthContext } from "../../store/authContext";

const Sidebar = () => {
  const { user } = useAuthContext();

  return (
    <aside className="sideBar">{!user.isLoggedIn && <LogoutSidebar />}</aside>
  );
};

export default Sidebar;
