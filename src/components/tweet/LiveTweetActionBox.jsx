import React from "react";
import { FaRegComment } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscPinned, VscPinnedDirty } from "react-icons/vsc";
import { useAuthContext } from "../../store/authContext";
import { FiUserX } from "react-icons/fi";
import { useTweet } from "../../store/tweetContext";
import { useAction } from "../../store/actionContext";

const LiveTweetActionBox = ({
  showLiveActionBox,
  setShowLiveActionBox,
  idx,
}) => {
  const { activeUser } = useAuthContext();
  const { deletTweet, setGetDta, pinPost } = useTweet();
  const { setChangeTweetType, setShowChangeType, userActive } = useAction();

  return (
    <>
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
        {activeUser.uid === showLiveActionBox.tweetUserId && (
          <>
            <div
              className="deleteLiveTweet"
              onClick={() => deletTweet(showLiveActionBox)}
            >
              <RiDeleteBin6Line />
              <p>Delete</p>
            </div>

            {userActive?.PinPost?.id === showLiveActionBox?.id ? (
              <div
                className="ChangeLiveT"
                onClick={() => pinPost(showLiveActionBox)}
              >
                <VscPinnedDirty />
                <p>Unpin from profile</p>
              </div>
            ) : (
              <div
                className="ChangeLiveT"
                onClick={() => pinPost(showLiveActionBox)}
              >
                <VscPinned />
                <p>Pin to Your profile</p>
              </div>
            )}

            <div
              className="ChangeLiveT changeLiveTt"
              onClick={() => {
                setChangeTweetType(showLiveActionBox);
                setShowChangeType({ count: idx });
                setGetDta(showLiveActionBox);
                setShowLiveActionBox("");
              }}
            >
              <FaRegComment />
              <p>Change who can reply</p>
            </div>
          </>
        )}

        {activeUser.uid !== showLiveActionBox.tweetUserId && (
          <div className="ChangeLiveT changeLiveTt firstShareLayout">
            <FiUserX />
            <p>Unfollow @{showLiveActionBox.tweetUserUniqueId}</p>
          </div>
        )}
      </section>
    </>
  );
};

export default LiveTweetActionBox;
