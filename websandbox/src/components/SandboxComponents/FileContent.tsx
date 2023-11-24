import { Icon } from "@iconify/react";
import BreadCrumbs from "@mui/material/Breadcrumbs";
import { Button, IconButton, Tooltip, Link as MuiLink } from "@mui/material";
import useSandboxContext from "../../contexts/sandboxContext";
import { TreeNodeType, getFileIcon, hashString } from "../../utils/sandboxUtils";
import CodeEditor from "./CodeEditor";
import useAuthContext from "../../contexts/authContext";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getApiClient } from "../../utils/authutils";

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

  async function saveChanges() {
    if (sandboxContext.fileTreeHash.current === sandboxContext.fileTreeHash.lastSaved) return;
    const apiClient = getApiClient();
    const data = {
      files: sandboxContext.treeData.children,
    };
    try {
      const res = (await apiClient.patch(`/sandbox/${param.username}/${param.project}/`, data)) as {
        data: { files: TreeNodeType[] };
      };
      hashString(JSON.stringify(res.data.files)).then((r: string) => {
        sandboxContext.updateFileTreeHash("lastSaved", r);
      });
      alert("Successfully updated project");
    } catch (error) {
      console.log(error);
      alert("Couldn't update sandbox");
    }
  }

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
        <div></div>
      )}
      <div className="flex items-center justify-center md:gap-2">
        <Tooltip title={sandboxContext?.visibleSidebar ? "Close Sidebar" : "Open Sidebar"}>
          <IconButton aria-label="Toggle Sidebar" onClick={sandboxContext.toggleSidebar}>
            <Icon
              icon={sandboxContext.visibleSidebar ? "lucide:sidebar-close" : "lucide:sidebar-open"}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title={sandboxContext.showBrowser ? "Hide Browser" : "Show Browser"}>
          <IconButton aria-label="Toggle Browser Visibility" onClick={sandboxContext.toggleBrowser}>
            <Icon icon="gg:browser" />
          </IconButton>
        </Tooltip>
        {/* @ts-ignore */}
        <div className="md:hidden">
          <Tooltip title={authContext?.authenticated() ? "Save Project" : "Login to save project"}>
            <span>
              <IconButton
                aria-label="Save project"
                disabled={!authContext?.authenticated()}
                color="success"
                onClick={saveChanges}
              >
                <Icon icon="ion:save-outline" />
              </IconButton>
            </span>
          </Tooltip>
        </div>
        <div className="max-md:hidden">
          <Tooltip title={authContext?.authenticated() ? "Save Project" : "Login to save project"}>
            <span>
              <Button
                disabled={!authContext?.authenticated()}
                startIcon={<Icon icon="ion:save-sharp" />}
                size="small"
                sx={{ paddingX: "1rem" }}
                color="info"
                variant="outlined"
                onClick={saveChanges}
              >
                Save
              </Button>
            </span>
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
