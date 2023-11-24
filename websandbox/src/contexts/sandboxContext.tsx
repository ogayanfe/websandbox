import { createContext, useContext, useEffect, useState } from "react";
import tempData, {
  TreeDataType,
  createNode,
  deleteNode,
  moveNode,
  updateNode,
  getNodePath,
  updateFileContent,
  getFileMode,
  FileModeType,
} from "../utils/sandboxUtils";

interface SandboxContextType {
  visibleSidebar: Boolean;
  showSidebar: () => void;
  hideSidebar: () => void;
  toggleSidebar: () => void;
  treeData: TreeDataType;
  showBrowser: boolean;
  toggleBrowser: () => void;
  fileMode: FileModeType;
  updateFileMode: (mode: FileModeType) => void;
  searchTerm: string;
  updateSearchTerm: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  deleteTreeNode: (id: string[]) => void;
  updateTreeNode: (id: string, name: string) => void;
  createTreeNode: (parentId: string | null, type: "leaf" | "internal") => null;
  moveTreeNode: (ids: string[], parentId: string | null) => void;
  selectedFileId: string;
  updateTreeData: (d: TreeDataType) => void;
  selectFileId: (nodeId: string) => void;
  getSelectedPath: () => string[] | null;
  getNodePath: (id: string | null) => string[] | null;
  updateFileContent: (id: string, content: string) => void;
}

const sandboxContext = createContext<SandboxContextType>({
  visibleSidebar: true,
  showSidebar: console.log,
  hideSidebar: console.log,
  toggleSidebar: console.log,
  fileMode: "text",
  updateFileMode: console.log,
  treeData: {
    id: null,
    name: "",
    children: [],
  },
  showBrowser: true,
  toggleBrowser: console.log,
  updateTreeData: console.log,
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
  updateFileContent: console.log,
});

function SandboxContextProvider({ children }: { children: React.ReactNode }) {
  const [visibleSidebar, setVisibleSidebar] = useState<Boolean>(window.innerWidth > 800);
  const [treeData, setTreeData] = useState<TreeDataType>(tempData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFileId, setSelectedFileId] = useState<string>("");
  const [showBrowser, setShowBrowser] = useState(true);
  const [fileMode, setFileMode] = useState<FileModeType>("text");

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

  function updateFileFieldContent(id: string, content: string) {
    const treeCopy = { ...treeData };
    updateFileContent(id, content, treeCopy);
    setTreeData(treeCopy);
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

  useEffect(() => {
    const path = getNodePath(selectedFileId, treeData);
    if (path && path.length > 0) setFileMode(getFileMode(path[path?.length - 1]));
  }, [selectedFileId]);

  const context = {
    visibleSidebar,
    showBrowser,
    fileMode,
    updateFileMode: (m: FileModeType) => setFileMode(m),
    toggleBrowser: () => setShowBrowser((p) => !p),
    showSidebar: () => setVisibleSidebar(true),
    hideSidebar: () => setVisibleSidebar(false),
    toggleSidebar: () => setVisibleSidebar((p) => !p),
    updateSearchTerm: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchTerm(e.target.value);
    },
    treeData: treeData,
    updateTreeData: (data: TreeDataType) => setTreeData(data),
    searchTerm,
    deleteTreeNode,
    updateTreeNode,
    createTreeNode,
    moveTreeNode,
    selectedFileId,
    updateFileContent: updateFileFieldContent,
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
