import CircularProgress from "@mui/material/CircularProgress";
import useSandboxContext from "../../contexts/sandboxContext";
import { useState, useEffect } from "react";
import getWebContainerInstance, { start } from "./container";
import { useRouteLoaderData } from "react-router-dom";
import { TreeDataType, TreeNodeType, toContainerFileSystemTree } from "../../utils/sandboxUtils";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton, TextField } from "@mui/material";
import { Icon } from "@iconify/react";

function BrowserHeader() {
  return (
    <div className="text-center bg-gray-50 dark:bg-inherit p-1 px-2 flex text-xm">
      <IconButton>
        <Icon icon="ri:refresh-line" />
      </IconButton>
      <form className="flex-grow">
        <TextField
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
      </form>
    </div>
  );
}

function BroserPlaceholderContent() {
  return (
    <div className="flex items-center justify-center w-full h-full font-semibold text-md dark:text-blue-50 flex-col gap-4">
      <CircularProgress />
      <p>Loading Project ...</p>
    </div>
  );
}

export default function Browser() {
  const sandboxContext = useSandboxContext();
  const [browserUrl, setBrowserUrl] = useState<undefined | string>(undefined);
  const data = useRouteLoaderData("sandbox-editor-route") as { files: TreeNodeType[] };
  const files: TreeDataType = {
    id: null,
    name: "Root",
    children: data.files,
  };
  const fileSystemTree = toContainerFileSystemTree(files);

  start(fileSystemTree);

  useEffect(() => {
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
      <BrowserHeader />
      <div className="flex-grow h-full">
        {browserUrl ? (
          <iframe className="w-full h-full rounded-b-lg" src={browserUrl} />
        ) : (
          <BroserPlaceholderContent />
        )}
      </div>
    </div>
  );
}
