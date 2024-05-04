import {
  useRouteLoaderData,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../UtilityComponents/Header";
import getAuthContext from "../../contexts/authContext";
import { getApiClient } from "../../utils/authutils";
import { UserType } from "../../types/utils/authUtils";
import Sidebar from "./Sidebar";
import useSandboxContext from "../../contexts/sandboxContext";
import { FileContentComponent } from "./FileContent";
import SplitPane from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { capitalizeText, hashString } from "../../utils/sandboxUtils";
import {
  SandboxInfoType,
  TreeDataType,
  TreeNodeType,
} from "../../types/utils/sandboxUtils";
import Footer from "./Footer";
import { ForkSandboxComponent } from "./ForkSandboxComponent";

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

interface SandboxLoaderDataType {
  id: number;
  is_owner: boolean;
  title: string;
  is_starred: boolean;
  owner: UserType;
  files: TreeNodeType[];
}

export default function SandboxHome() {
  const userData = useRouteLoaderData("base-route") as UserType;
  const [sizes, setSizes] = useState([250, "auto"]);
  const authContext = getAuthContext();
  const sandboxContext = useSandboxContext();
  const data = useLoaderData() as SandboxLoaderDataType;
  const treeData: TreeDataType = {
    id: null,
    name: "Root",
    children: data.files,
  };

  useEffect(() => {
    const sandboxInfo: SandboxInfoType = {
      id: data.id,
      is_owner: data.is_owner,
      title: data.title,
      is_starred: data.is_starred,
      owner: data.owner,
    };
    authContext?.updateUserInfo(userData);
    sandboxContext.updateTreeData(treeData);
    sandboxContext.setSandboxInfo && sandboxContext.setSandboxInfo(sandboxInfo);
    hashString(JSON.stringify(data.files)).then((p: string) => {
      sandboxContext.updateFileTreeHash("lastSaved", p);
    });
  }, []);

  useEffect(() => {
    if (sandboxContext.visibleSidebar) {
      setSizes([250, "auto"]);
      return;
    }
    setSizes([0, "auto"]);
  }, [sandboxContext.visibleSidebar]);

  useEffect(() => {
    const pre =
      "@" + sandboxContext.sandboxInfo?.owner.username.toLowerCase() ||
      "Sandbox";
    const suf = capitalizeText(sandboxContext.sandboxInfo?.title || "View");
    document.title = `websandbox - ${pre} / ${suf}`;
    console.log(sandboxContext.sandboxInfo?.owner);
  }, [sandboxContext]);

  return (
    <div className="flex flex-col w-screen h-screen dark:bg-[rgb(14,_14,_14)]">
      <Header
        homeRoute={
          sandboxContext.sandboxInfo?.owner.is_demo &&
          !(sandboxContext.sandboxInfo.owner.id === authContext?.user?.id)
            ? "/demos"
            : authContext?.authenticated()
            ? "/dashboard"
            : "/"
        }
        className="border-b-[1px] dark:border-[#343434] px-6"
      />
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
          <div
            className={`absolute w-full top-0 h-full border-r-[1px] dark:border-[#343434]`}
          >
            {<Sidebar />}
          </div>
          <FileContentComponent />
        </SplitPane>
      </div>
      {sandboxContext.showForkComponent && <ForkSandboxComponent />}
      <Footer />
    </div>
  );
}
