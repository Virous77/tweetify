import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import coverImage from "../../assets/cover.svg";
import { BsCameraFill } from "react-icons/bs";
import image from "../../assets/john.webp";

const EditProfile = ({ setEditProfile, editProfile }) => {
  return (
    <>
      <div className="overLay" onClick={() => setEditProfile("")}></div>
      <main className="editProfile  fixedIt">
        <header className="editProfileTop">
          <div className="leftEdit">
            <AiOutlineClose
              cursor={"pointer"}
              size={21}
              onClick={() => setEditProfile("")}
            />
            <h3>Edit Profile</h3>
          </div>
          <button className="rightEdit">Save</button>
        </header>

        <section className="editContent">
          <div className="cover editCover">
            {editProfile.cover ? (
              <div className="coverImage"></div>
            ) : (
              <div className="noCover">
                <img src={coverImage} alt="cover pic" />
              </div>
            )}

            <div className="imageOverLay"></div>

            <div className="coverAction">
              <label htmlFor="editCover">
                <BsCameraFill size={25} cursor={"pointer"} />
              </label>
              <input type="file" style={{ display: "none" }} id="editCover" />

              {editProfile?.photoURL && (
                <span className="removeCover">
                  <AiOutlineClose size={22} cursor={"pointer"} />
                </span>
              )}
            </div>

            <div className="profileAction">
              {editProfile.photoURL ? (
                <div className="editUserImage"></div>
              ) : (
                <div className="editUserNoImg">
                  <img src={image} alt="no pic" />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default EditProfile;
