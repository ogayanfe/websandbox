import { useRouteLoaderData, LoaderFunctionArgs } from "react-router-dom";
import SplitPane from "react-split-pane";
import { useState, useEffect } from "react";
import Header from "../UtilityComponents/Header";
import getAuthContext from "../../contexts/authContext";
import { UserType } from "../../utils/authutils";
import Sidebar from "./Sidebar";
import useSandboxContext from "../../contexts/sandboxContext";

export async function sandboxHomeLoader({ params }: LoaderFunctionArgs) {
  const pattern = /^[\w.+-]+$/; // This pattern validates the username in the url
  if (!params.username?.match(pattern) && !params.project?.match(pattern)) {
    throw new Response("Not Found", { status: 404 });
  }
  return null;
}

export default function SandboxHome() {
  const [width, setScreenWidth] = useState(window.innerWidth);
  const onWidthChange = () => {
    setScreenWidth(window.innerWidth);
  };
  const data = useRouteLoaderData("base-route") as UserType;
  const authContext = getAuthContext();

  useEffect(() => {
    window.addEventListener("resize", onWidthChange);
    authContext?.updateUserInfo(data);
    return () => window.removeEventListener("resize", onWidthChange);
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen dark:bg-[rgb(14,_14,_14)]">
      <Header className="bg-stone-100 dark:bg-black border-b-[1px] dark:border-[#343434]" />
      <div className="h-full w-full flex-grow">
        <SplitPane
          split="vertical"
          minSize={200}
          maxSize={width * 0.3}
          defaultSize={250}
          style={{ position: "relative" }}
        >
          <div className="absolute top-0 w-full h-full border-r-[1px] dark:border-[#343434]">
            {<Sidebar />}
          </div>
          <div className="w-full h-full"></div>
        </SplitPane>
      </div>
    </div>
  );
}
