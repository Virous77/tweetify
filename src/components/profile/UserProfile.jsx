import React from "react";
import coverImage from "../../assets/cover.svg";
import image from "../../assets/john.webp";
import { AiOutlineLink } from "react-icons/ai";
import { TbBallon } from "react-icons/tb";
import { convertTimestamp } from "../../utils/data";
import { BiNews } from "react-icons/bi";
import { TiLocation } from "react-icons/ti";
import FullImage from "./FullImage";
import { useAction } from "../../store/actionContext";

const UserProfile = ({ data, setEditProfile, uid }) => {
  const { showFullImage, setShowFullImage } = useAction();

  return (
    <section className="userProfile">
      <div className="cover">
        <div
          className={`coverImage ${data[0]?.cover === null ? "noCover" : ""} `}
        >
          <img
            src={data[0]?.cover || coverImage}
            alt=""
            onClick={() => {
              const tempdata = {
                image: data[0]?.cover,
                title: "cover",
              };
              if (data[0]?.cover) {
                setShowFullImage(tempdata);
              }
            }}
          />
        </div>
      </div>

      <div className="userBar">
        <div className="activeUserNoImg">
          <img
            src={data[0]?.photoURL || image}
            alt=""
            onClick={() => {
              const tempdata = {
                image: data[0]?.photoURL,
                title: "profile",
              };
              if (data[0]?.photoURL) {
                setShowFullImage(tempdata);
              }
            }}
          />
        </div>

        <button className="editButton" onClick={() => setEditProfile(data[0])}>
          Edit Profile
        </button>
      </div>

      <div className="userInfoBox">
        <div className="heroUserName">
          <h3>{data[0]?.name}</h3>
          <span>@{data[0]?.uniqueId}</span>
        </div>

        <div className="userPInfo">
          {data[0]?.bio && <p>{data[0]?.bio}</p>}

          <div className="wrapUserInfo">
            {data[0]?.link && (
              <div className="link">
                <AiOutlineLink />
                {data[0]?.link && (
                  <a href={data[0]?.link} target="_blank">
                    {data[0]?.link?.includes("https")
                      ? data[0]?.link?.slice(8, -1)
                      : data[0]?.link?.slice(0)}{" "}
                  </a>
                )}
              </div>
            )}

            {data[0]?.dob && (
              <>
                {data[0]?.birthType === "private" ? (
                  <>
                    {data[0]?.uid === uid && (
                      <p className="joined">
                        <TbBallon size={15} />
                        {data && data[0]?.dob.DoB}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="joined">
                    <TbBallon size={15} />
                    {data && data[0]?.dob.DoB}
                  </p>
                )}
              </>
            )}

            <p className="joined">
              <BiNews size={15} />
              Joined {data && convertTimestamp(data[0]?.createdAt)}
            </p>

            {data[0]?.location && (
              <>
                {data[0]?.locationType === "private" ? (
                  <>
                    {data[0]?.uid === uid && (
                      <p className="joined">
                        <TiLocation size={15} />
                        {data && data[0]?.location}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="joined">
                    <TiLocation size={15} />
                    {data && data[0]?.location}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="userFollower">
            <p>
              436 <span>Following</span>
            </p>

            <p>
              2,103 <span>Followers</span>
            </p>
          </div>
        </div>
      </div>

      {showFullImage && (
        <FullImage
          showFullImage={showFullImage}
          setShowFullImage={setShowFullImage}
        />
      )}
    </section>
  );
};

export default UserProfile;
