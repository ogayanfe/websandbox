import { Tree } from "react-arborist";
import useSandboxContext from "../../contexts/sandboxContext";

/* This is the simplest tree */
export default function DirectoryTree() {
  const sandboxContext = useSandboxContext();

  return (
    <Tree
      className="Tree"
      data={sandboxContext.treeData.children}
      width="100%"
      rowHeight={28}
      searchTerm={sandboxContext.searchTerm}
      searchMatch={(node, term) => node.data.name.toLowerCase().includes(term.toLowerCase())}
      onDelete={({ ids }) => sandboxContext.deleteTreeNode(ids)}
      onRename={({ id, name }) => sandboxContext.updateTreeNode(id, name)}
      onCreate={({ parentId, type }) => sandboxContext.createTreeNode(parentId, type)}
      onMove={({ parentId, dragIds }) => sandboxContext.moveTreeNode(dragIds, parentId)}
    ></Tree>
  );
}
