import { Icon } from "@iconify/react";
import { FileSystemTree } from "@webcontainer/api";
import { TreeNodeType, TreeDataType, NodeType, FileModeType } from "../types/utils/sandboxUtils";

function getNode(id: string, rootNode: TreeDataType | TreeNodeType): NodeType | null {
  if (rootNode.id === id) return rootNode;
  if (rootNode.children) {
    for (let node of rootNode.children) {
      const _node = getNode(id, node);
      if (_node) return _node;
    }
  }
  return null;
}

function deleteNode(id: string, rootNode: TreeNodeType | TreeDataType) {
  if (!rootNode.children) return;
  rootNode.children = rootNode.children.filter((node) => node.id !== id);
  for (let node of rootNode.children) {
    deleteNode(id, node);
  }
}

async function hashArray(inputString: string): Promise<number[]> {
  const encoder = new TextEncoder();
  const data = encoder.encode(inputString);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the hash buffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray;
}

async function hashString(inputString: string): Promise<string> {
  const hashList = await hashArray(inputString);
  const hashHex = hashList.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

function moveNode(nodeId: string, parentId: string | null, tree: NodeType) {
  const node = getNode(nodeId, tree) as TreeNodeType | null;
  if (!node) throw new Error(`Node with id:{${nodeId}} not found`);
  const nodeCopy = { ...node };
  deleteNode(nodeId, tree);
  _createNode(parentId, nodeCopy, tree);
}

function addNodeAttributes(name: string, id: string, type: "internal" | "leaf") {
  if (type === "internal") {
    return { id: id, name: name, children: [] };
  }
  return { id: id, name: name, content: "" };
}

function getFileIcon(name: string): React.ReactNode {
  if (name.endsWith(".js") || name.endsWith(".jsx")) return <Icon icon="logos:javascript" />;
  if (name.endsWith(".css")) return <Icon icon="vscode-icons:file-type-css" />;
  if (name.endsWith(".html")) return <Icon icon="logos:html-5" />;
  if (name.endsWith(".json")) return <Icon icon="vscode-icons:file-type-json" />;
  if (name.endsWith(".md")) return <Icon icon="octicon:markdown-16" />;
  if (name.endsWith(".txt")) return <Icon icon="mdi:text" />;
  if (name.endsWith(".svg")) return <Icon icon="carbon:svg" />;
  if (name.endsWith(".ico")) return <Icon icon="carbon:svg" />;
  if (name.endsWith(".rtf")) return <Icon icon="grommet-icons:document-rtf" />;
  return <Icon icon="solar:file-line-duotone" />;
}

function createNode(
  parentId: string | null,
  name: string,
  nodeId: string,
  type: "leaf" | "internal",
  rootNode: NodeType
): boolean {
  const nodeData = addNodeAttributes(name, nodeId, type);
  return _createNode(parentId, nodeData, rootNode);
}

function _createNode(parentId: string | null, nodeData: TreeNodeType, rootNode: NodeType): boolean {
  let node = rootNode;
  if (parentId) {
    const res = getNode(parentId, rootNode);
    if (res) node = res;
    if (node === null) {
      throw new Error(`Node not found with id ${parentId} not found`);
    }
  }
  if (!node.children) {
    throw new Error(`Node with id ${parentId} is not a directory`);
  }
  if (node.children.find((n) => n.name === nodeData.name)) return false;
  node.children.push(nodeData);
  return true;
}

function updateNode(id: string, newName: string, rootNode: NodeType): boolean {
  if (!rootNode.children) return false;
  if (rootNode.children.find((n) => n.name === newName)) return false;
  rootNode.children = rootNode.children.map((node) =>
    node.id === id ? { ...node, name: newName } : { ...node }
  );
  for (let node of rootNode.children) {
    updateNode(id, newName, node);
  }
  return true;
}

function updateFileContent(id: string, newContent: string, rootNode: NodeType) {
  if (!rootNode.children) return;
  rootNode.children = rootNode.children.map((node) => {
    if (node.id === id && node.content !== undefined) {
      return { ...node, content: newContent };
    }
    return { ...node };
  });

  for (let node of rootNode.children) {
    updateFileContent(id, newContent, node);
  }
}

function getNodePath(id: string | null, node: NodeType): string[] | null {
  function _(id: string | null, node: NodeType, path: string[]): string[] | null {
    if (id === null) return [node.name];
    if (node.id === id) return [...path, node.name];
    if (node.children) {
      for (let subNode of node.children) {
        const _path = _(id, subNode, [...path, node.name]);
        if (_path !== null) return _path;
      }
    }
    return null;
  }
  return _(id, node, []);
}

function getFileMode(name: string): FileModeType {
  if (name.endsWith(".js") || name.endsWith(".ts")) return "javascript";
  if (name.endsWith(".css")) return "css";
  if (name.endsWith(".html") || name.endsWith(".svg")) return "html";
  if (name.endsWith(".json")) return "json";
  if (name.endsWith(".md")) return "markdown";
  return "text";
}

function toContainerFileSystemTree(treeData: TreeDataType): FileSystemTree {
  function inner(node: NodeType, output: FileSystemTree) {
    if (!node.children) {
      output[node.name] = {
        file: {
          contents: node.content,
        },
      };
      return;
    }
    const directories = {};
    for (let sub of node.children) {
      inner(sub, directories);
    }
    output[node.name] = {
      directory: directories,
    };
  }
  const output = {} as { Root: { directory: FileSystemTree } };
  inner(treeData, output);
  return { ...output.Root.directory };
}

const tempData: TreeDataType = {
  id: null,
  name: "Root",
  children: [],
};

export {
  deleteNode,
  updateNode,
  createNode,
  getFileMode,
  getNode,
  moveNode,
  getFileIcon,
  getNodePath,
  updateFileContent,
  toContainerFileSystemTree,
  hashString,
  hashArray,
};
export default tempData;
