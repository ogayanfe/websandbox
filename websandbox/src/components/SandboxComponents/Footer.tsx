import { ForkLeftOutlined } from "@mui/icons-material";
import { Tooltip, Button } from "@mui/material";
import useSandboxContext from "../../contexts/sandboxContext";
import { getFileIcon, getNodePath } from "../../utils/sandboxUtils";
import Typography from "@mui/material/Typography";
import useAuthContext from "../../contexts/authContext";

export default function Footer() {
  const sandboxContext = useSandboxContext();
  const path = getNodePath(sandboxContext.selectedFileId, sandboxContext.treeData);
  const authContext = useAuthContext();

  return (
    <footer className="flex justify-between px-8 dark:text-gray-100 text-sm border-t-[1px] dark:border-[#343434] dark:bg-blcack">
      <Tooltip title="Fork Project">
        <Button
          startIcon={<ForkLeftOutlined />}
          size="small"
          disabled={!authContext?.authenticated()}
          onClick={() => sandboxContext.setShowForkComponent(true)}
        >
          Fork Sandbox
        </Button>
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
