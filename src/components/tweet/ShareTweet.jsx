import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import { BsJournalBookmark } from "react-icons/bs";
import { useAction } from "../../store/actionContext";
import { useTweet } from "../../store/tweetContext";
import { MdOutlineBookmarkRemove } from "react-icons/md";

const ShareTweet = ({ shareTweet }) => {
  const { Notification, getBookmark } = useAction();
  const { bookmarkTweet } = useTweet();

  return (
    <article
      className={
        shareTweet.image?.length > 0 ? "shareTweetBar" : "shareTweetBarI"
      }
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="ChangeLiveT firstShareLayout"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          Notification("Link copy to Clipboard!");
        }}
      >
        <AiOutlineLink />
        <p>Copy link tweet</p>
      </div>

      {getBookmark.find((li) => li.post.id === shareTweet.id) ? (
        <div
          className="ChangeLiveT changeLiveTt"
          onClick={() => bookmarkTweet(shareTweet)}
        >
          <MdOutlineBookmarkRemove size={20} />
          <p>Remove from Bookmarks</p>
        </div>
      ) : (
        <div
          className="ChangeLiveT changeLiveTt"
          onClick={() => bookmarkTweet(shareTweet)}
        >
          <BsJournalBookmark />
          <p>Bookmark Tweet</p>
        </div>
      )}
    </article>
  );
};

export default ShareTweet;
