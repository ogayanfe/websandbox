import { IconButton, Button, Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import useAuthContext from "../../contexts/authContext";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import useThemeContext from "../../contexts/themeContext";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function DashboardHeader() {
  const authContext = useAuthContext();
  const themeContext = useThemeContext();

  useEffect(() => {
    document.title = "WebSandbox | Dashboard";
  }, []);
  return (
    <div className="W-full p-2 px-4 text-lg">
      <nav className="flex w-fill items-center justify-between">
        <div className="text-gray-900 dark:text-gray-200 flex items-center gap-4">
          <span className="flex items-center scale-150">
            <iconify-icon icon="teenyicons:box-outline"></iconify-icon>
          </span>
          <h1 className="text-2xl italic font-bold">
            <Link to="/">WebSandbox</Link>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            component={Link}
            variant="contained"
            color="primary"
            size="small"
            to={authContext?.authenticated() ? "/logout" : "/login"}
            startIcon={authContext?.authenticated() ? <LogoutIcon /> : <LoginIcon />}
          >
            {authContext?.authenticated() ? "Logout" : "Login"}
          </Button>
          <Tooltip
            title={themeContext?.darkTheme ? "Switch to light theme" : "Switch to dark Theme"}
          >
            <IconButton aria-label="Toggle Theme" onClick={themeContext?.toggleTheme}>
              {themeContext?.darkTheme ? (
                <LightModeIcon className="bg-inherit" />
              ) : (
                <DarkModeIcon className="bg-inherit" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Open project github">
            <IconButton
              href="https://github.com/ogayanfe/websandbox"
              target="_blank"
              className="flex items-center"
            >
              <span className="fixed left-[-1000000000000px]">Open project github</span>
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={`@${authContext?.user?.username}`}>
            <Avatar sx={{ width: 30, height: 30 }} variant="circular">
              {authContext?.user?.username[0].toUpperCase()}
            </Avatar>
          </Tooltip>
        </div>
      </nav>
    </div>
  );
}
