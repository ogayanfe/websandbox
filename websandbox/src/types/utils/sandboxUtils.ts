interface FolderNodeType {
  id: string;
  name: string;
  content?: undefined;
  children: (FileNodeType | FolderNodeType)[];
}

interface FileNodeType {
  id: string;
  name: string;
  content: string;
  children?: undefined;
}

type TreeNodeType = FileNodeType | FolderNodeType;

interface TreeDataType {
  id: null;
  name: "Root";
  children: TreeNodeType[];
}

type NodeType = TreeDataType | TreeNodeType;

type FileModeType =
  | "javascript"
  | "text"
  | "html"
  | "css"
  | "json"
  | "markdown";

interface SandboxInfoType {
  id: number;
  is_owner: boolean;
  title: string;
  is_starred: boolean;
  owner: { id: number; username: string };
  preview?: string | null;
}

export type {
  FileModeType,
  FolderNodeType,
  NodeType,
  TreeNodeType,
  TreeDataType,
  FileNodeType,
  SandboxInfoType,
};
