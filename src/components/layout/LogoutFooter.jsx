import React from "react";
import { useAction } from "../../store/actionContext";

const LogoutFooter = () => {
  const { setShowLogin, setShowRealLogin } = useAction();

  return (
    <footer className="logoutFooter">
      <section className="wraFooter">
        <div></div>
        <div className="middleFooter">
          <h2>Don’t miss what’s happening</h2>
          <p>People on Twitter are the first to know.</p>
        </div>
        <div className="rightFooter">
          <div className="footAction">
            <button onClick={() => setShowRealLogin(true)}>Log in</button>
            <button onClick={() => setShowLogin(true)}>Sign up</button>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default LogoutFooter;
