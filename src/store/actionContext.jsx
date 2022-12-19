import { createContext, useState, useContext } from "react";

const ActionContext = createContext();

export const ActionContextProvider = ({ children }) => {
  ////Auth State
  const [showLogin, setShowLogin] = useState(false);
  const [showRealLogin, setShowRealLogin] = useState(false);
  const [nextLogin, setNextLogin] = useState("");

  //Profile State
  const [showLogout, setShowLogout] = useState(false);
  const [showFullImage, setShowFullImage] = useState("");
  const [userActive, setUserActive] = useState("");

  //LiveTweet
  const [showLiveActionBox, setShowLiveActionBox] = useState("");

  return (
    <ActionContext.Provider
      value={{
        showLogin,
        setShowLogin,
        showRealLogin,
        setShowRealLogin,
        nextLogin,
        setNextLogin,
        showLogout,
        setShowLogout,
        showFullImage,
        setShowFullImage,
        userActive,
        setUserActive,
        setShowLiveActionBox,
        showLiveActionBox,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export const useAction = () => useContext(ActionContext);
