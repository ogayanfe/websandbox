import { Outlet, useLocation, useRevalidator } from "react-router-dom";
import useAuthContext from "../../contexts/authContext";
import { getApiClient } from "../../utils/authutils";
import { useEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export async function dashboardHomeLoader() {
  const apiClient = getApiClient();
  const response = await apiClient.get("/sandbox/");
  return response.data;
}

export default function DashboardBase() {
  const location = useLocation();
  const authContext = useAuthContext();
  const revalidator = useRevalidator();

  const [tabValue, setTabValue] = useState(() => {
    const p = location.pathname.split("/");
    console.log(p[p.length - 1]);
    const lnode = p[p.length - 1];
    console.log(lnode);
    return ["starred", "update"].includes(lnode) ? lnode : "work";
  });

  useEffect(() => {
    if (revalidator.state === "idle" && authContext?.authenticated && authContext.user === null) {
      revalidator.revalidate();
    }
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl xl:text-2xl font-semibold text-center text-gray-800 dark:text-blue-100 p-8">
        Welcome back, <span className="italic capitalize">{authContext?.user?.username}</span>
      </h2>
      <Tabs
        variant="scrollable"
        component="nav"
        aria-label="select tab to view"
        value={tabValue}
        onChange={(_, v) => setTabValue(v)}
      >
        <Tab label="Your Work" component={Link} value="work" to="./" />
        <Tab label="Starred projects" component={Link} value="starred" to="./starred" />
        <Tab label="Update Profile" component={Link} value="update" to="./update" />
      </Tabs>
      <Outlet />
    </div>
  );
}
