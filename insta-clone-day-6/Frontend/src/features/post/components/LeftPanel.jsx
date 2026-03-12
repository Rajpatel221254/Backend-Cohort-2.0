import "../styles/leftpanel.scss";
import { NavLink } from "react-router";
import {
  RiHome3Fill,
  RiUserLine,
  RiImage2Line,
  RiSettingsLine,
} from "@remixicon/react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useEffect } from "react";

const LeftPanel = () => {

  const { user } = useAuth()

  if(!user){
    return <h1>Loading....</h1>
  }

  return (
    <div className="leftPanel">
      <div className="logoArea">
        <h2 className="logo">Lumora</h2>
      </div>

      <div className="profileInfo">
        <img
          src={user.profilePic}
          alt="Profile"
        />
        <div className="info">
          <h2 className="title">{user.fullname}</h2>
          <h3 className="username">@{user.username}</h3>
        </div>
      </div>

      <div className="links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "link active" : "link")}>
          <RiHome3Fill className="icon" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/requests" className={({ isActive }) => (isActive ? "link active" : "link")}>
          <RiUserLine className="icon" />
          <span>Requests</span>
        </NavLink>
        <NavLink to="/posts" className={({ isActive }) => (isActive ? "link active" : "link")}>
          <RiImage2Line className="icon" />
          <span>Posts</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "link active" : "link")}>
          <RiUserLine className="icon" />
          <span>Profile</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => (isActive ? "link active" : "link")}>
          <RiSettingsLine className="icon" />
          <span>Settings</span>
        </NavLink>
      </div>

    </div>
  );
};

export default LeftPanel;
