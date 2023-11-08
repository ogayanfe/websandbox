import FolderIcon from "@mui/icons-material/Folder";

function FolderListElementComponent() {
  return (
    <div className="p-z3 rounded-md h-44 bg-[RGB(29,_29,_29)] flex-col first-letter:shadow-xl flex">
      <div className="flex-grow text-grow flex items-center justify-center">
        <FolderIcon sx={{ fontSize: "90px" }} />
      </div>
      <h3 className="text-white p-3 rounded-b-md bg-black">This title is really long</h3>
    </div>
  );
}

function FolderListComponent() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 p-5 gap-6 sm:px-20 ">
      <FolderListElementComponent></FolderListElementComponent>
      <FolderListElementComponent></FolderListElementComponent>
      <FolderListElementComponent></FolderListElementComponent>
      <FolderListElementComponent></FolderListElementComponent>
      <FolderListElementComponent></FolderListElementComponent>
      <FolderListElementComponent></FolderListElementComponent>
      <FolderListElementComponent></FolderListElementComponent>
      <FolderListElementComponent></FolderListElementComponent>
      <FolderListElementComponent></FolderListElementComponent>
      <FolderListElementComponent></FolderListElementComponent>
    </div>
  );
}

export default FolderListComponent;
