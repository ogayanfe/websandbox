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
  hashString,
  toContainerFileSystemTree,
} from "../utils/sandboxUtils";
import { mountFiles, updateContainerFile } from "../utils/containerUtils";

interface SandboxContextType {
  currentNodeContextId: string | null;
  visibleSidebar: Boolean;
  showSidebar: () => void;
  hideSidebar: () => void;
  hideContext: () => void;
  toggleSidebar: () => void;
  treeData: TreeDataType;
  showBrowser: boolean;
  toggleBrowser: () => void;
  fileMode: FileModeType;
  setCurrentNodeContextId: (id: string | null) => void;
  fileTreeHash: { lastSaved: string; current: string };
  updateFileTreeHash: (type: "lastSaved" | "current", hash: string) => void;
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
  currentNodeContextId: "",
  hideContext: console.log,
  setCurrentNodeContextId: console.log,
  showSidebar: console.log,
  hideSidebar: console.log,
  toggleSidebar: console.log,
  fileMode: "text",
  fileTreeHash: { lastSaved: "", current: "" },
  updateFileTreeHash: console.log,
  updateFileMode: console.log,
  treeData: {
    id: null,
    name: "Root",
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
  const [fileTreeHash, setFileTreeHash] = useState({ lastSaved: "", current: "" });
  const [currentNodeContextId, setCurrentNodeContextId] = useState<string | null>("");

  function deleteTreeNode(ids: string[]) {
    const treeCopy = { ...treeData };
    for (let id of ids) {
      deleteNode(id, treeCopy);
      if (selectedFileId === id) setSelectedFileId("");
    }
    setTreeData(treeCopy);
    mountFiles(toContainerFileSystemTree(treeCopy));
  }

  function updateTreeNode(id: string, name: string) {
    const treeCopy = { ...treeData };
    const updated = updateNode(id, name, treeCopy);
    if (!updated) return;
    setTreeData(treeCopy);
    setSelectedFileId(id);
    mountFiles(toContainerFileSystemTree(treeCopy));
  }

  function updateFileFieldContent(id: string, content: string) {
    const treeCopy = { ...treeData };
    updateFileContent(id, content, treeCopy);
    const path = getNodePath(id, treeCopy);
    setTreeData(treeCopy);
    if (path) {
      updateContainerFile(id, "/" + path.slice(1).join("/"), content);
    }
  }

  function createTreeNode(parentId: string | null, type: "leaf" | "internal") {
    const treeCopy = { ...treeData };
    const name = window.prompt(`Enter ${type === "leaf" ? "file" : "folder"} Name:`);
    if (!name) return null;
    let created = createNode(parentId, name, Math.random().toString(), type, treeCopy);
    if (!created) return null;
    setTreeData(treeCopy);
    mountFiles(toContainerFileSystemTree(treeCopy));
    return null;
  }

  function moveTreeNode(ids: string[], parentId: string | null) {
    const treeCopy = { ...treeData };
    for (let id of ids) {
      moveNode(id, parentId, treeCopy);
    }
    setTreeData(treeCopy);
    mountFiles(toContainerFileSystemTree(treeCopy));
  }

  useEffect(() => {
    const path = getNodePath(selectedFileId, treeData);
    if (path && path.length > 0) setFileMode(getFileMode(path[path?.length - 1]));
  }, [selectedFileId]);

  useEffect(() => {
    hashString(JSON.stringify(treeData.children)).then((hash: string) => {
      setFileTreeHash((prev) => ({ ...prev, current: hash }));
    });
  }, [treeData]);

  useEffect(() => {
    const hideContext = () => {
      setCurrentNodeContextId("");
    };
    window.addEventListener("click", hideContext);
    return () => window.removeEventListener("click", hideContext);
  }, []);

  const context: SandboxContextType = {
    currentNodeContextId,
    visibleSidebar,
    showBrowser,
    hideContext: () => setCurrentNodeContextId(""),
    fileMode,
    fileTreeHash,
    setCurrentNodeContextId: (id: string | null) => setCurrentNodeContextId(id),
    updateFileTreeHash: (type: "lastSaved" | "current", hash: string) => {
      setFileTreeHash((p) => ({ ...p, [type]: hash }));
    },
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
