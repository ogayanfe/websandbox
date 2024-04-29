import { Tooltip, Breadcrumbs } from "@mui/material";
import useSandboxContext from "../../contexts/sandboxContext";
import { getFileIcon, getNodePath } from "../../utils/sandboxUtils";
import Typography from "@mui/material/Typography";

export default function Footer() {
  const sandboxContext = useSandboxContext();
  const path = getNodePath(sandboxContext.selectedFileId, sandboxContext.treeData);

  return (
    <footer className="flex justify-between px-8 dark:text-gray-100 text-sm border-t-[1px] py-1 dark:border-[#343434] dark:bg-blcack">
      <Tooltip title="Fork Project">
        <Breadcrumbs>
          <p className="capitdalize text-sm">@{sandboxContext.sandboxInfo?.owner.username}</p>
          <p className="capitalize text-gray-900 font-semibold dark:text-white text-md">{sandboxContext.sandboxInfo?.title}</p>
        </Breadcrumbs>
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
