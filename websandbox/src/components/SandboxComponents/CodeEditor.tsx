import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-github";
import useThemeContext from "../../contexts/themeContext";
import useSandboxContext from "../../contexts/sandboxContext";
import { FileNodeType, getFileMode, getNode } from "../../utils/sandboxUtils";

export default function CodeEditor() {
  const themeContext = useThemeContext();
  const sandboxContext = useSandboxContext();
  const id = sandboxContext.selectedFileId;
  const node = getNode(sandboxContext.selectedFileId, sandboxContext.treeData) as FileNodeType;
  const path = sandboxContext.getSelectedPath();
  let name: string = "";
  if (path && path[path.length - 1]) {
    name = path[path.length - 1];
  }
  return (
    //@ts-ignore
    <AceEditor
      mode={getFileMode(name)}
      value={node.content}
      onChange={(v: string) => sandboxContext.updateFileContent(id, v)}
      theme={themeContext?.darkTheme ? "twilight" : "github"}
      fontSize={15}
      width={"100%"}
      height="100%"
      showPrintMargin={true}
      showGutter={true}
      tabSize={2}
      setOptions={{ useWorker: false }}
    />
  );
}
