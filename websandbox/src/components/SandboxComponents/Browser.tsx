import useSandboxContext from "../../contexts/sandboxContext";
import { useState, useEffect } from "react";
import getWebContainerInstance, {
  containerEventHandler,
  mountFiles,
  start,
} from "../../utils/containerUtils";
import { useRouteLoaderData } from "react-router-dom";
import { TreeDataType, TreeNodeType, toContainerFileSystemTree } from "../../utils/sandboxUtils";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton, Stepper, TextField, Step, StepLabel, LinearProgress } from "@mui/material";
import { Icon } from "@iconify/react";
import Tooltip from "@mui/material/Tooltip";

interface TypeBrowserHeaderProp {
  currentRoute: string;
  updateCurrentRoute: (e: string) => void;
  refreshBrowser: () => void;
}

function BrowserHeader({
  currentRoute,
  updateCurrentRoute,
  refreshBrowser,
}: TypeBrowserHeaderProp) {
  return (
    <div className="border-b-[1px] dark:border-[#343434] dark:bg-inherit p-1 px-2 flex text-xm">
      <Tooltip title="Refresh">
        <IconButton onClick={refreshBrowser}>
          <span className="fixed left-[-2000000px]">Refresh</span>
          <Icon icon="ri:refresh-line" />
        </IconButton>
      </Tooltip>
      <TextField
        value={currentRoute}
        onChange={(e) => updateCurrentRoute(e.target.value)}
        sx={{ width: "100%", fontStyle: "normal" }}
        size="small"
        placeholder="Go to file"
        InputProps={{
          "aria-label": "Search",
          sx: { transform: "scaleY(.85)", fontStyle: "normal" },
          endAdornment: (
            <InputAdornment position="start">
              <Icon icon="teenyicons:send-right-outline" />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

function BroserPlaceholderContent() {
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2 | 3>(0);
  containerEventHandler.addEvent("boot-finished", () => setCurrentStep(1));
  containerEventHandler.addEvent("install-finished", () => setCurrentStep(2));
  containerEventHandler.addEvent("server-started", () => setCurrentStep(3));
  const feedBack = [
    "Booting Container",
    "Installing Dependencies",
    "Starting Vite Server",
    "Please Wait",
  ];
  return (
    <div className="flex items-center justify-center w-full h-full text-md dark:text-blue-50 flex-col gap-8 p-2">
      <Stepper orientation="vertical" activeStep={currentStep}>
        <Step>
          <StepLabel>Booting Webcontainer</StepLabel>
        </Step>
        <Step>
          <StepLabel>Installing Dependencies</StepLabel>
        </Step>
        <Step>
          <StepLabel>Starting Vite Server</StepLabel>
        </Step>
      </Stepper>
      <div className="flex w-full items-center justify-center gap-4 flex-col">
        <p className="font-semibold italic text-gray-00 dark:text-gray-200">
          {feedBack[currentStep] || "Please Wait"}...
        </p>
        <span className="w-4/5 max-w-[350px]">
          <LinearProgress sx={{ width: "100%" }} />
        </span>
      </div>
    </div>
  );
}

export default function Browser() {
  const sandboxContext = useSandboxContext();
  const [browserUrl, setBrowserUrl] = useState<undefined | string>(undefined);
  const [currentRoute, setCurrentRoute] = useState("index.html");
  const data = useRouteLoaderData("sandbox-editor-route") as { files: TreeNodeType[] };
  const files: TreeDataType = {
    id: null,
    name: "Root",
    children: data.files,
  };
  const fileSystemTree = toContainerFileSystemTree(files);

  function refreshBrowser() {
    setBrowserUrl((p) => p);
    mountFiles(toContainerFileSystemTree(sandboxContext.treeData));
  }

  useEffect(() => {
    start(fileSystemTree);
    getWebContainerInstance().then((instance) => {
      instance.on("server-ready", (_, url: string) => {
        console.log(url);
        setBrowserUrl(url);
      });
    });
  }, []);
  const visibleClass = sandboxContext.showBrowser ? "" : "hidden";

  return (
    <div
      className={`border-l-[1px] dark:border-[#343434] flex flex-col w-full h-full ${visibleClass}`}
    >
      <BrowserHeader
        currentRoute={currentRoute}
        updateCurrentRoute={(r: string) => setCurrentRoute(r)}
        refreshBrowser={refreshBrowser}
      />
      <div className="flex-grow h-full">
        {browserUrl ? (
          <iframe className="w-full h-full bg-white" src={browserUrl + "/" + currentRoute} />
        ) : (
          <BroserPlaceholderContent />
        )}
      </div>
    </div>
  );
}
