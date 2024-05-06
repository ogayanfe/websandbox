import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { useParams } from "react-router-dom";
import useSandboxContext from "../../contexts/sandboxContext";
import DirectoryTree from "./DirectoryTree";
import { Icon } from "@iconify/react";
import { HeaderContext } from "./SidebarContextMenu";

function SidebarHeader() {
  const params = useParams();
  const sandboxContext = useSandboxContext();

  function showContext(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    sandboxContext.setCurrentNodeContextId(null);
  }
  return (
    <div
      className="w-full h-full overflow-x-hidden"
      onContextMenu={showContext}
    >
      <div className="dark:text-gray-200 py-2 pt-4 text-md flex gap-4 items-center ">
        <Icon icon="mingcute:directory-fill" />
        <p className="text-lg capitalize font-bold text-blue-600">
          {params.project}
        </p>
      </div>
      <TextField
        sx={{ width: "100%", fontStyle: "normal" }}
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
      <div className="absolute right-0 scale-[.65] top-3">
        <IconButton onClick={showContext}>
          <Icon icon="simple-line-icons:options-vertical" />
        </IconButton>
      </div>
      {sandboxContext.currentNodeContextId === null && <HeaderContext />}
    </div>
  );
}

export default function Sidebar() {
  return (
    <div
      className="flex flex-col w-full overflow-hidden px-3"
      onContextMenu={() => {
        console.log;
      }}
    >
      <SidebarHeader />
      <div className="flex-grow w-full h-full mt-4">
        <DirectoryTree />
      </div>
    </div>
  );
}
