import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import coverImage from "../../assets/cover.svg";
import { BsCameraFill } from "react-icons/bs";
import image from "../../assets/john.webp";
import { useProfile } from "../../store/profileContext";
import Calander from "./Calander";
import { BsCheck } from "react-icons/bs";

const EditProfile = ({ setEditProfile, editProfile }) => {
  const {
    profileData,
    handleChange,
    initialState2,
    setShowInfo,
    setEditBirth,
    editBirth,
    setProfileData,
    submitProfile,
    uploadImage,
    deleteCover,
    uploadCover,
    isLoading,
  } = useProfile();
  const {
    name,
    location,
    bio,
    link,
    locationType,
    birthType,
    cover,
    photoURL,
  } = profileData;

  return (
    <>
      <div className="overLay" onClick={() => setEditProfile("")}></div>
      <main
        className="editProfile  fixedIt"
        onClick={() => setShowInfo(initialState2)}
      >
        <header className="editProfileTop">
          <div className="leftEdit">
            <AiOutlineClose
              cursor={"pointer"}
              size={21}
              onClick={() => setEditProfile("")}
            />
            <h3>Edit Profile</h3>
          </div>
          <button
            disabled={isLoading}
            className="rightEdit"
            onClick={submitProfile}
          >
            Save
          </button>
        </header>

        <section className="editContent">
          <div className="cover editCover">
            <div className={`coverImage ${cover === null ? "noCover" : ""} `}>
              <img src={cover || coverImage} alt="" />
            </div>

            <div className="imageOverLay"></div>

            <div className="coverAction">
              <label htmlFor="editCover">
                <BsCameraFill size={25} cursor={"pointer"} />
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                id="editCover"
                onChange={(e) => {
                  uploadCover(e);
                  setProfileData({
                    ...profileData,
                    cover: URL.createObjectURL(e.target.files[0]),
                  });
                }}
              />

              {cover && (
                <span className="removeCover">
                  <AiOutlineClose
                    size={22}
                    cursor={"pointer"}
                    onClick={() => {
                      deleteCover(cover);
                      setProfileData({ ...profileData, cover: null });
                    }}
                  />
                </span>
              )}
            </div>
          </div>

          <div className="profileAction">
            <div className="editUserImage">
              <img src={photoURL || image} alt="" />

              <div className="pImageOverLay"></div>

              <div className="pCoverAction">
                <label htmlFor="editProfile">
                  <BsCameraFill size={25} cursor={"pointer"} />
                </label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="editProfile"
                  onChange={(e) => {
                    uploadImage(e);
                    setProfileData({
                      ...profileData,
                      photoURL: URL.createObjectURL(e.target.files[0]),
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="editProfileForm">
            <div className="firstInput">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name && name}
                onChange={handleChange}
              />
            </div>

            <div className="firstInput">
              <input
                type="text"
                placeholder="Bio"
                name="bio"
                value={bio && bio}
                onChange={handleChange}
              />
            </div>

            <div className="firstInput">
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={location && location}
                onChange={handleChange}
              />
            </div>

            <div className="firstInput">
              <input
                type="url"
                placeholder="Website"
                name="link"
                value={link && link}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="editBirthDate">
            <div className="editBirthAction">
              <p>Birth Date . </p>
              {!editBirth ? (
                <span onClick={() => setEditBirth(true)}>Edit</span>
              ) : (
                <span onClick={() => setEditBirth(false)}>Cancel</span>
              )}
            </div>

            {!editBirth && (
              <>
                {editProfile.dob?.DoB ? (
                  <h3>{editProfile.dob?.DoB}</h3>
                ) : (
                  <h3>Set Your Birth-Date</h3>
                )}
              </>
            )}
          </div>

          {editBirth && (
            <div className="editBirth">
              <Calander />
            </div>
          )}

          <div className="editDisplay">
            <div className="displayBirthdate">
              <p>Display Birth-Date</p>
              {birthType === "public" ? (
                <span
                  className="publicBirth"
                  onClick={() =>
                    setProfileData({ ...profileData, birthType: "private" })
                  }
                >
                  <BsCheck size={30} />
                </span>
              ) : (
                <span
                  className="privateBirth"
                  onClick={() =>
                    setProfileData({ ...profileData, birthType: "public" })
                  }
                ></span>
              )}
            </div>
            <div className="displayBirthdate">
              <p>Display Location</p>
              {locationType === "public" ? (
                <span
                  className="publicBirth"
                  onClick={() =>
                    setProfileData({ ...profileData, locationType: "private" })
                  }
                >
                  <BsCheck size={30} />
                </span>
              ) : (
                <span
                  className="privateBirth"
                  onClick={() =>
                    setProfileData({ ...profileData, locationType: "public" })
                  }
                ></span>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default EditProfile;
