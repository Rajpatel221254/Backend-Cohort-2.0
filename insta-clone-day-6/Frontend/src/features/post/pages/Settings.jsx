import React from "react";
import "../styles/settings.scss";

const Settings = () => {
  return (
    <div className="contentArea settingsPage">
      <div className="pageHeader">
        <h2>Settings</h2>
      </div>

      <div className="settingsContainer">
        <div className="settingsContent">
          <div className="settingsSection">
            <div className="settingItem">
              <div className="settingInfo">
                <h4>Dark Mode</h4>
                <p>Adjust appearance to reduce glare</p>
              </div>
              <label className="toggleSwitch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          
          <div className="settingsSection">
            <button className="dangerBtn">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
