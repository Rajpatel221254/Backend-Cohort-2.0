import "../styles/dashboard.scss";
import Feed from "../components/Feed";
import RightPanel from "../components/RightPanel";

const Dashboard = () => {
  return (
    <div className="contentArea dashboardContent">
      <Feed />
      <RightPanel />
    </div>
  );
};

export default Dashboard;