import { AuthTokenType, CredentialsType, UserType } from "./utils/authUtils";
import { FileModeType, TreeDataType } from "./utils/sandboxUtils";

// AUTHCONTEXT TYPES DECLARATIONS

interface AuthContextDataType {
  login: (credentials: CredentialsType) => Promise<Boolean>;
  logout: () => void;
  tokens: () => AuthTokenType | null;
  authenticated: () => Boolean;
  user: UserType | null;
  updateUserInfo: (user: UserType | null) => void;
}

// SANDBOX CONTEXT TYPE DECLARATIONS

interface SandboxContextDataType {
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

export type { AuthContextDataType, SandboxContextDataType };
