import { Icon } from "@iconify/react";
import BreadCrumbs from "@mui/material/Breadcrumbs";
import { Button, IconButton, Tooltip } from "@mui/material";
import useSandboxContext from "../../contexts/sandboxContext";
import { TreeNodeType, getFileIcon, hashString } from "../../utils/sandboxUtils";
import CodeEditor from "./CodeEditor";
import useAuthContext from "../../contexts/authContext";
import { useParams } from "react-router";
import { UserType, getApiClient } from "../../utils/authutils";
import { useEffect, useState } from "react";
import SplitPane from "split-pane-react/esm/SplitPane";
import Browser from "./Browser";
import { useLoaderData } from "react-router-dom";
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
  const data = useLoaderData() as { files: TreeNodeType[]; owner: UserType; is_owner: boolean };

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

  useEffect(() => {
    async function onCtrlPlusS(e: KeyboardEvent) {
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        document.getElementById("save-button")?.click();
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === "b" || e.keyCode === 66)) {
        sandboxContext.toggleBrowser();
        e.preventDefault();
      }
      if (e.ctrlKey && !e.shiftKey && (e.key.toLowerCase() === "b" || e.keyCode === 66)) {
        sandboxContext.toggleSidebar();
      }
    }
    document.addEventListener("keydown", onCtrlPlusS);
    return () => document.removeEventListener("keydown", onCtrlPlusS);
  }, []);

  return (
    <header className="border-b-[1px] dark:border-[#343434] flex w-full px-4 p-1 items-center justify-between">
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
        <Tooltip
          title={
            sandboxContext?.visibleSidebar ? "Close Sidebar (ctrl + b)" : "Open Sidebar (ctrl + b)"
          }
        >
          <IconButton aria-label="Toggle Sidebar" onClick={sandboxContext.toggleSidebar}>
            <Icon
              icon={sandboxContext.visibleSidebar ? "lucide:sidebar-close" : "lucide:sidebar-open"}
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            sandboxContext.showBrowser
              ? "Hide Browser (ctrl + shift + b)"
              : "Show Browser (ctrl + shift + b)"
          }
        >
          <IconButton aria-label="Toggle Browser Visibility" onClick={sandboxContext.toggleBrowser}>
            <Icon icon={sandboxContext.showBrowser ? "ion:browsers" : "gg:browser"} />
          </IconButton>
        </Tooltip>
        <div className="md:hidden">
          <Tooltip
            title={
              authContext?.authenticated()
                ? data.is_owner
                  ? "Save Project (ctrl + s)"
                  : "Fork Project (ctrl + s)"
                : "Login to save project"
            }
          >
            <span>
              <IconButton
                aria-label="Save/Fork project"
                disabled={!authContext?.authenticated()}
                color="info"
                component={data.is_owner ? IconButton : Link}
                to={`/${data.owner.username}/${param.project}/fork`}
                onClick={saveChanges}
              >
                <Icon icon="ion:save-outline" />
              </IconButton>
            </span>
          </Tooltip>
        </div>
        <div className="max-md:hidden">
          <Tooltip
            title={
              authContext?.authenticated()
                ? data.is_owner
                  ? "Save Project (ctrl + s)"
                  : "Fork Project (ctrl + s)"
                : "Login to save project"
            }
          >
            <span>
              <Button
                component={data.is_owner ? Button : Link}
                id="save-button"
                disabled={!authContext?.authenticated()}
                startIcon={<Icon icon="ion:save-sharp" />}
                size="small"
                sx={{ paddingX: "1rem" }}
                color="info"
                variant="outlined"
                onClick={saveChanges}
                to={`/${data.owner.username}/${param.project}/fork`}
              >
                {data.is_owner ? "Save" : "Fork"}
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
  const [splitSizes, setSplitSizes] = useState<(string | number)[]>(["auto", "30%"]);

  useEffect(() => {
    if (sandboxContext.showBrowser) {
      setSplitSizes(["auto", "30%"]);
      return;
    }
    setSplitSizes(["auto", 0]);
  }, [sandboxContext.showBrowser]);

  return (
    <div className="flex flex-col w-full h-full">
      <FileContentHeaderComponent />
      <div className="flex-grow w-full h-full">
        <div className="w-full h-full">
          {/* @ts-ignore */}
          <SplitPane
            split="vertical"
            sizes={splitSizes}
            onChange={(sizes) => setSplitSizes(sizes)}
            allowResize={sandboxContext.showBrowser}
          >
            {sandboxContext.selectedFileId ? <CodeEditor /> : <NoFileOpenComponent />}
            <Browser />
          </SplitPane>
        </div>
      </div>
    </div>
  );
}
