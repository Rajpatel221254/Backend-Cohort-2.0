import React from "react";
import "../styles/profile.scss";
import {useAuth} from "../../auth/hooks/useAuth"

const Profile = () => {

  const { user } = useAuth()
  console.log(user);

  

  return (
    <div className="contentArea profilePage">
      <div className="profileHeader">
        <div className="coverPhoto">
          <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop" alt="Cover" />
        </div>
        <div className="profileInfo">
          <div className="avatarContainer">
            <img
              src={user.profilePic}
              alt="Profile"
              className="userAvatar"
            />
          </div>
          <div className="details">
            <div className="titleRow">
              <h2>{user.fullname}</h2>
              <button className="editBtn">Edit Profile</button>
            </div>
            <span className="handle">@{user.username}</span>
            <p className="bio">{user.bio}</p>

            <div className="stats">
              <div className="statItem">
                <span className="count">142</span>
                <span className="label">Posts</span>
              </div>
              <div className="statItem">
                <span className="count">12.5k</span>
                <span className="label">Followers</span>
              </div>
              <div className="statItem">
                <span className="count">850</span>
                <span className="label">Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profileContent">
        <div className="tabs">
          <button className="tab active">Posts</button>
          <button className="tab">Photos</button>
          <button className="tab">Likes</button>
        </div>

        <div className="postGrid">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop" alt="Post 1" />
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=300&auto=format&fit=crop" alt="Post 2" />
          <img src="https://images.unsplash.com/photo-1542224566-6f85f1c4e7ab?q=80&w=300&auto=format&fit=crop" alt="Post 3" />
          <img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=300&auto=format&fit=crop" alt="Post 4" />
          <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=300&auto=format&fit=crop" alt="Post 5" />
          <img src="https://images.unsplash.com/photo-1506744626753-1fa214d0eb04?q=80&w=300&auto=format&fit=crop" alt="Post 6" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
