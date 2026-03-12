import React from "react";
import "../styles/requests.scss";

// Mock data
const requests = [
  { id: 1, name: "Jessica Alba", handle: "@jessica", text: "wants to add you to friends", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
  { id: 2, name: "David Beck", handle: "@david", text: "wants to add you to friends", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
  { id: 3, name: "Sarah Connor", handle: "@sarah.c", text: "sent you a friend request", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
];

const Requests = () => {
  return (
    <div className="contentArea requestsPage">
      <div className="pageHeader">
        <h2>Friend Requests</h2>
      </div>
      
      <div className="requestsList">
        {requests.map(req => (
          <div className="reqCard" key={req.id}>
            <div className="reqInfo">
              <img src={req.img} alt={req.name} className="avatar" />
              <div className="reqText">
                <h3>{req.name}</h3>
                <p>{req.text}</p>
              </div>
            </div>
            <div className="reqActions">
              <button className="acceptBtn">Accept</button>
              <button className="rejectBtn">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
