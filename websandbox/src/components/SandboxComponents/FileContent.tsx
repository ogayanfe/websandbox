import { Icon } from "@iconify/react";
import BreadCrumbs from "@mui/material/Breadcrumbs";
import { Button, IconButton, Tooltip } from "@mui/material";
import useSandboxContext from "../../contexts/sandboxContext";
import { getFileIcon, hashString, starSandbox } from "../../utils/sandboxUtils";
import { TreeNodeType } from "../../types/utils/sandboxUtils";
import CodeEditor from "./CodeEditor";
import useAuthContext from "../../contexts/authContext";
import { useParams } from "react-router";
import { getApiClient } from "../../utils/authutils";
import { useEffect, useState } from "react";
import SplitPane from "split-pane-react/esm/SplitPane";
import Browser from "./Browser";
import {
  StarBorderOutlined,
  StarOutlined,
  ForkLeftOutlined,
} from "@mui/icons-material";

export default function NoFileOpenComponent() {
  return (
    <div className="flex gap-2 flex-col w-full h-5/6 items-center justify-center">
      <div className=" text-4xl font-bold text-gray-900 dark:text-white flex gap-4 italsic items-center justify-center">
        <Icon icon="teenyicons:box-outline"></Icon>
        <div>Websandbox</div>
      </div>
      <p className="text-gray-700 dark:text-blue-100 text-md">
        Open file to view content
      </p>
    </div>
  );
}

function FileContentHeaderComponent() {
  const sandboxContext = useSandboxContext();
  const selectedPath = sandboxContext.getSelectedPath();
  const authContext = useAuthContext();
  const param = useParams();

  async function saveChanges() {
    if (
      sandboxContext.fileTreeHash.current ===
      sandboxContext.fileTreeHash.lastSaved
    )
      return;
    const apiClient = getApiClient();
    const data = {
      files: sandboxContext.treeData.children,
    };
    try {
      const res = (await apiClient.patch(
        `/sandbox/${param.username}/${param.project}/`,
        data
      )) as {
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

  function forkProject() {
    sandboxContext.setShowForkComponent(true);
  }

  useEffect(() => {
    async function onCtrlPlusS(e: KeyboardEvent) {
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        document.getElementById("save-button")?.click();
        e.preventDefault();
      }
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key.toLowerCase() === "b" || e.keyCode === 66)
      ) {
        sandboxContext.toggleBrowser();
        e.preventDefault();
      }
      if (
        e.ctrlKey &&
        !e.shiftKey &&
        (e.key.toLowerCase() === "b" || e.keyCode === 66)
      ) {
        sandboxContext.toggleSidebar();
      }
    }
    document.addEventListener("keydown", onCtrlPlusS);
    return () => document.removeEventListener("keydown", onCtrlPlusS);
  }, []);

  async function handleStarSandbox() {
    const onSuccess = (data: { starred: boolean }) => {
      const { setSandboxInfo, sandboxInfo } = sandboxContext;
      if (sandboxInfo && setSandboxInfo)
        setSandboxInfo({ ...sandboxInfo, is_starred: data.starred });
    };
    await starSandbox(
      sandboxContext.sandboxInfo?.owner.username || "",
      sandboxContext.sandboxInfo?.title || "",
      onSuccess
    );
  }

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
              <div className="flex gap-2 items-center justify-center dark:text-white font-semibold text-gray-900">
                <span>
                  {getFileIcon(selectedPath[selectedPath.length - 1])}
                </span>
                {selectedPath[selectedPath.length - 1]}
              </div>
            </div>
          )}
        </BreadCrumbs>
      ) : (
        <div></div>
      )}
      <div className="flex items-center justify-center">
        <Tooltip title="Add to starred project">
          <span>
            <IconButton
              aria-label="Fork Project"
              onClick={handleStarSandbox}
              disabled={!authContext?.authenticated()}
            >
              {sandboxContext.sandboxInfo &&
              sandboxContext.sandboxInfo?.is_starred ? (
                <StarOutlined />
              ) : (
                <StarBorderOutlined />
              )}
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip
          title={
            sandboxContext?.visibleSidebar
              ? "Close Sidebar (ctrl + b)"
              : "Open Sidebar (ctrl + b)"
          }
        >
          <span>
            <IconButton
              aria-label="Toggle Sidebar"
              onClick={sandboxContext.toggleSidebar}
            >
              <Icon
                icon={
                  sandboxContext.visibleSidebar
                    ? "lucide:sidebar-close"
                    : "lucide:sidebar-open"
                }
              />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip
          title={
            sandboxContext.showBrowser
              ? "Hide Browser (ctrl + shift + b)"
              : "Show Browser (ctrl + shift + b)"
          }
        >
          <span>
            <IconButton
              aria-label="Toggle Browser Visibility"
              onClick={sandboxContext.toggleBrowser}
            >
              <Icon
                icon={
                  sandboxContext.showBrowser ? "ion:browsers" : "gg:browser"
                }
              />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Fork project">
          <span>
            <IconButton
              aria-label="Fork Project"
              onClick={forkProject}
              color="primary"
              disabled={!authContext?.authenticated()}
            >
              <ForkLeftOutlined></ForkLeftOutlined>
            </IconButton>
          </span>
        </Tooltip>
        <div className="md:hidden">
          <Tooltip
            title={
              authContext?.authenticated()
                ? "Save Project (ctrl + s)"
                : "Login to save project"
            }
          >
            <span>
              <IconButton
                aria-label="Save project"
                disabled={!authContext?.authenticated()}
                color="info"
                onClick={saveChanges}
              >
                <Icon icon="ion:save-outline" />
              </IconButton>
            </span>
          </Tooltip>
          T
        </div>
        <div className="max-md:hidden">
          <Tooltip
            title={
              authContext?.authenticated()
                ? "Save Project (ctrl + s)"
                : "Login to save project"
            }
          >
            <span>
              <Button
                id="save-button"
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
  const [splitSizes, setSplitSizes] = useState<(string | number)[]>([
    "auto",
    "30%",
  ]);

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
            {sandboxContext.selectedFileId ? (
              <CodeEditor />
            ) : (
              <NoFileOpenComponent />
            )}
            <Browser />
          </SplitPane>
        </div>
      </div>
    </div>
  );
}
