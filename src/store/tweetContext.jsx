import { useContext, useState, createContext } from "react";
import { useAction } from "./actionContext";
import useUploadMultipleImage from "../hooks/useUploadMultipleImage";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  doc,
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

  const { userActive } = useAction();

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

  const deletePreview = (e) => {
    const filterImage = image?.filter((li) => li !== e);
    setImage(filterImage);
  };

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
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export const useTweet = () => useContext(TweetContext);
