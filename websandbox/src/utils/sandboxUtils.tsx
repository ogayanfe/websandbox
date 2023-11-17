interface TreeNodeType {
  id: string;
  name: string;
  children?: TreeNodeType[];
}

interface TreeDataType {
  name: string;
  id: null;
  children: TreeNodeType[];
}

type NodeType = TreeDataType | TreeNodeType;

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

function moveNode(nodeId: string, parentId: string | null, tree: NodeType) {
  const node = getNode(nodeId, tree) as TreeNodeType | null;
  if (!node) throw new Error(`Node with id:{${nodeId}} not found`);
  const nodeCopy = { ...node };
  deleteNode(nodeId, tree);
  _createNode(parentId, nodeCopy, tree);
}

function addNodeAttributes(name: string, id: string, type: "internal" | "leaf") {
  const output: TreeNodeType = { id: id, name: name };
  if (type === "internal") output.children = [];
  return output;
}

function createNode(
  parentId: string | null,
  name: string,
  nodeId: string,
  type: "leaf" | "internal",
  rootNode: NodeType
) {
  const nodeData = addNodeAttributes(name, nodeId, type);
  return _createNode(parentId, nodeData, rootNode);
}

function _createNode(parentId: string | null, nodeData: TreeNodeType, rootNode: NodeType) {
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
  if (node.children.find((n) => n.name === nodeData.name)) return;
  node.children.push(nodeData);
}

function updateNode(id: string, newName: string, rootNode: NodeType) {
  if (!rootNode.children) return;
  rootNode.children = rootNode.children.map((node) =>
    node.id === id ? { ...node, name: newName } : { ...node }
  );
  for (let node of rootNode.children) {
    updateNode(id, newName, node);
  }
}

const data: TreeDataType = {
  id: null,
  name: "Root",
  children: [
    {
      id: "1",
      name: "public",
      children: [{ id: "c1-1", name: "index.html" }],
    },
    {
      id: "2",
      name: "src",
      children: [
        { id: "c2-1", name: "App.js" },
        { id: "c2-2", name: "index.js" },
        { id: "c2-3", name: "styles.css" },
      ],
    },
    { id: "3", name: "package.json" },
    { id: "4", name: "README.md" },
  ],
};

export type { TreeNodeType, TreeDataType };
export { deleteNode, updateNode, createNode, getNode, moveNode };
export default data;
