import React from "react";
import "../styles/ProfilePage.css";
import { BsArrowLeft } from "react-icons/bs";
import useFetchUser from "../hooks/useFetchUser";
import { useAuthContext } from "../store/authContext";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/profile/UserProfile";
import EditProfile from "../components/profile/EditProfile";
import { useProfile } from "../store/profileContext";

const ProfilePage = () => {
  const { activeUser } = useAuthContext();
  const { data, loading } = useFetchUser(activeUser?.uid, "users");
  const navigate = useNavigate();
  const { editProfle, setEditProfile } = useProfile();

  if (loading) return <p>Loading...</p>;

  return (
    <section className="profileBar">
      <div className="profileHead">
        <BsArrowLeft
          onClick={() => navigate("/")}
          cursor={"pointer"}
          size={23}
        />

        <div className="profileHeadUser">
          <h3>{data[0]?.name}</h3>
          <span>100 Tweets</span>
        </div>
      </div>
      <UserProfile
        data={data}
        setEditProfile={setEditProfile}
        uid={activeUser.uid}
      />
      {editProfle && (
        <EditProfile
          setEditProfile={setEditProfile}
          editProfile={editProfle}
          data={data}
        />
      )}
    </section>
  );
};

export default ProfilePage;
