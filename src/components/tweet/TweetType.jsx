import React from "react";
import { useTweet } from "../../store/tweetContext";
import { BsCheck2 } from "react-icons/bs";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { MdPrivateConnectivity } from "react-icons/md";
const TweetType = () => {
  const { tweetType, setShowTweetType, setTweetType } = useTweet();

  const path = window.location.pathname;

  return (
    <article className={path === "/tweet" ? "tweetTypeBar" : "tweetHomeType"}>
      <h4>Who can reply?</h4>
      <span>
        Choose who can reply to this Tweet. Anyone can't reply If it's is
        private.
      </span>
      <div
        className="firstTweetType firstType"
        onClick={() => {
          setShowTweetType(false);
          setTweetType("Everyone can reply");
        }}
      >
        <div className="twetType">
          <GiEarthAfricaEurope size={22} />
          <p>Everyone can reply</p>
        </div>
        {tweetType === "Everyone can reply" && <BsCheck2 size={22} />}
      </div>

      <div
        className="firstTweetType secondType"
        onClick={() => {
          setShowTweetType(false);
          setTweetType("Private tweet");
        }}
      >
        <div className="twetType">
          <MdPrivateConnectivity size={23} />
          <p>Private Tweet</p>
        </div>

        {tweetType === "Private tweet" && <BsCheck2 size={22} />}
      </div>
    </article>
  );
};

export default TweetType;
