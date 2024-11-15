import { NodeRendererProps } from "react-arborist";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getFileIcon } from "../../utils/sandboxUtils";
import { TreeNodeType } from "../../types/utils/sandboxUtils";
import { Icon } from "@iconify/react";
import useSandboxContext from "../../contexts/sandboxContext";
import { IconButton } from "@mui/material";
import SidebarContext from "./SidebarContextMenu";

export default function DirectoryNode({
  node,
  style,
  dragHandle,
}: Readonly<NodeRendererProps<TreeNodeType>>) {
  const sandboxContext = useSandboxContext();
  const nodeClassNames = `dark:text-blue-50 border-blue-500 pl-4 node-child  ${
    node.id === sandboxContext.selectedFileId
      ? "border-l-2 dark:bg-[#1A1F24] bg-blue-100"
      : ""
  }`;

  return (
    <div
      className={nodeClassNames}
      style={style}
      ref={dragHandle}
      onContextMenu={(e) => {
        e.stopPropagation();
        e.preventDefault();
        sandboxContext.setCurrentNodeContextId(node.id);
      }}
    >
      <div
        className="node-content flex items-center"
        onClick={() => node.toggle()}
      >
        {node.isLeaf ? (
          <>
            <span className="arrow"></span>
            <span className={`file-folder-icon pl-2`}>
              {getFileIcon(node.data.name)}
            </span>
          </>
        ) : (
          <>
            <span className="arrow">
              {node.isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </span>
            <span className="file-folder-icon text-blue-500 ">
              <Icon icon="ic:baseline-folder" />
            </span>
          </>
        )}
        <span className="node-text flex-grow px-2">
          {node.isEditing ? (
            <input
              className="border-[1px] dark:border-blue-500 
            bg-inherit text-[.8rem] w-full p-1 outline-none flex-grow"
              type="text"
              defaultValue={node.data.name}
              onFocus={(e) => e.currentTarget.select()}
              onBlur={() => node.reset()}
              onKeyDown={(e) => {
                if (e.key === "Escape") node.reset();
                if (e.key === "Enter") node.submit(e.currentTarget.value);
              }}
              autoFocus
            />
          ) : (
            <span className="text-sm font-semibold dark:font-light pl-1">
              {node.data.name}
            </span>
          )}
        </span>
        <span className="scale-[.65] absolute right-0 invisible show-more">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              sandboxContext.setCurrentNodeContextId(node.id);
            }}
          >
            <Icon icon="simple-line-icons:options-vertical" />
          </IconButton>
        </span>
        {sandboxContext.currentNodeContextId === node.id && (
          <SidebarContext node={node} />
        )}
      </div>
    </div>
  );
}
