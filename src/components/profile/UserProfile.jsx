import React from "react";
import coverImage from "../../assets/cover.svg";
import image from "../../assets/john.webp";
import { AiOutlineLink } from "react-icons/ai";
import { TbBallon } from "react-icons/tb";
import { convertTimestamp } from "../../utils/data";
import { BiNews } from "react-icons/bi";

const UserProfile = ({ data, setEditProfile }) => {
  return (
    <section className="userProfile">
      <div className="cover">
        {data[0]?.cover ? (
          <div className="coverImage"></div>
        ) : (
          <div className="noCover">
            <img src={coverImage} alt="cover pic" />
          </div>
        )}
      </div>

      <div className="userBar">
        {data[0]?.photoURL ? (
          <div className="activeUserImage"></div>
        ) : (
          <div className="activeUserNoImg">
            <img src={image} alt="no pic" />
          </div>
        )}

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

            <div className="born">
              <TbBallon />
              {data[0]?.dob && <p>{data[0]?.dob}</p>}
            </div>
          </div>
          <p className="joined">
            <BiNews size={15} />
            Joined {data && convertTimestamp(data[0]?.createdAt)}
          </p>

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
    </section>
  );
};

export default UserProfile;
