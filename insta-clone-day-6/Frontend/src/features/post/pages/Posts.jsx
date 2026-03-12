import React, { useState } from "react";
import "../styles/posts.scss";
import { RiImageAddFill, RiMapPin2Fill, RiUserAddFill, RiSendPlaneFill, RiHeartLine } from "@remixicon/react";
import { usePost } from "../../post/hooks/usePost";
import {useAuth} from "../../auth/hooks/useAuth"

const Posts = () => {

  const { handleCreatePost, posts } = usePost()
  const {user} = useAuth()

  const [postText, setPostText] = useState("")
  const [postImage, setPostImage] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("form submitted");

    const formData = new FormData()
    formData.append("caption", postText)
    formData.append("postImage", postImage)

    setPostText("")
    setPostImage(null)

    await handleCreatePost(formData)
  }

  if (!user) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="contentArea postsPage">
      <div className="pageHeader">
        <h2>Create New Post</h2>
      </div>

      <div className="createPostCard">
        <div className="authorInfo">
          <img
            className="userAvatar"
            src={user.profilePic}
            alt="Profile"
          />
          <div>
            <h3>{user.fullname}</h3>
            <span>Public</span>
          </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <textarea
            placeholder="What's on your mind, Alexandra?"
            className="postInput"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            rows={3}
          ></textarea>

          <div className="imageUploadArea">
            <label htmlFor="postPic">
              <RiImageAddFill className="icon" />
              <span>Click to select an image</span>
            </label>
            <input type="file" id="postPic" name="postPic" onChange={(e) => setPostImage(e.target.files[0])} />
          </div>

          <div className="postActions">
            <button className="submitBtn" type="submit">
              Publish <RiSendPlaneFill className="icon" />
            </button>
          </div>
        </form>
      </div>

      {
        posts.map((post) => {
          return <div className="postCard" key={post._id}>
            <div className="postHeader">
              <div className="userInfo">
                <img className="userAvatar" src={post.user.profilePic} alt="Laura" />
                <div className="textInfo">
                  <h4 className="name">{post.user.fullname}</h4>
                  <span className="time">Just now</span>
                </div>
              </div>
              <button className="followBtn">Follow</button>
            </div>
            <p className="postText">
              {post.caption}
            </p>
            <div className="postImages">
              <div className="mainImage">
                <img src={post.image} alt="Post img 1" />
              </div>
            </div>
            <div className="postFooter">
              <button className="actionBtn likeBtn">
                <RiHeartLine className="icon" />
                <span>Like</span>
              </button>
            </div>
          </div>
        })
      }

    </div>
  );
};

export default Posts;
