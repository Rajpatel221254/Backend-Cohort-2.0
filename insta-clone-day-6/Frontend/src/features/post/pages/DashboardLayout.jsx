import { Outlet } from "react-router";
import LeftPanel from "../components/LeftPanel";
import "../styles/dashboard.scss";
import { useEffect } from "react";
import { usePost } from "../hooks/usePost";

const DashboardLayout = () => {

  const { handleGetAllPost } = usePost();

  useEffect(() => {
    handleGetAllPost();
  }, []);

  return (
    <div className="dashboardLayout">
      <LeftPanel />
      <div className="contentArea">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
