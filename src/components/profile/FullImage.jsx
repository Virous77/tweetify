import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const FullImage = ({ setShowFullImage, showFullImage }) => {
  return (
    <>
      <div className="overLay" onClick={() => setShowFullImage("")}></div>
      <section className="fullImage">
        <header className="fullImageTop">
          <AiOutlineClose
            cursor={"pointer"}
            size={23}
            onClick={() => setShowFullImage("")}
          />
        </header>

        <div
          className={
            showFullImage.title === "profile" ? "fullProfile" : "fullCover"
          }
        >
          <img src={showFullImage.image} alt="" />
        </div>
      </section>
    </>
  );
};

export default FullImage;
