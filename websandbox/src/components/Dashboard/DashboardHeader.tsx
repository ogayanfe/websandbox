import { IconButton, Button, Avatar } from "@mui/material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import useAuthContext from "../../contexts/authContext";

export default function DashboardHeader() {
  const textColor = " rgb(134 134 134);";
  const authContext = useAuthContext();
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
          <Avatar sx={{ width: 30, height: 30 }} variant="circular">
            {authContext?.user?.username[0].toUpperCase()}
          </Avatar>
        </div>
      </nav>
    </div>
  );
}
