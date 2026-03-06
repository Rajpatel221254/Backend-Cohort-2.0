import { useState } from "react";
import "../styles/profileSetup.scss";
import { useAuth } from "../hooks/useAuth";

const ProfileSetup = () => {
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState(null);

  const { handleUpdate, loading, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("fullname", fullname);
    formdata.append("bio", bio);
    formdata.append("profilePic", file);

    handleUpdate(formdata).then((res) => {
      console.log(user);
    });
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
  <div className="profileSetup">
    <div className="container">

      <div className="brand">
        <h1>Lumora</h1>
        <p className="subtitle">
          Complete your profile ✨
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="avatarSection">
          <label htmlFor="profilePic" className="avatarPreview">
            <span>+</span>
          </label>

          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="profilePic"
            name="profilePic"
          />
        </div>

        <div className="inputGroup">
          <label>Full Name</label>
          <input
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            name="fullname"
            required
            placeholder="Your full name"
          />
        </div>

        <div className="inputGroup">
          <label>Bio</label>
          <textarea
            onChange={(e) => setBio(e.target.value)}
            name="bio"
            required
            placeholder="Write something about yourself..."
          />
        </div>

        <button type="submit" className="primaryBtn">
          Continue
        </button>

      </form>

    </div>
  </div>
);
};

export default ProfileSetup;
