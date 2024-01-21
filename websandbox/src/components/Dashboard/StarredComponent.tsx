import FolderListComponent from "./FolderListComponent";

function StarredComponent() {
  return (
    <div className="w-full py-2">
      <FolderListComponent sandboxes={[]} />
    </div>
  );
}

export default StarredComponent;
