import { ForkLeftOutlined } from "@mui/icons-material";
import { Tooltip, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useSandboxContext from "../../contexts/sandboxContext";
import { getFileIcon, getNodePath } from "../../utils/sandboxUtils";
import Typography from "@mui/material/Typography";

export default function Footer() {
  const sandboxContext = useSandboxContext();
  const path = getNodePath(sandboxContext.selectedFileId, sandboxContext.treeData);
  const param = useParams();

  return (
    <footer className="flex justify-between px-4 dark:text-gray-100 text-sm border-t-[1px] dark:border-[#343434] dark:bg-black">
      <Tooltip title="Login to save project">
        <span>
          <Button
            component={Link}
            startIcon={<ForkLeftOutlined />}
            size="small"
            color="info"
            to={`/${param.username}/${param.project}/fork`}
          >
            Fork Sandbox
          </Button>
        </span>
      </Tooltip>
      <div className="flex">
        <div className="border-l-[1px] p-1 border-gray-500 dark:border-[#343434] px-4 capitalize flex gap-2 items-center justify-center">
          <Typography fontSize={".81rem"}>
            {sandboxContext.fileTreeHash.current === sandboxContext.fileTreeHash.lastSaved
              ? "No Changes Detected"
              : "You have unsaved changes"}
          </Typography>
        </div>
        <div className="border-l-[1px] p-[.1rem] border-gray-500 dark:border-[#343434] px-4 capitalize flex gap-2 items-center justify-center">
          <span className="text-lg">
            {path ? getFileIcon(path[path?.length - 1]) : getFileIcon(".txt")}
          </span>
          <span>{sandboxContext.selectedFileId ? sandboxContext.fileMode : "Text"}</span>
        </div>
      </div>
    </footer>
  );
}
