import React from "react";
import { useAction } from "../../store/actionContext";
import { AiOutlineClose } from "react-icons/ai";
import Moment from "react-moment";
import { useTweet } from "../../store/tweetContext";

const CommetTweet = () => {
  const { setShowComment, showComment, userActive } = useAction();
  const { setCommentMessage, commentOnTweet, commentMessage } = useTweet();

  return (
    <>
      <div className="overLay" onClick={() => setShowComment("")}></div>
      <div
        className={`commentBox ${
          showComment.image?.length <= 2 && showComment?.image?.length > 0
            ? "commentBoxImage"
            : showComment.image?.length >= 2 && showComment?.image?.length <= 4
            ? "commentBoxImage"
            : "commentBoxNoImg"
        }`}
      >
        <div className="commentClose">
          <AiOutlineClose
            onClick={() => setShowComment("")}
            cursor={"pointer"}
            size={22}
          />
        </div>

        <section>
          <div className="liveTweetList commentTweetList">
            <div className="liveUsrImg">
              <img src={showComment.tweetUserImage} alt="" />
            </div>

            <div className="liveTweetContent">
              <div className="wrapLiveTop">
                <div className="liveUserTop">
                  <h2>{showComment.tweetUserName}</h2>
                  <span>@{showComment.tweetUserUniqueId} . </span>
                  <span>
                    <Moment fromNow ago>
                      {showComment?.createdAt?.toDate()}
                    </Moment>
                  </span>
                </div>
              </div>

              <p className="liveTMessage">{showComment.tweetMessage}</p>

              {showComment.image && (
                <div
                  className={`liveTweetImageB  ${
                    showComment?.image?.length >= 3
                      ? "liveTweetImage"
                      : "twoImage"
                  }`}
                >
                  {showComment?.image?.map((i, idx) => (
                    <div className="liveImgList" key={idx}>
                      <img
                        src={i}
                        alt=""
                        referrerPolicy="no-referrer"
                        className={`${
                          showComment?.image?.length >= 3
                            ? "liveTweetImageF"
                            : showComment?.image?.length === 1
                            ? "oneImage"
                            : ""
                        }   ${
                          showComment.image.length === 4
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
                            showComment.image.length === 3
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
                            showComment.image.length === 2
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

              <div className="reply">
                <span>replying to</span>
                <p>@{showComment.tweetUserUniqueId}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="activerUserCmnt">
          <img src={userActive.photoURL} alt="" />

          <div className="cmntInput">
            <input
              type="text"
              placeholder="Tweet your reply"
              maxLength={280}
              value={commentMessage}
              onChange={(e) => setCommentMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="repluButton">
          {commentMessage?.length > 0 && <p>{commentMessage?.length}</p>}
          <button
            disabled={commentMessage?.length === 0}
            onClick={commentOnTweet}
          >
            Reply
          </button>
        </div>
      </div>
    </>
  );
};

export default CommetTweet;
