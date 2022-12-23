import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { useAction } from "../../store/actionContext";
import ShareTweet from "./ShareTweet";
import { useTweet } from "../../store/tweetContext";
import RetweetType from "./RetweetType";

const LiveTweetAction = ({ post, idx }) => {
  const {
    userActive,
    shareTweet,
    setShareTweet,
    setShowComment,
    showRetweetType,
    setShowRetweetType,
  } = useAction();
  const { likeTweet } = useTweet();

  return (
    <section className="liveActionBar">
      {post.tweetType === "Private tweet" ? (
        <span
          className={post.tweetUserId === userActive?.uid ? "" : "allowTweet"}
          onClick={() => {
            if (post.tweetUserId === userActive.uid) {
              setShowComment(post);
            }
          }}
        >
          <FaRegComment size={17} />
          {post?.comment?.length > 0 && post?.comment?.length}
        </span>
      ) : (
        <span onClick={() => setShowComment(post)}>
          <FaRegComment size={17} />
          {post?.comment?.length > 0 && post?.comment?.length}
        </span>
      )}

      <span>
        <FaRetweet
          size={17}
          onClick={(e) => {
            e.stopPropagation();
            setShowRetweetType({
              ...showRetweetType,
              retweetType: { count: idx, ...post },
            });
          }}
        />
        {post?.retweet?.length > 0 && post?.retweet?.length}
      </span>

      <span>
        {post.like.find((li) => li.id === userActive.uid) ? (
          <AiFillHeart size={17} onClick={() => likeTweet(post)} />
        ) : (
          <AiOutlineHeart size={17} onClick={() => likeTweet(post)} />
        )}
        {post?.like?.length > 0 && post?.like?.length}
      </span>

      <FiShare
        size={17}
        onClick={(e) => {
          e.stopPropagation();
          setShareTweet({ count: idx, ...post });
        }}
      />

      {shareTweet && shareTweet.count === idx && (
        <ShareTweet shareTweet={shareTweet} />
      )}

      {showRetweetType.retweetType &&
        showRetweetType.retweetType.count === idx && <RetweetType />}
    </section>
  );
};

export default LiveTweetAction;
