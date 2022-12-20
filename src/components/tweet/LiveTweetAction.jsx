import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { useAction } from "../../store/actionContext";
import ShareTweet from "./ShareTweet";

const LiveTweetAction = ({ post, idx }) => {
  const { userActive, shareTweet, setShareTweet } = useAction();

  return (
    <section className="liveActionBar">
      {post.tweetType === "Private tweet" ? (
        <span
          className={post.tweetUserId === userActive?.uid ? "" : "allowTweet"}
        >
          <FaRegComment size={17} />
          {post?.comment?.length > 0 && post?.comment?.length}
        </span>
      ) : (
        <span onClick={() => console.log(post)}>
          <FaRegComment size={17} />
          {post?.comment?.length > 0 && post?.comment?.length}
        </span>
      )}

      <span>
        <FaRetweet size={17} />
        {post?.retweet?.length > 0 && post?.retweet?.length}
      </span>

      <span>
        <AiOutlineHeart size={17} />
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
    </section>
  );
};

export default LiveTweetAction;
