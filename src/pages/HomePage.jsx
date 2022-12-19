import React from "react";
import "../styles/HomePage.css";
import { useTweet } from "../store/tweetContext";
import Tweet from "../components/tweet/Tweet";
import LiveTweet from "../components/tweet/LiveTweet";

const HomePage = () => {
  const { error } = useTweet();

  return (
    <section className="homeBar">
      <div className="homeHead">
        <h3>Home</h3>
      </div>
      <Tweet />
      <LiveTweet />
      {error && <p className="maxError">Please select only 4 photos</p>}
    </section>
  );
};

export default HomePage;
