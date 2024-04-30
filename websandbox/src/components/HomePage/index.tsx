import { Button, IconButton, Tooltip } from "@mui/material";
import { useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import getAuthContext from "../../contexts/authContext";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import { LinkedIn } from "@mui/icons-material";

function FooterComponent(){
  return (
    <div className="p-5 border-t-[1px] w-full dark:border-[#343434] text-lg flex justify-between lg:px-20">
      <p className="text-center">Created by @ogayanfe</p>
      <div>
        <span className="max-sm:hidden">Connect With Me : </span>
        <Tooltip title="Connect on Linkedin">
          <IconButton href="https://linkedin.com/in/ogayanfe" target="_blank">
            <LinkedIn/>
          </IconButton>
        </Tooltip>
        <Tooltip title="View github profile">
          <IconButton href="https://github.com/ogayanfe" target="_blank">
            <GitHubIcon/>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}

export default function HomeRoute() {
  const authContext = getAuthContext();
  useEffect(() => {
    document.title = "WebSandbox | Home";
  }, []);

  return (
    <div className="flex w-screen h-full flex-col">
      <div className="flex w-full h-full gap-10 flex-col items-center justify-center flex-wrap p-5">
        <div className="flex flex-col gap-1 text-3xl font-bold text-blue-500 italic text-center">
          <p>Code. Experiment. Create</p>
          <p>The Online Sandbox for Your Programming Ideas.</p>
        </div>
        <p className="capitalize text-lg dark:text-gray-500 font-medium text-gray-700">licensed under MIT</p>
        <div className="flex w-full gap-2 justify-center items-center max-md:flex-col max-md:max-w-screen">
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
            target="_blank"
            to="https://github.com/ogayanfe/websandbox"
            >
            Open Project Github
          </Button>
        </div>
      </div>
      <FooterComponent/>
    </div>
  );
}
