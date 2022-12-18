import React, { useEffect } from "react";
import "./Layout.css";
import logo from "../../assets/icons/one.svg";
import { menulinks } from "../../utils/data";
import { Link } from "react-router-dom";
import { BsTwitter, BsThreeDots } from "react-icons/bs";
import { useAuthContext } from "../../store/authContext";
import useFetchUser from "../../hooks/useFetchUser";
import { useAction } from "../../store/actionContext";

const Menubar = () => {
  const { getCurrentUser, activeUser, logout } = useAuthContext();
  const { data } = useFetchUser(activeUser?.uid, "users");
  const { showLogout, setShowLogout } = useAction();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <aside className="menuBar">
      <div className="menuLogo">
        <Link to="/">
          <BsTwitter className="logoIcons" />
        </Link>
      </div>

      <div className="menuLink">
        {menulinks?.map((list) => (
          <div className="menuLinksList" key={list.id}>
            <Link to={list.route ? list.route : `/${list.name}`}>
              <p>{list.icon}</p>
              <h4>{list.name}</h4>
            </Link>
          </div>
        ))}
      </div>

      <button className="tweetButton">Tweet</button>

      <div
        className="menuActiveUser"
        onClick={() => setShowLogout(!showLogout)}
      >
        <img src={data[0]?.photoURL || logo} alt="" />
        <div className="menuUserInfo">
          <h5>
            {data[0]?.name?.slice(0, 15)}{" "}
            {data[0]?.name?.length > 15 ? "(..." : ""}
          </h5>
          <span>@{data[0]?.uniqueId}</span>
        </div>
        <BsThreeDots className="menuDot" />
      </div>

      {showLogout && (
        <div
          className="menuLogout"
          onClick={() => {
            logout();
            setShowLogout(false);
          }}
        >
          <p>Log out @{data[0]?.uniqueId}</p>
        </div>
      )}
    </aside>
  );
};

export default Menubar;
