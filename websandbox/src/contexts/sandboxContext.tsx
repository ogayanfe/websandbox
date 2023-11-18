import { createContext, useContext, useState } from "react";
import data, {
  TreeDataType,
  createNode,
  deleteNode,
  moveNode,
  updateNode,
  getNodePath,
} from "../utils/sandboxUtils";

interface SandboxContextType {
  visibleSidebar: Boolean;
  showSidebar: () => void;
  hideSidebar: () => void;
  toggleSidebar: () => void;
  treeData: TreeDataType;
  searchTerm: string;
  updateSearchTerm: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  deleteTreeNode: (id: string[]) => void;
  updateTreeNode: (id: string, name: string) => void;
  createTreeNode: (parentId: string | null, type: "leaf" | "internal") => null;
  moveTreeNode: (ids: string[], parentId: string | null) => void;
  selectedFileId: string;
  selectFileId: (nodeId: string) => void;
  getSelectedPath: () => string[] | null;
  getNodePath: (id: string | null) => string[] | null;
}

const sandboxContext = createContext<SandboxContextType>({
  visibleSidebar: true,
  showSidebar: console.log,
  hideSidebar: console.log,
  toggleSidebar: console.log,
  treeData: {
    id: null,
    name: "",
    children: [],
  },
  updateSearchTerm: console.log,
  searchTerm: "",
  deleteTreeNode: console.log,
  updateTreeNode: console.log,
  createTreeNode: () => null,
  moveTreeNode: console.log,
  selectedFileId: "",
  selectFileId: console.log,
  getSelectedPath: () => null,
  getNodePath: () => null,
});

function SandboxContextProvider({ children }: { children: React.ReactNode }) {
  const [visibleSidebar, setVisibleSidebar] = useState<Boolean>(true);
  const [treeData, setTreeData] = useState<TreeDataType>(data);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFileId, setSelectedFileId] = useState<string>("");

  function deleteTreeNode(ids: string[]) {
    const treeCopy = { ...treeData };
    for (let id of ids) {
      deleteNode(id, treeCopy);
      if (selectedFileId === id) setSelectedFileId("");
    }
    setTreeData(treeCopy);
  }

  function updateTreeNode(id: string, name: string) {
    const treeCopy = { ...treeData };
    updateNode(id, name, treeCopy);
    setTreeData(treeCopy);
    setSelectedFileId(id);
  }

  function createTreeNode(parentId: string | null, type: "leaf" | "internal") {
    const treeCopy = { ...treeData };
    const name = window.prompt(`Enter ${type === "leaf" ? "file" : "folder"} Name:`) as string;
    createNode(parentId, name, Math.random().toString(), type, treeCopy);
    setTreeData(treeCopy);
    return null;
  }

  function moveTreeNode(ids: string[], parentId: string | null) {
    const treeCopy = { ...treeData };
    for (let id of ids) {
      moveNode(id, parentId, treeCopy);
    }
    setTreeData(treeCopy);
  }

  const context = {
    visibleSidebar,
    showSidebar: () => setVisibleSidebar(true),
    hideSidebar: () => setVisibleSidebar(false),
    toggleSidebar: () => setVisibleSidebar((p) => !p),
    updateSearchTerm: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchTerm(e.target.value);
    },
    treeData: treeData,
    searchTerm,
    deleteTreeNode,
    updateTreeNode,
    createTreeNode,
    moveTreeNode,
    selectedFileId,
    getSelectedPath: () => getNodePath(selectedFileId, treeData),
    getNodePath: (id: string | null) => getNodePath(id, treeData),
    selectFileId: (id: string) => setSelectedFileId(id),
  };

  return <sandboxContext.Provider value={context}>{children}</sandboxContext.Provider>;
}

function useSandboxContext() {
  return useContext(sandboxContext);
}

export default useSandboxContext;
export { SandboxContextProvider, sandboxContext };
