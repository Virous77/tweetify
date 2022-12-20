import React from "react";
import { useTweet } from "../../store/tweetContext";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { BiPoll } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./Tweet.css";
import { useAction } from "../../store/actionContext";
import noImg from "../../assets/noImg.svg";
import TweetType from "./TweetType";
import { MdPrivateConnectivity } from "react-icons/md";

const Tweet = () => {
  const { userActive } = useAction();
  const {
    image,
    message,
    setMessage,
    focus,
    setFocus,
    preview,
    deletePreview,
    submitPost,
    error,
    setImage,
    tweetType,
    showTweetType,
    setShowTweetType,
    isLoading,
    uploadImage,
    deleteImage,
    loading,
  } = useTweet();
  const navigate = useNavigate();

  const path = window.location.pathname;

  return (
    <>
      {path === "/tweet" && (
        <div
          className="overLay"
          onClick={() => {
            navigate(-1);
            setImage([]);
            setShowTweetType(false);
          }}
        ></div>
      )}
      <main
        className={`homeTweetBox ${path === "/tweet" && "tweetPageBox"}  ${
          path === "/tweet" && image?.length === 0
            ? "startTop"
            : image?.length >= 1 && image?.length <= 2
            ? "mediumTop"
            : image?.length >= 3
            ? "endTop"
            : ""
        }`}
      >
        {path === "/tweet" && (
          <header className="tweetBoxHead">
            <AiOutlineClose
              cursor={"pointer"}
              size={20}
              onClick={() => navigate(-1)}
            />
          </header>
        )}

        <div className="homeTweetUser">
          <img
            src={userActive?.photoURL || noImg}
            alt=""
            referrerPolicy="no-referrer"
          />
        </div>
        <section className="tweetBox">
          <div className="tweetWrite">
            <textarea
              type="text"
              maxLength={280}
              value={message}
              placeholder="What's happening?"
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setFocus(true)}
            />

            {image?.length > 0 && (
              <div className="previewImage">
                {image?.map((li, idx) => (
                  <div className="livePreview" key={idx}>
                    <img src={li} alt="" referrerPolicy="no-referrer" />
                    <p
                      onClick={() => {
                        if (!isLoading) {
                          deletePreview(li);
                          deleteImage(idx);
                        }
                      }}
                    >
                      <AiOutlineClose />
                    </p>
                  </div>
                ))}
              </div>
            )}

            {focus || image.length > 0 ? (
              <div
                className="homeReply"
                onClick={() => setShowTweetType(!showTweetType)}
              >
                {tweetType === "Private tweet" ? (
                  <MdPrivateConnectivity />
                ) : (
                  <GiEarthAfricaEurope />
                )}
                <p>{tweetType}</p>
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
                  onChange={(e) => {
                    preview(e);
                    uploadImage(e);
                  }}
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
                disabled={
                  (message?.length === 0 && image?.length === 0) || isLoading
                }
                onClick={submitPost}
              >
                {loading ? "Posting..." : "Tweet"}
              </button>
            </div>
          </div>
        </section>
        {showTweetType && <TweetType />}
      </main>
      {error && <p className="maxError">Please select only 4 photos</p>}
    </>
  );
};

export default Tweet;
