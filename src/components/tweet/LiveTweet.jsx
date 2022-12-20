import React from "react";
import Moment from "react-moment";
import "moment-timezone";
import useFetchCollection from "../../hooks/useFetchCollection";
import LiveTweetAction from "./LiveTweetAction";
import { BsThreeDots } from "react-icons/bs";
import { useAction } from "../../store/actionContext";
import LiveTweetActionBox from "./LiveTweetActionBox";
import EditTweetType from "./EditTweetType";

const LiveTweet = () => {
  const { data, loading } = useFetchCollection("tweet");
  const {
    setShowLiveActionBox,
    showLiveActionBox,
    setShareTweet,
    showChangeType,
    setShowChangeType,
  } = useAction();

  if (loading) return <p>Loading..</p>;

  return (
    <section
      className="liveTweetBar"
      onClick={() => {
        setShowLiveActionBox("");
        setShareTweet("");
        setShowChangeType("");
      }}
    >
      <div className="line"></div>

      <main className="liveTweetListBar">
        {data?.map((post, idx) => (
          <section key={post.id}>
            <div className="liveTweetList">
              <div className="liveUsrImg">
                <img src={post.tweetUserImage} alt="" />
              </div>

              <div className="liveTweetContent">
                <div className="wrapLiveTop">
                  <div className="liveUserTop">
                    <h2>{post.tweetUserName}</h2>
                    <span>@{post.tweetUserUniqueId} . </span>
                    <span>
                      <Moment fromNow ago>
                        {post?.createdAt?.toDate()}
                      </Moment>
                    </span>
                  </div>
                  <BsThreeDots
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLiveActionBox({ count: idx, ...post });
                    }}
                  />
                </div>

                <p className="liveTMessage">{post.tweetMessage}</p>

                {post.image && (
                  <div
                    className={`liveTweetImageB  ${
                      post?.image?.length >= 3 ? "liveTweetImage" : "twoImage"
                    }`}
                  >
                    {post?.image?.map((i, idx) => (
                      <div className="liveImgList" key={idx}>
                        <img
                          src={i}
                          alt=""
                          referrerPolicy="no-referrer"
                          className={`${
                            post?.image?.length >= 3
                              ? "liveTweetImageF"
                              : post?.image?.length === 1
                              ? "oneImage"
                              : ""
                          }   ${
                            post.image.length === 4
                              ? idx === 0
                                ? "fourImgF"
                                : idx === 1
                                ? "fourImgS"
                                : idx === 2
                                ? "fourImgT"
                                : idx === 3
                                ? "fourImgFI"
                                : ""
                              : ""
                          }

                          ${
                            post.image.length === 3
                              ? idx === 0
                                ? "fourImgF"
                                : idx === 1
                                ? "fourImgS"
                                : idx === 2
                                ? "fourImgT  fourImgFI"
                                : ""
                              : ""
                          }

                          ${
                            post.image.length === 2
                              ? idx === 0
                                ? "fourImgF fourImgS"
                                : idx === 1
                                ? "fourImgT fourImgFI"
                                : ""
                              : ""
                          }    
                          `}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <LiveTweetAction post={post} idx={idx} />

                {showLiveActionBox && showLiveActionBox.count === idx && (
                  <LiveTweetActionBox
                    showLiveActionBox={showLiveActionBox}
                    setShowLiveActionBox={setShowLiveActionBox}
                    idx={idx}
                  />
                )}

                {showChangeType && showChangeType.count === idx && (
                  <EditTweetType />
                )}
              </div>
            </div>
            <div className="line"></div>
          </section>
        ))}
      </main>
    </section>
  );
};

export default LiveTweet;
