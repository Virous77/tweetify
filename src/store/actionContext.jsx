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

  //LiveTweet
  const [showLiveActionBox, setShowLiveActionBox] = useState("");
  const [shareTweet, setShareTweet] = useState("");
  const [showAction, setShowAction] = useState({ showDelete: false });
  const [changeTweetType, setChangeTweetType] = useState("");
  const [showChangeType, setShowChangeType] = useState("");
  const [showComment, setShowComment] = useState("");
  const initialState = {
    retweetType: "",
    retweetData: "",
  };
  const [showRetweetType, setShowRetweetType] = useState(initialState);

  //Global State
  const [showNotification, setShowNotification] = useState("");
  const [userActive, setUserActive] = useState("");
  const [getBookmark, setGetBookMark] = useState([]);
  const [tweetFeed, setTweetFeed] = useState([]);

  const Notification = (e) => {
    setShowNotification(e);
    setShareTweet("");
    setTimeout(() => {
      setShowNotification("");
    }, 3000);
  };

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
        shareTweet,
        setShareTweet,
        showNotification,
        setShowNotification,
        Notification,
        showAction,
        setShowAction,
        changeTweetType,
        setChangeTweetType,
        showChangeType,
        setShowChangeType,
        getBookmark,
        setGetBookMark,
        tweetFeed,
        setTweetFeed,
        showComment,
        setShowComment,
        showRetweetType,
        setShowRetweetType,
        initialState,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export const useAction = () => useContext(ActionContext);
