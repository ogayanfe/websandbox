import { IconButton, Button, Avatar } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import useAuthContext from "../../contexts/authContext";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useThemeContext from "../../contexts/themeContext";
import LightModeIcon from "@mui/icons-material/LightMode";

function HeaderButtonLink(props: { children: ReactNode }) {
  let url = "/login";
  const authContext = useAuthContext();
  if (authContext?.authenticated()) {
    url = "/create";
  }

  return (
    <Link to={url} {...props}>
      {props.children}
    </Link>
  );
}

export default function DashboardHeader() {
  const textColor = "rgb(134 134 134);";
  const authContext = useAuthContext();
  const themeContext = useThemeContext();

  useEffect(() => {
    document.title = "WebSandbox | Dashboard";
  }, []);
  return (
    <div className="W-full p-2 px-4 text-lg">
      <nav className="flex w-fill items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center scale-150">
            <iconify-icon icon="teenyicons:box-outline"></iconify-icon>
          </span>
          <h1 className="dark:text-gray-200 text-2xl italic">WebSandbox</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            component={HeaderButtonLink}
            variant="contained"
            color="primary"
            size="small"
            startIcon={authContext?.authenticated() ? <AddRoundedIcon /> : <LoginIcon />}
          >
            {authContext?.authenticated() ? "Create" : "Login"}
          </Button>
          <IconButton aria-label="Notification">
            {themeContext?.darkTheme ? (
              <DarkModeIcon className="bg-inherit" sx={{ color: textColor }} />
            ) : (
              <LightModeIcon className="bg-inherit" sx={{ color: textColor }} />
            )}
          </IconButton>
          <a
            href="https://github.com/ogayanfe/websandbox"
            target="_blank"
            className="flex items-center"
          >
            <span className="fixed left-[-1000000000000px]">Github Link</span>
            <GitHubIcon sx={{ color: textColor }} />
          </a>
          <Avatar sx={{ width: 30, height: 30 }} variant="circular">
            {authContext?.user?.username[0].toUpperCase()}
          </Avatar>
        </div>
      </nav>
    </div>
  );
}
