import React from "react";
import { BsCheck2 } from "react-icons/bs";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { MdPrivateConnectivity } from "react-icons/md";
import { useAction } from "../../store/actionContext";
import { useTweet } from "../../store/tweetContext";
const EditTweetType = () => {
  const { changeTweetType, setChangeTweetType, setShowChangeType } =
    useAction();
  const { HandleChangeTweetType } = useTweet();

  return (
    <article className={"changeTweetType"}>
      <h4>Who can reply?</h4>
      <span>
        Choose who can reply to this Tweet. Anyone can't reply If it's is
        private.
      </span>
      <div
        className="firstTweetType firstType"
        onClick={() => {
          setChangeTweetType("Everyone can reply");
          setShowChangeType("");
          HandleChangeTweetType("Everyone can reply");
        }}
      >
        <div className="twetType">
          <GiEarthAfricaEurope size={22} />
          <p>Everyone can reply</p>
        </div>
        {changeTweetType.tweetType === "Everyone can reply" ||
        changeTweetType === "Everyone can reply" ? (
          <BsCheck2 size={22} />
        ) : (
          ""
        )}
      </div>

      <div
        className="firstTweetType secondType"
        onClick={() => {
          setChangeTweetType("Private tweet");
          setShowChangeType("");
          HandleChangeTweetType("Private tweet");
        }}
      >
        <div className="twetType">
          <MdPrivateConnectivity size={23} />
          <p>Private Tweet</p>
        </div>

        {changeTweetType.tweetType === "Private tweet" ||
        changeTweetType === "Private tweet" ? (
          <BsCheck2 size={22} />
        ) : (
          ""
        )}
      </div>
    </article>
  );
};

export default EditTweetType;
