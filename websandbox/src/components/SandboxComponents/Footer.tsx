import useSandboxContext from "../../contexts/sandboxContext";
import { getFileIcon, getNodePath } from "../../utils/sandboxUtils";

export default function Footer() {
  const sandboxContext = useSandboxContext();
  const path = getNodePath(sandboxContext.selectedFileId, sandboxContext.treeData);

  return (
    <footer className="flex justify-end px-4 dark:text-gray-100 text-xm border-t-[1px] dark:border-[#343434] dark:bg-black">
      <div className="border-l-[1px] p-[.1rem] border-gray-500 dark:border-[#343434] px-4 capitalize flex gap-2 items-center justify-center">
        <span className="text-lg">
          {path ? getFileIcon(path[path?.length - 1]) : getFileIcon(".txt")}
        </span>
        <span>{sandboxContext.selectedFileId ? sandboxContext.fileMode : "Text"}</span>
      </div>
    </footer>
  );
}
