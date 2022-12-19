import React from "react";
import { FaRegComment } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscPinned, VscPinnedDirty } from "react-icons/vsc";
import { useAuthContext } from "../../store/authContext";

const LiveTweetActionBox = ({ showLiveActionBox, setShowLiveActionBox }) => {
  const { activeUser } = useAuthContext();

  console.log(showLiveActionBox);

  return (
    <>
      {activeUser.uid === showLiveActionBox.tweetUserId && (
        <section
          className={
            showLiveActionBox?.image?.length > 0
              ? "tweetABoxBarI"
              : "tweetABoxBar"
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="deleteLiveTweet">
            <RiDeleteBin6Line />
            <p>Delete</p>
          </div>

          <div className="ChangeLiveT">
            <VscPinned />
            <p>Pin to Your profile</p>
          </div>

          <div className="ChangeLiveT changeLiveTt">
            <FaRegComment />
            <p>Change who can reply</p>
          </div>
        </section>
      )}

      {activeUser.uid !== showLiveActionBox.tweetUserId && (
        <section>
          <p>cool</p>
        </section>
      )}
    </>
  );
};

export default LiveTweetActionBox;
