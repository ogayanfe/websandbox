import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { useParams } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import useSandboxContext from "../../contexts/sandboxContext";

function SidebarHeader() {
  const params = useParams();
  const sandboxContext = useSandboxContext();

  return (
    <div className="w-full h-full">
      <div className="dark:text-gray-200 py-2 flex gap-4 items-center">
        <Tooltip title={sandboxContext?.visibleSidebar ? "Close Sidebar" : "Open Sidebar"}>
          <MenuOpenIcon />
        </Tooltip>
        <p className="text-lg lowercase font-bold">{params.project}</p>
      </div>
      <TextField
        sx={{ width: "100%", height: "1rem", fontSize: "normal" }}
        size="small"
        placeholder="Go to file"
        InputProps={{
          "aria-label": "Search",
          sx: { transform: "scaleY(.85)", fontStyle: "normal" },
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden px-3">{<SidebarHeader />}</div>
  );
}
