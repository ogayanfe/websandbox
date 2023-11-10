import { Button } from "@mui/material";
import { useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import getAuthContext from "../../contexts/authContext";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function HomeRoute() {
  const authContext = getAuthContext();
  useEffect(() => {
    document.title = "WebSandbox | Home";
  }, []);

  return (
    <div className="flex w-screen h-4/5 gap-2 flex-col sm:flex-row items-center justify-center flex-wrap p-5">
      <Button
        startIcon={authContext?.authenticated() ? <DashboardIcon /> : <LoginIcon />}
        variant="contained"
        component={Link}
        to="/dashboard"
      >
        {authContext?.authenticated() ? "View Dashboard" : "Login To Websandbox"}
      </Button>
      <Button
        endIcon={<GitHubIcon />}
        variant="contained"
        color="secondary"
        component={Link}
        to="https://github.com/ogayanfe/websandbox"
      >
        Open Project Github
      </Button>
    </div>
  );
}
