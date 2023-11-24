import CircularProgress from "@mui/material/CircularProgress";
import useSandboxContext from "../../contexts/sandboxContext";
import Draggable from "react-draggable";
import { useRef } from "react";

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

  return (
    <div className={sandboxContext.showBrowser ? "" : "hidden"}>
      <Draggable bounds="body" nodeRef={noderef}>
        <div
          className={`fixed bg-stone-50 dark:bg-black w-[350px] h-[400px] right-10 bottom-10 rounded-lg shadow-2xl flex flex-col cursor-move`}
          ref={noderef}
        >
          <BrowserHeader />
          <div className="flex-grow">
            <BroserPlaceholderContent />
          </div>
        </div>
      </Draggable>
    </div>
  );
}
