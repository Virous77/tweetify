import { createContext, useContext, useState, useEffect } from "react";
const ProfileContext = createContext();
import { toast } from "react-toastify";
import useUploadSingleImage from "../hooks/useUploadSingleImage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

export const ProfileContextProvider = ({ children }) => {
  const [editProfle, setEditProfile] = useState("");
  const {
    uploadImage,
    profileImage,
    coverImage,
    deleteImage,
    deleteCover,
    uploadCover,
    isLoading,
  } = useUploadSingleImage();

  const initialState = {
    name: editProfle?.name,
    bio: editProfle?.bio || "",
    location: editProfle?.location || "",
    link: editProfle?.link || "",
    locationType: editProfle?.locationType,
    birthType: editProfle?.birthType,
    cover: editProfle?.cover,
    photoURL: editProfle?.photoURL,
  };

  const initialState2 = {
    month: false,
    day: false,
    years: false,
  };

  const initialState3 = {
    monthInfo: editProfle.dob?.month,
    dayInfo: editProfle.dob?.date,
    yearInfo: editProfle.dob?.year,
  };
  const [showInfo, setShowInfo] = useState(initialState2);
  const [profileData, setProfileData] = useState(initialState);
  const [infoData, setInfoData] = useState(initialState3);
  const [editBirth, setEditBirth] = useState(false);

  const {
    name,
    location,
    locationType,
    bio,
    birthType,
    photoURL,
    cover,
    link,
  } = profileData;
  const { monthInfo, dayInfo, yearInfo } = infoData;

  ///////
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const submitProfile = async () => {
    const profileRef = doc(db, "users", editProfle.id);

    try {
      await updateDoc(profileRef, {
        name: name,
        location: location,
        locationType: locationType,
        bio: bio,
        birthType: birthType,
        photoURL: profileImage || photoURL,
        cover: coverImage || cover,
        link: link,
        dob: {
          DoB: monthInfo + " " + dayInfo + " " + yearInfo,
          month: monthInfo,
          date: dayInfo,
          year: yearInfo,
        },
      });

      setEditProfile("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setProfileData(initialState);
    setInfoData(initialState3);
  }, [editProfle]);

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        setProfileData,
        editProfle,
        setEditProfile,
        handleChange,
        infoData,
        setInfoData,
        showInfo,
        setShowInfo,
        initialState2,
        setEditBirth,
        editBirth,
        uploadImage,
        deleteImage,
        submitProfile,
        deleteCover,
        uploadCover,
        isLoading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
