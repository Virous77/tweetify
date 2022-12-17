import React from "react";
import "./Auth.css";
import { useAction } from "../../store/actionContext";
import { AiOutlineClose } from "react-icons/ai";
import { BsTwitter, BsGoogle } from "react-icons/bs";
import { useAuthContext } from "../../store/authContext";

const Login = () => {
  const { setShowRealLogin, setShowLogin, nextLogin, setNextLogin } =
    useAction();
  const {
    googleLogin,
    user,
    handleChange,
    LoginUser,
    loading,
    focus,
    setFocus,
  } = useAuthContext();

  const { email, password } = user;

  return (
    <>
      <div className="overLay" onClick={() => setShowRealLogin(false)}></div>
      <section className="fixedIt  loginBar">
        <AiOutlineClose
          size={23}
          cursor={"pointer"}
          onClick={() => setShowRealLogin(false)}
        />

        {!nextLogin && (
          <section className="contentLogin">
            <div className="loginLogo">
              <BsTwitter className="loginIcon" />
            </div>
            <h1>Sign in to Twitter</h1>

            <div className="loginForm">
              <button onClick={googleLogin} className="loginGoogle">
                <BsGoogle />
                Sign up with Google
              </button>

              <div className="loginLine">
                <span></span>
                <p>OR</p>
                <span></span>
              </div>

              <div
                className={`firstInput  ${
                  focus === "email" ? "firstInputActive" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  onFocus={() => setFocus("email")}
                  onBlur={() => setFocus("")}
                />
              </div>

              <div className="loginNext">
                <button
                  disabled={email?.length === 0}
                  onClick={() => setNextLogin(email)}
                >
                  Next
                </button>
              </div>
            </div>

            <p className="haveAccount">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setShowRealLogin(false);
                  setShowLogin(true);
                }}
              >
                Sign up
              </span>{" "}
            </p>
          </section>
        )}

        {nextLogin && (
          <div className="contentLogin">
            <div className="loginLogo">
              <BsTwitter className="loginIcon" />
            </div>
            <h1 className="loginEnter">Enter Your Password</h1>

            <div className="firstInput">
              <input type="text" value={email} disabled />
            </div>

            <div
              className={`firstInput loginPass ${
                focus === "password" ? "firstInputActive" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleChange}
                onFocus={() => setFocus("password")}
                onBlur={() => setFocus("")}
              />
            </div>

            <div className="loginNext">
              <button disabled={password?.length === 0} onClick={LoginUser}>
                {loading ? "Processing" : "Submit"}
              </button>
            </div>

            <p className="haveAccount">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setShowRealLogin(false);
                  setShowLogin(true);
                }}
              >
                Sign up
              </span>{" "}
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Login;
