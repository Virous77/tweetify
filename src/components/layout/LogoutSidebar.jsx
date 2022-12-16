import React from "react";
import { BsGoogle } from "react-icons/Bs";
import { useAuthContext } from "../../store/authContext";
import { useAction } from "../../store/actionContext";

const LogoutSidebar = () => {
  const { googleLogin } = useAuthContext();
  const { setShowLogin } = useAction();

  return (
    <div className="logoutSidebar">
      <div className="logTop">
        <h3>New to Tweetify?</h3>
        <span>Sign up now to get your own personalized timeline!</span>
      </div>

      <div className="logAction">
        <button onClick={googleLogin}>
          <BsGoogle />
          Sign up with Google
        </button>
        <button onClick={() => setShowLogin(true)}>
          Sign up with phone or email
        </button>
      </div>
    </div>
  );
};

export default LogoutSidebar;
