import { Button, IconButton, Tooltip } from "@mui/material";
import { useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import getAuthContext from "../../contexts/authContext";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Email, LinkedIn } from "@mui/icons-material";

function FooterComponent() {
  return (
    <div className="items-center font-semibold capitalize border-t-2 gap-2 py-6 border-dashed text-gray-800 dark:text-gray-100 w-full dark:border-[#343434] text-lg flex justify-center flex-wrap">
      <p className="text-center text-xl tracking-wider">
        Copyright © 2024 Odule Ayanfeoluwa
      </p>
      <span>—</span>
      Connect
      <span>—</span>
      <div className="flex items-center justify-center pt-1">
        <Tooltip title="Connect on Linkedin">
          <IconButton href="https://linkedin.com/in/ogayanfe" target="_blank">
            <LinkedIn />
          </IconButton>
        </Tooltip>
        <Tooltip title="View github profile">
          <IconButton href="https://github.com/ogayanfe" target="_blank">
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Contact me">
          <IconButton
            href="https://ogayanfe.netlify.app/#contact"
            target="_blank"
          >
            <Email />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default function HomeRoute() {
  const authContext = getAuthContext();
  useEffect(() => {
    document.title = "WebSandbox | Home";
  }, []);

  return (
    <div className="flex w-screen h-full flex-col">
      <div className="flex w-full h-full gap-10 flex-col items-center justify-center flex-wrap p-5">
        <div className="flex flex-col gap-1 text-2xl md:text-2xl lg:text-4xl font-bold text-blue-500 italic text-center">
          <p>Code. Experiment. Create</p>
          <p>The Online Sandbox for Your Programming Ideas.</p>
        </div>
        <a
          className="capitalize texT-md lg:text-lg text-center dark:text-gray-400 font-medium text-gray-600 transition-colors hover:text-blue-500 underline hover:dark:text-white"
          target="_blank"
          href="https://github.com/ogayanfe/websandbox?tab=GPL-3.0-1-ov-file"
        >
          licensed under GPL-3.0
        </a>
        <div className="flex w-full gap-2 justify-center items-center max-sm:flex-col max-md:max-w-screen">
          <Button
            startIcon={
              authContext?.authenticated() ? <DashboardIcon /> : <LoginIcon />
            }
            variant="contained"
            component={Link}
            to="/dashboard"
          >
            {authContext?.authenticated()
              ? "View Dashboard"
              : "Login To Websandbox"}
          </Button>
          <Button
            endIcon={<VisibilityOutlinedIcon />}
            variant="contained"
            color="secondary"
            component={Link}
            to="/demos"
          >
            open project demos
          </Button>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
