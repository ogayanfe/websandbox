import { IconButton, Button, Avatar } from "@mui/material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import useAuthContext from "../../contexts/authContext";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect } from "react";

export default function DashboardHeader() {
  const textColor = " rgb(134 134 134);";
  const authContext = useAuthContext();
  useEffect(() => {
    document.title = "WebSandbox | Dashboard";
  }, []);
  return (
    <div className="W-full p-2 px-4 text-lg">
      <nav className="flex w-fill items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center scale-150">
            <iconify-icon icon="teenyicons:box-outline"></iconify-icon>
          </span>
          <h1 className="text-gray-200 text-2xl italic">WebSandbox</h1>
        </div>
        {/* <SearchFormComponent
          icon={<SearchRoundedIcon />}
          label="Search sandboxes"
          onSubmit={console.log}
        /> */}
        <div className="flex items-center gap-2">
          <Button variant="contained" color="primary" size="small" startIcon={<AddRoundedIcon />}>
            Create
          </Button>
          <IconButton aria-label="Notification">
            <NotificationsRoundedIcon className="bg-inherit" sx={{ color: textColor }} />
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
