import { Icon } from "@iconify/react";
import BreadCrumbs from "@mui/material/Breadcrumbs";
import { Button, IconButton, Tooltip, Link as MuiLink } from "@mui/material";
import useSandboxContext from "../../contexts/sandboxContext";
import { getFileIcon } from "../../utils/sandboxUtils";
import CodeEditor from "./CodeEditor";
import useAuthContext from "../../contexts/authContext";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function NoFileOpenComponent() {
  return (
    <div className="flex gap-2 flex-col w-full h-5/6 items-center justify-center">
      <div className=" text-4xl font-bold text-gray-900 dark:text-white flex gap-4 italsic items-center justify-center">
        <Icon icon="teenyicons:box-outline"></Icon>
        <div>Websandbox</div>
      </div>
      <p className="text-gray-700 dark:text-blue-100 text-md">Open file to view content</p>
    </div>
  );
}

function FileContentHeaderComponent() {
  const sandboxContext = useSandboxContext();
  const selectedPath = sandboxContext.getSelectedPath();
  const authContext = useAuthContext();
  const param = useParams();

  return (
    <header className="flex w-full px-4 p-1 items-center justify-between">
      {selectedPath && selectedPath.length >= 2 ? (
        <BreadCrumbs separator={"\u203A"}>
          {selectedPath?.slice(1, -1).map((p) => (
            <p key={Math.random() + p} className="text-sm">
              {p}
            </p>
          ))}
          {selectedPath && (
            <div>
              <div className="flex gap-2 items-center justify-center">
                <span>{getFileIcon(selectedPath[selectedPath.length - 1])}</span>
                {selectedPath[selectedPath.length - 1]}
              </div>
            </div>
          )}
        </BreadCrumbs>
      ) : (
        <div>
          <BreadCrumbs>
            <p>{param.username}</p>
            <MuiLink to="./" component={Link} color="inherit" underline="hover">
              {param.project}
            </MuiLink>
          </BreadCrumbs>
        </div>
      )}
      <div className="flex items-center justify-center md:gap-2">
        <Tooltip title={sandboxContext?.visibleSidebar ? "Close Sidebar" : "Open Sidebar"}>
          <IconButton aria-label="Toggle Sidebar" onClick={sandboxContext.toggleSidebar}>
            <Icon
              icon={sandboxContext.visibleSidebar ? "lucide:sidebar-close" : "lucide:sidebar-open"}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle browser visiblity">
          <IconButton aria-label="Toggle Browser Visibility">
            <Icon icon="gg:browser" />
          </IconButton>
        </Tooltip>
        {/* @ts-ignore */}
        <div className="md:hidden">
          <Tooltip title={authContext?.authenticated() ? "Save Project" : "Login to save project"}>
            <IconButton
              aria-label="Save project"
              disabled={!authContext?.authenticated()}
              color="success"
            >
              <Icon icon="ion:save-outline" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="max-md:hidden">
          <Tooltip title={authContext?.authenticated() ? "Save Project" : "Login to save project"}>
            <Button
              disabled={!authContext?.authenticated()}
              startIcon={<Icon icon="ion:save-sharp" />}
              size="small"
              sx={{ paddingX: "1rem" }}
              color="success"
              variant="outlined"
            >
              Save
            </Button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}

export function FileContentComponent() {
  const sandboxContext = useSandboxContext();

  return (
    <div className="flex flex-col w-full h-full ml-2">
      <FileContentHeaderComponent />
      <div className="flex-grow w-full h-full">
        <div className="w-full h-full">
          {sandboxContext.selectedFileId ? <CodeEditor /> : <NoFileOpenComponent />}
        </div>
      </div>
    </div>
  );
}
