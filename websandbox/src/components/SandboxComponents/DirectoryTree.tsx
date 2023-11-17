import { Tree } from "react-arborist";
import useSandboxContext from "../../contexts/sandboxContext";
import DirectoryNode from "./DirectoryNode";
import { useState, useEffect } from "react";

/* This is the simplest tree */
export default function DirectoryTree() {
  const sandboxContext = useSandboxContext();
  const [windowHeight, setWindowHeight] = useState(0);

  function updateHeight() {
    setWindowHeight(window.innerHeight);
  }
  useEffect(() => {
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return (
    <Tree
      className="h-full overflow-y-scroll tree-container"
      data={sandboxContext.treeData.children}
      width="100%"
      indent={13}
      height={window.innerHeight - 190}
      onSelect={(node) => {
        for (let n of node) {
          if (n.isLeaf) sandboxContext.selectFileId(n.id);
        }
      }}
      searchTerm={sandboxContext.searchTerm}
      searchMatch={(node, term) => node.data.name.toLowerCase().includes(term.toLowerCase())}
      onDelete={({ ids }) => sandboxContext.deleteTreeNode(ids)}
      onRename={({ id, name }) => sandboxContext.updateTreeNode(id, name)}
      onCreate={({ parentId, type }) => sandboxContext.createTreeNode(parentId, type)}
      onMove={({ parentId, dragIds }) => sandboxContext.moveTreeNode(dragIds, parentId)}
    >
      {DirectoryNode}
    </Tree>
  );
}
