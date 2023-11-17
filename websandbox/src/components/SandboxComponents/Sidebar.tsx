import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { useParams } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import useSandboxContext from "../../contexts/sandboxContext";
import DirectoryTree from "./DirectoryTree";

function SidebarHeader() {
  const params = useParams();
  const sandboxContext = useSandboxContext();

  return (
    <div className="w-full h-full">
      <div className="dark:text-gray-200 py-2 flex gap-4 items-center">
        <Tooltip title={sandboxContext?.visibleSidebar ? "Close Sidebar" : "Open Sidebar"}>
          <MenuOpenIcon />
        </Tooltip>
        <p className="text-lg capitalize font-bold">{params.project}</p>
      </div>
      <TextField
        sx={{ width: "100%", height: "1rem", fontSize: "normal" }}
        size="small"
        placeholder="Go to file"
        value={sandboxContext.searchTerm}
        onChange={sandboxContext.updateSearchTerm}
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
    <div className="flex flex-col w-full overflow-hidden px-3">
      <SidebarHeader />
      <div className="flex-grow w-full h-full mt-6">
        <DirectoryTree />
      </div>
    </div>
  );
}
