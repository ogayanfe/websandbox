import { useRouteLoaderData, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../UtilityComponents/Header";
import getAuthContext from "../../contexts/authContext";
import { UserType, getApiClient } from "../../utils/authutils";
import Sidebar from "./Sidebar";
import useSandboxContext from "../../contexts/sandboxContext";
import { FileContentComponent } from "./FileContent";
import SplitPane from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { TreeDataType, TreeNodeType } from "../../utils/sandboxUtils";
import Browser from "./Browser";

export async function sandboxHomeLoader({ params }: LoaderFunctionArgs) {
  const url = `sandbox/${params.username}/${params.project}`;
  const apiClient = getApiClient();
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw new Response("Not Found", { status: 404 });
  }
}

export default function SandboxHome() {
  const userData = useRouteLoaderData("base-route") as UserType;
  const [sizes, setSizes] = useState([250, "auto"]);
  const authContext = getAuthContext();
  const sandboxContext = useSandboxContext();
  const data = useLoaderData() as { files: TreeNodeType[] };
  const treeData: TreeDataType = {
    id: null,
    name: "Root",
    children: data.files,
  };

  useEffect(() => {
    authContext?.updateUserInfo(userData);
    sandboxContext.updateTreeData(treeData);
  }, []);

  useEffect(() => {
    if (sandboxContext.visibleSidebar) {
      setSizes([250, "auto"]);
      return;
    }
    setSizes([0, "auto"]);
  }, [sandboxContext.visibleSidebar]);

  return (
    <div className="flex flex-col w-screen h-screen dark:bg-[rgb(14,_14,_14)]">
      <Header className="border-b-[1px] dark:border-[#343434]" />
      <div className="h-full w-full flex-grow">
        <SplitPane
          split="vertical"
          sizes={sizes}
          onChange={([width, height]: number[]) => {
            width < 400 && setSizes([width, height]);
          }}
          //@ts-ignore
          allowResize={sandboxContext.visibleSidebar}
        >
          <div className={`absolute w-full top-0 h-full border-r-[1px] dark:border-[#343434]`}>
            {<Sidebar />}
          </div>
          <FileContentComponent />
        </SplitPane>
      </div>
      <Browser />
      <footer className="border-t-[1px] dark:border-[#343434]">Footer</footer>
    </div>
  );
}
