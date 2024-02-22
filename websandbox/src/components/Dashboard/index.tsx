import { Outlet, useLocation, useRevalidator } from "react-router-dom";
import useAuthContext from "../../contexts/authContext";
import { useEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function DashboardBase() {
  const location = useLocation();
  const authContext = useAuthContext();
  const revalidator = useRevalidator();

  function getTabName() {
    const p = location.pathname.split("/");
    const lnode = p[p.length - 1];
    return ["starred", "update"].includes(lnode) ? lnode : "work";
  }

  const [tabValue, setTabValue] = useState(getTabName());

  useEffect(() => {
    if (revalidator.state === "idle" && authContext?.authenticated && authContext.user === null) {
      revalidator.revalidate();
    }
  }, []);

  useEffect(() => {
    setTabValue(getTabName());
  });

  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-full flex h-full flex-grow max-lg:flex-col max-lg:items-center justify-center">
        <div className="w-[300px] max-lg:hidden pt-16 ">
          <Tabs
            variant="scrollable"
            component="nav"
            orientation="vertical"
            aria-label="select tab to view"
            value={tabValue}
            onChange={(_, v) => setTabValue(v)}
          >
            <Tab label="Your Work" component={Link} value="work" to="./" />
            <Tab label="Starred projects" component={Link} value="starred" to="./starred" />
          </Tabs>
        </div>
        <div className="flex-grow w-full h-full flex flex-col items-center justify-center">
          <h2 className="text-xl xl:text-2xl font-semibold text-center text-gray-800 dark:text-blue-100 p-4 pb-8">
            Welcome back, <span className="italic capitalize">{authContext?.user?.username}</span>
          </h2>
          <div className="lg:hidden">
            <Tabs
              variant="scrollable"
              component="nav"
              // orientation="vertical"
              aria-label="select tab to view"
              value={tabValue}
              onChange={(_, v) => setTabValue(v)}
            >
              <Tab label="Your Work" component={Link} value="work" to="./" />
              <Tab label="Starred projects" component={Link} value="starred" to="./starred" />
            </Tabs>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
