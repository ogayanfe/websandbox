import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Link, useRevalidator } from "react-router-dom";
import { IconButton } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import useAuthContext from "../../contexts/authContext";
import DriveFileRenameOutlineSharp from "@mui/icons-material/DriveFileRenameOutlineSharp";
import { CodeTwoTone } from "@mui/icons-material";
import {
  FolderListElementComponentType,
  WebSandboxType,
} from "../../types/sandbox";

function FolderListElementComponent({
  info,
  onDelete,
  deleteSandbox,
}: FolderListElementComponentType) {
  const authContext = useAuthContext();

  return (
    <div className="relative rounded-md h-48 dark:bg-[rgb(29,_29,_29)] bg-[rgb(252,252,252)] flex-col first-letter:shadow-xl flex">
      <div className="flex-grow text-grow flex items-center justify-center border-gray-100 dark:border-none border">
        <CodeTwoTone style={{ fontSize: "90px" }} />
      </div>
      <h3 className="text-gray-700 dark:text-gray-200 text-center p-3 rounded-b-md  bg-gray-200 dark:bg-[rgb(21,21,21)] font-semibold">
        @{info.owner.username} /{" "}
        <span className="dark:text-white font-bold">{info.title}</span>
      </h3>
      <nav className="absolute flex gap-1 right-0">
        <Tooltip title="Open sandbox">
          <IconButton
            to={`/${info.owner.username}/${info.title}/`}
            component={Link}
          >
            <LaunchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit sandbox">
          <IconButton
            to={`/${authContext?.user?.username}/${info.title}/edit`}
            component={Link}
          >
            <DriveFileRenameOutlineSharp />
          </IconButton>
        </Tooltip>
        {!!(deleteSandbox && info.owner.id === authContext?.user?.id) && (
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                deleteSandbox && deleteSandbox(info.id, info.title, onDelete);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </nav>
    </div>
  );
}

function CreateSandboxElementComponent() {
  return (
    <Link
      to="./create"
      className="rounded-md border-gray-500 dark:border-gray-300 h-48 border-2 flex-col first-letter:shadow-xl flex border-dashed"
    >
      <div className="flex-grow text-grow flex items-center justify-center">
        <AddRoundedIcon sx={{ fontSize: "90px" }} />
      </div>
      <h3 className="text-gray-900 text-center dark:text-white p-3 rounded-b-md mb-2">
        Create Sandbox
      </h3>
      <IconButton aria-label="Edit"></IconButton>
    </Link>
  );
}

interface FolderListComponentPropType {
  sandboxes: WebSandboxType[];
  deleteSandbox?: (
    id: number,
    title: string,
    onSuccess: () => void
  ) => Promise<void>;
  showCreateButton?: boolean;
}

export default function FolderListComponent({
  sandboxes,
  deleteSandbox,
  showCreateButton,
}: FolderListComponentPropType) {
  const validator = useRevalidator();
  const [alert, setAlert] = useState({
    deleteSuccess: false,
  });
  return (
    <>
      {alert.deleteSuccess && (
        <Alert
          sx={{ marginX: "2.5rem", marginBottomz: "1rem" }}
          severity="success"
          action={
            <Tooltip title="Close">
              <IconButton
                onClick={() =>
                  setAlert((prev) => ({ ...prev, deleteSuccess: false }))
                }
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          }
        >
          Successfully Deleted from sandbox
        </Alert>
      )}
      <div className="grid grid-cols-1 xm:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 p-5 gap-6 sm:px-20">
        {!!showCreateButton && <CreateSandboxElementComponent />}
        {sandboxes.map((p) => (
          <FolderListElementComponent
            info={p}
            deleteSandbox={deleteSandbox}
            key={p.title + Math.random()} // Just for safety, to make sure key remain unique
            onDelete={() => {
              validator.revalidate();
              setAlert((p) => ({ ...p, deleteSuccess: true }));
            }}
          />
        ))}
      </div>
    </>
  );
}

export type { WebSandboxType };
