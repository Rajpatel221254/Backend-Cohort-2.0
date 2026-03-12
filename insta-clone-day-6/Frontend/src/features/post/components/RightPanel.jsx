import "../styles/rightpanel.scss";
import { RiMoreFill } from "@remixicon/react";

const RightPanel = () => {
  return (
    <div className="rightPanel">
      
      <div className="requests">
        <div className="sectionHeader">
          <span>REQUESTS</span>
          <span className="badge">2</span>
        </div>

        <div className="requestCard">
          <div className="reqUserInfo">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=50&auto=format&fit=crop"
              alt="Tyrell"
            />
            <div className="reqText">
              <h4>Tyrell Barrows</h4>
              <p>wants to add you to friends</p>
            </div>
          </div>
          <div className="reqActions">
            <button className="acceptBtn">Accept</button>
            <button className="declineBtn">Decline</button>
          </div>
        </div>

        <div className="requestCard">
          <div className="reqUserInfo">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=50&auto=format&fit=crop"
              alt="Selena"
            />
            <div className="reqText">
              <h4>Selena Gomez</h4>
              <p>wants to add you to friends</p>
            </div>
          </div>
          <div className="reqActions">
            <button className="acceptBtn">Accept</button>
            <button className="declineBtn">Decline</button>
          </div>
        </div>
      </div>

      {/* Contacts Section */}
      <div className="contacts">
        <div className="sectionHeader">
          <span>CONTACTS</span>
          <span className="badge">68</span>
        </div>

        <div className="contactList">
          <div className="contactItem">
            <div className="contactInfo">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=50&auto=format&fit=crop"
                alt="Amanda"
              />
              <span>Amanda Miles</span>
            </div>
            <button className="moreBtn">
              <RiMoreFill />
            </button>
          </div>
          <div className="contactItem">
            <div className="contactInfo">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=50&auto=format&fit=crop"
                alt="Melissa"
              />
              <span>Melissa Byron</span>
            </div>
            <button className="moreBtn">
              <RiMoreFill />
            </button>
          </div>
          <div className="contactItem">
            <div className="contactInfo">
              <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=50&auto=format&fit=crop"
                alt="Ronald"
              />
              <span>Ronald Bezos</span>
            </div>
            <button className="moreBtn">
              <RiMoreFill />
            </button>
          </div>
          <div className="contactItem hasNotif">
            <div className="contactInfo">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=50&auto=format&fit=crop"
                alt="Billy"
              />
              <span>Billy Rosewood</span>
            </div>
            <button className="moreBtn">
              <RiMoreFill />
            </button>
          </div>
          <div className="contactItem">
            <div className="contactInfo">
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=50&auto=format&fit=crop"
                alt="Katty"
              />
              <span>Katty Monroe</span>
            </div>
            <button className="moreBtn">
              <RiMoreFill />
            </button>
          </div>
          <div className="contactItem hasNotif">
            <div className="contactInfo">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=50&auto=format&fit=crop"
                alt="Kurt"
              />
              <span>Kurt Williamson</span>
            </div>
            <button className="moreBtn">
              <RiMoreFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
