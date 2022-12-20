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

  const {
    userActive,
    setShowLiveActionBox,
    Notification,
    setShareTweet,
    getBookmark,
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

    const profileRef = doc(db, "users", userActive.id);

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
      await updateDoc(profileRef, {
        tweet: arrayUnion(tempData),
      });
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
    const updateTweetRef = doc(db, "users", userActive.id);
    try {
      const findTweet = userActive?.tweet?.find(
        (li) =>
          li.createdAt.nanoseconds === e.createdAt.nanoseconds &&
          li.createdAt.seconds === e.createdAt.seconds
      );
      await deleteDoc(doc(db, "tweet", e.id));
      await updateDoc(updateTweetRef, {
        tweet: arrayRemove(findTweet),
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  ///change tweet type
  const HandleChangeTweetType = async (e) => {
    const updateTweetRef = doc(db, "tweet", getData.id);
    const updateUserTweetRef = doc(db, "users", userActive.id);

    const findTweet = userActive?.tweet?.find(
      (li) =>
        li.createdAt.nanoseconds === getData.createdAt.nanoseconds &&
        li.createdAt.seconds === getData.createdAt.seconds
    );

    try {
      await updateDoc(updateUserTweetRef, {
        tweet: arrayRemove(findTweet),
      });

      delete findTweet.tweetType;
      findTweet.tweetType = e;

      await updateDoc(updateUserTweetRef, {
        tweet: arrayUnion(findTweet),
      });
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
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export const useTweet = () => useContext(TweetContext);
