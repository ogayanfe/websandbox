import { Icon } from "@iconify/react";
import BreadCrumbs from "@mui/material/Breadcrumbs";
import { Button } from "@mui/material";
import useSandboxContext from "../../contexts/sandboxContext";
import { getFileIcon } from "../../utils/sandboxUtils";

export default function NoFileOpenComponent() {
  return (
    <div className="flex  gap-2 flex-col w-full h-5/6 items-center justify-center">
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

  return (
    <header className="flex w-full px-4 p-1.5 items-center justify-between">
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
      <div className="flex items-center justify-center gap-2">
        <Button
          startIcon={<Icon icon="ion:save-sharp" />}
          size="small"
          sx={{ paddingX: "1rem" }}
          color="success"
          variant="outlined"
        >
          Save
        </Button>
      </div>
    </header>
  );
}

export function FileContentComponent() {
  return (
    <div className="flex flex-col w-full h-full">
      <FileContentHeaderComponent />
    </div>
  );
}
