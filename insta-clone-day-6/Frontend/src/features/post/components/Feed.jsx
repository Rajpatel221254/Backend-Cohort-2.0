import { usePost } from "../hooks/usePost";
import "../styles/feed.scss";
import { RiSearchLine, RiAddBoxLine, RiLink, RiHeartLine } from "@remixicon/react";
import { useAuth } from "../../auth/hooks/useAuth";

const Feed = () => {

  const {user} = useAuth()

  const { posts } = usePost()

  if (!user) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="feed">
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

export default Feed;