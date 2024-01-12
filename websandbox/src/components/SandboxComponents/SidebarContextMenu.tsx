import { NodeApi } from "react-arborist";
import { Icon } from "@iconify/react";
import { TreeNodeType } from "../../types/utils/sandboxUtils";
import useSandboxContext from "../../contexts/sandboxContext";

interface NodeContextPropType {
  node: NodeApi<TreeNodeType>;
}

export default function NodeContext({ node }: NodeContextPropType) {
  const sandboxContext = useSandboxContext();

  return (
    <div
      className="absolute top-2 w-40 right-0 z-[100] gap-1 bg-gray-100 dark:bg-[rgb(10,10,10)] flex flex-col shadow-lg p-1 pl-3 py-4 rounded-md text-xm"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="flex py-1 items-center gap-3"
        onClick={() => {
          sandboxContext.hideContext();
          node.edit();
        }}
      >
        <Icon icon="material-symbols:edit" className="text-lg" />
        <span>Edit</span>
      </button>
      <button
        className="flex py-1 items-center gap-3"
        onClick={() => {
          sandboxContext.hideContext();
          node.tree.delete(node.id);
        }}
      >
        <Icon icon="material-symbols:delete-outline" className="text-lg" />
        <span>Delete</span>
      </button>
      {node.isInternal ? (
        <>
          <button
            className="flex py-1 items-center gap-3"
            onClick={() => {
              node.tree.create({ type: "leaf", parentId: node.id });
              sandboxContext.hideContext();
            }}
          >
            <Icon icon="eva:file-add-outline" className="text-lg" />
            <span>Add file</span>
          </button>
          <button
            className="flex py-1 items-center gap-3"
            onClick={() => {
              node.tree.create({ type: "internal", parentId: node.id });
              sandboxContext.hideContext();
            }}
          >
            <Icon icon="quill:folder-add" className="text-lg" />
            <span>Add folder</span>
          </button>
          <button
            className="flex py-1 items-center gap-3"
            onClick={() => {
              node.tree.closeAll();
              sandboxContext.hideContext();
            }}
          >
            <Icon icon="mingcute:list-collapse-line" className="text-lg" />
            <span>Collapse</span>
          </button>
          <button
            className="flex py-1 items-center gap-3"
            onClick={() => {
              node.tree.openAll();
              sandboxContext.hideContext();
            }}
          >
            <Icon icon="ic:baseline-expand" className="text-lg" />
            <span>Expand</span>
          </button>
        </>
      ) : (
        <button
          className="flex py-1 items-center gap-3"
          onClick={() => {
            if (node.id === sandboxContext.selectedFileId) {
              sandboxContext.selectFileId("");
              node.deselect();
            } else {
              sandboxContext.selectFileId(node.id);
              node.select();
            }
            sandboxContext.hideContext();
          }}
        >
          <Icon
            icon={
              node.id === sandboxContext.selectedFileId
                ? "material-symbols:close"
                : "fluent:open-16-regular"
            }
            className="text-lg"
          />
          <span>{node.id === sandboxContext.selectedFileId ? "Close file" : "Open file"}</span>
        </button>
      )}
    </div>
  );
}

export function HeaderContext() {
  const sandboxContext = useSandboxContext();

  return (
    <div
      className="absolute top-2 w-40 right-0 z-[100] gap-1 bg-gray-100 dark:text-gray-100 dark:bg-[rgb(10,10,10)] flex flex-col shadow-lg p-1 pl-3 py-4 rounded-md text-xm"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="flex py-1 items-center gap-3"
        onClick={() => {
          sandboxContext.createTreeNode(null, "leaf");
          sandboxContext.hideContext();
        }}
      >
        <Icon icon="eva:file-add-outline" className="text-lg" />
        <span>Add file</span>
      </button>
      <button
        className="flex py-1 items-center gap-3"
        onClick={() => {
          sandboxContext.createTreeNode(null, "internal");
          sandboxContext.hideContext();
        }}
      >
        <Icon icon="quill:folder-add" className="text-lg" />
        <span>Add folder</span>
      </button>
    </div>
  );
}
