import React from "react";
import "./Layout.css";
import logo from "../../assets/icons/one.svg";
import { menulinks } from "../../utils/data";
import { Link } from "react-router-dom";
import { BsTwitter, BsThreeDots } from "react-icons/bs";

const Menubar = () => {
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

      <div className="menuActiveUser">
        <img src={logo} alt="" />
        <div className="menuUserInfo">
          <h5>Reetesh VirousB (...</h5>
          <span>@iMBitcoinB</span>
        </div>
        <BsThreeDots className="menuDot" />
      </div>
    </aside>
  );
};

export default Menubar;
