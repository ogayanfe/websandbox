import FolderIcon from "@mui/icons-material/Folder";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Link } from "react-router-dom";

function FolderListElementComponent() {
  return (
    <div className="p-z3 rounded-md h-44 bg-gray-100 dark:bg-[RGB(29,_29,_29)] flex-col first-letter:shadow-xl flex">
      <div className="flex-grow text-grow flex items-center justify-center">
        <FolderIcon sx={{ fontSize: "90px" }} />
      </div>
      <h3 className="text-gray-900 dark:text-white p-3 rounded-b-md  bg-gray-300 dark:bg-[rgb(21,21,21)]">
        Name:
      </h3>
    </div>
  );
}

function CreateSandboxElementComponent() {
  return (
    <Link
      to="/create"
      className="p-z3 rounded-md border-gray-500 dark:border-gray-300 h-44 border-2 flex-col first-letter:shadow-xl flex border-dashed"
    >
      <div className="flex-grow text-grow flex items-center justify-center">
        <AddRoundedIcon sx={{ fontSize: "90px" }} />
      </div>
      <h3 className="text-gray-900 text-center dark:text-white p-3 rounded-b-md mb-2">
        Create Sandbox
      </h3>
    </Link>
  );
}

function FolderListComponent() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 p-5 gap-6 sm:px-20 ">
      <CreateSandboxElementComponent />
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
