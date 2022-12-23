import React from "react";
import { FaRetweet } from "react-icons/fa";
import { IoCreateSharp } from "react-icons/io5";
import { useAction } from "../../store/actionContext";
import { useTweet } from "../../store/tweetContext";

const RetweetType = () => {
  const { showRetweetType, setShowRetweetType } = useAction();
  const { retweetTweet } = useTweet();

  return (
    <section
      className={`retweet ${
        showRetweetType?.reTweetType?.image?.length > 0
          ? "withImg"
          : "withNoImg"
      }`}
    >
      <div
        className="retweetFirst"
        onClick={(e) => {
          e.stopPropagation();
          retweetTweet("retweet");
        }}
      >
        <FaRetweet size={22} />
        <p>Retweet</p>
      </div>

      <div
        className="retweetFirst"
        onClick={(e) => {
          e.stopPropagation();
          setShowRetweetType({
            ...showRetweetType,
            retweetData: showRetweetType.retweetType,
          });
        }}
      >
        <IoCreateSharp size={22} />
        <p>Quote Tweet</p>
      </div>
    </section>
  );
};

export default RetweetType;
