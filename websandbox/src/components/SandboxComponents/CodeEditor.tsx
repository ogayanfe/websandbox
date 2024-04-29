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
import { FileNodeType } from "../../types/utils/sandboxUtils";
import { getNode } from "../../utils/sandboxUtils";

export default function CodeEditor() {
  const themeContext = useThemeContext();
  const sandboxContext = useSandboxContext();
  const id = sandboxContext.selectedFileId;
  const node = getNode(sandboxContext.selectedFileId, sandboxContext.treeData) as FileNodeType;
  
  return (
    //@ts-ignore
    <AceEditor
      mode={sandboxContext.fileMode}
      value={node.content}
      onChange={(v: string) => sandboxContext.updateFileContent(id, v)}
      theme={themeContext?.darkTheme ? "twilight" : "github"}
      fontSize={13.5}
      width={"100%"}
      height="100%"
      showPrintMargin={true}
      showGutter={true}
      placeholder="github.com/ogayanfe/websandbox"
      tabSize={2}
      setOptions={{
        useWorker: false,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}
