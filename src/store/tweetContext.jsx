import { useContext, useState, createContext } from "react";

const TweetContext = createContext();

export const TweetContextProvider = ({ children }) => {
  const [image, setImage] = useState([]);
  const [message, setMessage] = useState("");
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);

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

  const submitPost = () => {};
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
        focus,
        setFocus,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export const useTweet = () => useContext(TweetContext);
