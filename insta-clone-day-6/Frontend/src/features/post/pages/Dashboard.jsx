import "../styles/dashboard.scss";
import LeftPanel from "../components/LeftPanel";
import Feed from "../components/Feed";
import RightPanel from "../components/RightPanel";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <RightPanel />
      <Feed />
      <LeftPanel />
    </div>
  );
};

export default Dashboard;