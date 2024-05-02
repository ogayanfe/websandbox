import useSandboxContext from "../../contexts/sandboxContext";
import { useState, useEffect } from "react";
import getWebContainerInstance, {
  containerEventHandler,
  destroyContainer,
  mountFiles,
  start,
} from "../../utils/containerUtils";
import { toContainerFileSystemTree } from "../../utils/sandboxUtils";
import InputAdornment from "@mui/material/InputAdornment";
import {
  IconButton,
  Stepper,
  TextField,
  Step,
  StepLabel,
  LinearProgress,
} from "@mui/material";
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
  const sandboxContext = useSandboxContext();
  const [width, setWidth] = useState(0);
  const feedBack = [
    "Booting Container",
    "Installing Dependencies",
    "Starting Vite Server",
    "Please Wait",
  ];

  useEffect(() => {
    containerEventHandler.addEvent("boot-finished", () => setCurrentStep(1));
    containerEventHandler.addEvent("install-finished", () => setCurrentStep(2));
    containerEventHandler.addEvent("server-started", () => {
      const fileSystemTree = toContainerFileSystemTree(sandboxContext.treeData);
      mountFiles(fileSystemTree);
      setCurrentStep(3);
    });
  }, [sandboxContext.treeData]);

  useEffect(() => {
    const placeHolderElement = document.querySelector("#browser-placeholder");
    if (!placeHolderElement) return;
    setWidth(placeHolderElement.getBoundingClientRect().width);
    const divObserver = new ResizeObserver((entries) => {
      let timeout: number | undefined;
      entries.forEach((entry) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => setWidth(entry.contentRect.width), 300);
      });
    });
    divObserver.observe(placeHolderElement);
    return () => {
      divObserver.disconnect();
      containerEventHandler.resetEvents();
    };
  }, []);

  const maxWidth = 700;

  return (
    <div
      className="flex items-center justify-center w-full h-full text-md dark:text-blue-50 flex-col gap-8 p-2"
      id="browser-placeholder"
    >
      <div className="w-4/5 flex items-center justify-center max-w-3xl">
        <Stepper
          orientation={width > maxWidth ? "horizontal" : "vertical"}
          sx={{ width: width > maxWidth ? "100%" : undefined }}
          activeStep={currentStep}
        >
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
      </div>
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

  function refreshBrowser() {
    setBrowserUrl((p) => p);
    mountFiles(toContainerFileSystemTree(sandboxContext.treeData));
  }

  useEffect(() => {
    start();
    getWebContainerInstance().then((instance) => {
      instance.on("server-ready", (_, url: string) => {
        console.log(url);
        setBrowserUrl(url);
      });
    });
  }, []);

  useEffect(() => {
    return () => {
      // Destroy the webcontainer when user navaigates to another page
      const current_path = window.location.pathname;
      const project_path = `/${sandboxContext.sandboxInfo?.owner.username}/${sandboxContext.sandboxInfo?.title}/`;

      // ensure the project path has been properly loader
      if (
        !sandboxContext.sandboxInfo?.owner.username &&
        !sandboxContext.sandboxInfo?.title
      )
        return;

      if (current_path === project_path) return;
      destroyContainer();
    };
  }, [sandboxContext]);

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
          <iframe
            className="w-full h-full bg-white"
            src={browserUrl + "/" + currentRoute}
          />
        ) : (
          <BroserPlaceholderContent />
        )}
      </div>
    </div>
  );
}
