import CircularProgress from "@mui/material/CircularProgress";
import useSandboxContext from "../../contexts/sandboxContext";
import Draggable from "react-draggable";
import { useRef, useState, useEffect } from "react";
import getWebContainerInstance, { start } from "./container";
import { useRouteLoaderData } from "react-router-dom";
import { TreeDataType, TreeNodeType, toContainerFileSystemTree } from "../../utils/sandboxUtils";

function BrowserHeader() {
  return (
    <div className="bg-black dark:bg-white rounded-t-lg p-2 text-blue-50 dark:text-black text-center">
      Browser Output
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
  const noderef = useRef(null);
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
        console.log(url, "asdfoasndfaosdfoasndfasuidgfhnasdof");
        setBrowserUrl(url);
      });
    });
  }, []);

  return (
    <div className={sandboxContext.showBrowser ? "" : "hidden"}>
      <Draggable bounds="body" nodeRef={noderef}>
        <div
          className={`fixed bg-stone-50 dark:bg-black w-[290px] h-[350px] right-10 bottom-10 rounded-lg shadow-2xl flex flex-col cursor-move`}
          ref={noderef}
        >
          <BrowserHeader />
          <div className="flex-grow">
            {browserUrl ? (
              <iframe className="w-full h-full rounded-b-lg" src={browserUrl} />
            ) : (
              <BroserPlaceholderContent />
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
}
