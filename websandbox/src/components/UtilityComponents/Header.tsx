import { IconButton, Button, Avatar, LinearProgress } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import useAuthContext from "../../contexts/authContext";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect } from "react";
import { Link, useNavigation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import useThemeContext from "../../contexts/themeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Icon } from "@iconify/react";

export default function DashboardHeader({ className }: { className?: string }) {
  const authContext = useAuthContext();
  const themeContext = useThemeContext();
  const _className = className ? className : "";
  const navigation = useNavigation();

  useEffect(() => {
    document.title = "WebSandbox | Dashboard";
  }, []);
  return (
    <div className={_className + " W-full p-3 text-lg"}>
      {(navigation.state === "submitting" || navigation.state === "loading") && (
        <LinearProgress sx={{ position: "fixed", width: "100%", left: 0, top: 0 }} />
      )}
      <nav className="flex w-fill items-center justify-between">
        <div className="text-gray-900 dark:text-gray-200 flex items-center gap-4">
          <Tooltip title="Logo">
            <span className="flex items-center scale-150">
              <Icon icon="teenyicons:box-outline"></Icon>
            </span>
          </Tooltip>
          <h1 className="text-2xl italic font-bold">
            <Link
              to={authContext?.authenticated ? "/dashboard" : "/"}
              className="hidden xxm:inline-block"
            >
              WebSandbox
            </Link>
            <div className="xxm:hidden" aria-hidden>
              <Tooltip title="Websandbox">
                <Link to={authContext?.authenticated ? "/dashboard" : "/"}>WSb</Link>
              </Tooltip>
            </div>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden xm:inline-block">
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
          </div>

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
              <span className="fixed left-[-1000000000000px]">Open project on github</span>
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={`${
              authContext?.user?.username ? "@" + authContext.user.username : "Anonymous user"
            }`}
          >
            <Avatar sx={{ width: 30, height: 30 }} variant="circular">
              {authContext?.user?.username[0].toUpperCase()}
            </Avatar>
          </Tooltip>
          <div className="xm:hidden" aria-hidden>
            <Tooltip title={authContext?.authenticated() ? "Logout" : "Login"}>
              <IconButton
                component={Link}
                target="_blank"
                to={authContext?.authenticated() ? "/Logout" : "/login"}
                className="flex items-center"
              >
                <span className="fixed left-[-1000000000000px]">
                  {authContext?.authenticated() ? "Logout" : "Login"}
                </span>
                {authContext?.authenticated() ? <LogoutIcon /> : <LoginIcon />}
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </nav>
    </div>
  );
}
