import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";

const LiveTweetAction = ({ post }) => {
  return (
    <section className="liveActionBar">
      <span>
        <FaRegComment size={17} />
        {post?.comment?.length > 0 && post?.comment?.length}
      </span>

      <span>
        <FaRetweet size={17} />
        {post?.retweet?.length > 0 && post?.retweet?.length}
      </span>

      <span>
        <AiOutlineHeart size={17} />
        {post?.like?.length > 0 && post?.like?.length}
      </span>
      <FiShare size={17} />
    </section>
  );
};

export default LiveTweetAction;
