import React from "react";
import "../styles/HomePage.css";
import { BsTwitter, BsImage, BsEmojiSmile } from "react-icons/bs";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { BiPoll } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useTweet } from "../store/tweetContext";

const HomePage = () => {
  const {
    image,
    message,
    setMessage,
    focus,
    setFocus,
    error,
    preview,
    deletePreview,
    submitPost,
  } = useTweet();

  return (
    <section className="homeBar">
      <div className="homeHead">
        <h3>Home</h3>
      </div>

      <div className="homeTweetBox">
        <div className="homeTweetUser">
          <BsTwitter className="homeUserProfile" />
        </div>
        <div className="tweetBox">
          <div className="tweetWrite">
            <textarea
              type="text"
              maxLength={280}
              placeholder="Whats's happening?"
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setFocus(true)}
            />

            {image?.length > 0 && (
              <div className="previewImage">
                {image?.map((li) => (
                  <div className="livePreview">
                    <img src={li} alt="" />
                    <p onClick={() => deletePreview(li)}>
                      <AiOutlineClose />
                    </p>
                  </div>
                ))}
              </div>
            )}

            {focus || image.length > 0 ? (
              <div className="homeReply">
                <GiEarthAfricaEurope />
                <p>Everyone can reply</p>
              </div>
            ) : (
              ""
            )}
          </div>
          {focus && <div className="line"></div>}

          <div className="addMore">
            <div className="rightAdd">
              <div>
                <label htmlFor="image">
                  <BsImage className="addIcon" />
                </label>
                <input
                  type="file"
                  id="image"
                  style={{ display: "none" }}
                  onChange={preview}
                  multiple
                  disabled={image.length >= 4}
                  maxLength={4}
                />
              </div>
              <BsEmojiSmile className="addIcon" />
              <BiPoll className="addIcon" />
            </div>

            <div className="leftAdd">
              {message?.length > 0 && (
                <div className="count">{message?.length}</div>
              )}
              <button
                disabled={message?.length === 0 && image?.length === 0}
                onClick={submitPost}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="maxError">Please select only 4 photos</p>}
    </section>
  );
};

export default HomePage;
