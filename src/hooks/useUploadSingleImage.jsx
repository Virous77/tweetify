import { useState } from "react";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from "../firebase/firebase.config";

const useUploadSingleImage = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (e) => {
    setIsLoading(true);
    let imageFile = e.target.files[0];
    const storageRef = ref(storage, `Profile/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error("Something went wrong. Try again!");
        setTimeout(() => {
          toast.dismiss();
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setProfileImage(downloadUrl);
          setIsLoading(false);
        });
      }
    );
  };

  const deleteImage = (e) => {
    setIsLoading(true);

    const deletRef = ref(storage, e);
    deleteObject(deletRef).then(() => {
      setProfileImage(null);
      setIsLoading(false);
    });
  };

  const uploadCover = (e) => {
    setIsLoading(true);
    let imageFile = e.target.files[0];
    const storageRef = ref(storage, `Cover/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error("Something went wrong. Try again!");
        setTimeout(() => {
          toast.dismiss();
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setCoverImage(downloadUrl);
          setIsLoading(false);
        });
      }
    );
  };

  const deleteCover = (e) => {
    setIsLoading(true);

    const deletRef = ref(storage, e);
    deleteObject(deletRef).then(() => {
      setCoverImage(null);
      setIsLoading(false);
    });
  };

  return {
    uploadImage,
    isLoading,
    deleteImage,
    profileImage,
    coverImage,
    deleteCover,
    uploadCover,
  };
};

export default useUploadSingleImage;
