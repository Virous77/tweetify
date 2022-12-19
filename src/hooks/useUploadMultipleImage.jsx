import { useState } from "react";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from "../firebase/firebase.config";

const useUploadMultipleImage = () => {
  const [tweetImage, setTweetImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (e) => {
    let images = [];
    for (let cost of e.target.files) {
      images.push(cost);
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setIsLoading(false);
      toast.error("Images not uploaded!!");
      return;
    });

    setTweetImage(imgUrls);

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        setIsLoading(true);
        const storageRef = ref(
          storage,
          `tweetImage/${Date.now()}-${image.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              resolve(downloadUrl);
              setIsLoading(false);
            });
          }
        );
      });
    }
  };

  const deleteImage = (e) => {
    const deletRef = ref(storage, tweetImage[e]);

    deleteObject(deletRef).then(() => {
      const imageAssets = tweetImage.filter((id, idx) => idx !== e);
      setTweetImage(imageAssets);
    });
  };

  return {
    uploadImage,
    tweetImage,
    isLoading,
    deleteImage,
    setTweetImage,
  };
};

export default useUploadMultipleImage;
