import { useContext, useState, createContext } from "react";
import { useAction } from "./actionContext";
import useUploadMultipleImage from "../hooks/useUploadMultipleImage";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
  doc,
  deleteDoc,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const TweetContext = createContext();

export const TweetContextProvider = ({ children }) => {
  const [image, setImage] = useState([]);
  const [message, setMessage] = useState("");
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);
  const [tweetType, setTweetType] = useState("Everyone can reply");
  const [showTweetType, setShowTweetType] = useState(false);
  const [loading, setLoading] = useState(false);

  ///Change Tweet Type
  const [getData, setGetDta] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [retweet, setRetweet] = useState("");

  const {
    userActive,
    setShowLiveActionBox,
    Notification,
    setShareTweet,
    getBookmark,
    showComment,
    setShowComment,
  } = useAction();
  const { uploadImage, tweetImage, isLoading, setTweetImage, deleteImage } =
    useUploadMultipleImage();

  const preview = (event) => {
    const selectedFIles = [];
    const targetFiles = event.target.files;

    if (targetFiles.length > 4) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    } else {
      const targetFilesObject = [...targetFiles];
      targetFilesObject.map((file) => {
        return selectedFIles.push(URL.createObjectURL(file));
      });
      setImage((prev) =>
        prev?.length === 0 ? selectedFIles : [...prev, selectedFIles]
      );
    }
  };

  //Delete review tweet
  const deletePreview = (e) => {
    const filterImage = image?.filter((li) => li !== e);
    setImage(filterImage);
  };

  //Create new Tweet
  const submitPost = async () => {
    setLoading(true);
    const tempData = {
      createdAt: new Date(),
      tweetUserId: userActive.uid,
      image: tweetImage || null,
      tweetMessage: message,
      tweetUserName: userActive.name,
      tweetUserImage: userActive.photoURL,
      like: [],
      retweet: [],
      comment: [],
      tweetType,
      tweetUserUniqueId: userActive.uniqueId,
    };

    try {
      await addDoc(collection(db, "tweet"), tempData);
      setLoading(false);
      setImage([]);
      setMessage("");
      setTweetImage(null);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong,Try again!");
    }
  };

  ///DeleteTweet
  const deletTweet = async (e) => {
    setShowLiveActionBox(false);
    try {
      await deleteDoc(doc(db, "tweet", e.id));
      Notification("Tweet Deleted!");
    } catch (error) {
      toast.error("Something went wrong,Try again!");
    }
  };

  ///change tweet type
  const HandleChangeTweetType = async (e) => {
    const updateTweetRef = doc(db, "tweet", getData.id);
    try {
      await updateDoc(updateTweetRef, {
        tweetType: e,
      });
      Notification(`Tweet Reply changed to ${e}`);
    } catch (error) {
      toast.error("Something try again,Try again!");
    }
  };

  //Pin post
  const pinPost = async (e) => {
    setShowLiveActionBox(false);
    const updateUserTweetRef = doc(db, "users", userActive.id);
    delete e.count;

    try {
      if (userActive?.PinPost.id === e.id) {
        await updateDoc(updateUserTweetRef, {
          PinPost: {},
        });
        Notification("Post successfully Unpin!");
        return;
      }
      await updateDoc(updateUserTweetRef, {
        PinPost: e,
      });
      Notification("Post successfully pin!");
    } catch (error) {
      toast.error("Something went wrong,Try again!");
    }
  };

  ///Bookmark tweet
  const bookmarkTweet = async (e) => {
    delete e.count;
    const validateBookmark = getBookmark.find((li) => li.post.id === e.id);

    const tempdata = {
      post: e,
      createdAt: serverTimestamp(),
      userId: userActive.uid,
    };

    try {
      if (validateBookmark) {
        await deleteDoc(doc(db, "bookmark", validateBookmark.id));
        setShareTweet("");
        Notification("Post successfully removed from bookmarked");
        return;
      }

      await addDoc(collection(db, "bookmark"), tempdata);
      setShareTweet("");
      Notification("Post successfully bookmarked ");
    } catch (error) {
      toast.error("Something went wrong,Try again");
    }
  };

  //Like Tweet
  const likeTweet = async (e) => {
    const updateTweetRef = doc(db, "tweet", e.id);
    const validateFeedTweet = e?.like?.find((li) => li.id === userActive.uid);

    const tempdata = {
      likeUserName: userActive.name,
      likeUserImage: userActive.photoURL,
      createdAt: new Date(),
      likeUserUniqueId: userActive.uniqueId,
      id: userActive.uid,
    };
    e.like.push(tempdata);

    try {
      if (validateFeedTweet) {
        await updateDoc(updateTweetRef, {
          like: arrayRemove(validateFeedTweet),
        });

        return;
      } else {
        await updateDoc(updateTweetRef, {
          like: arrayUnion(tempdata),
        });
      }
    } catch (error) {
      toast.error("Something went wrong,Try again!");
    }
  };

  //Comment Tweet
  const commentOnTweet = async () => {
    const updateTweetRef = doc(db, "tweet", showComment.id);

    const commentData = {
      commentUser: userActive.name,
      commentUserImage: userActive.photoURL,
      commentUserUniqueId: userActive.uniqueId,
      commentUserMessage: commentMessage,
      commentReply: showComment.tweetUserUniqueId,
      createdAt: new Date(),
      commentUserId: userActive.uid,
    };

    try {
      await updateDoc(updateTweetRef, {
        comment: arrayUnion(commentData),
      });
      setShowComment("");
      Notification("Comment Posted!");
      setCommentMessage("");
    } catch (error) {
      toast.error("Something went wrong,Try again!");
    }
  };

  //Retweet
  const retweetTweet = async (e) => {
    console.log(e);
  };

  return (
    <TweetContext.Provider
      value={{
        image,
        error,
        preview,
        submitPost,
        deletePreview,
        message,
        setMessage,
        setImage,
        setFocus,
        setError,
        focus,
        tweetType,
        showTweetType,
        setShowTweetType,
        setTweetType,
        isLoading,
        uploadImage,
        deleteImage,
        loading,
        deletTweet,
        HandleChangeTweetType,
        setGetDta,
        pinPost,
        bookmarkTweet,
        likeTweet,
        commentMessage,
        setCommentMessage,
        commentOnTweet,
        retweetTweet,
        retweet,
        setRetweet,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export const useTweet = () => useContext(TweetContext);
