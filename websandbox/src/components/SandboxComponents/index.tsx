import { LoaderFunctionArgs, useRouteLoaderData } from "react-router-dom";
import Header from "../UtilityComponents/Header";
import { useEffect } from "react";
import useAuthContext from "../../contexts/authContext";
import { UserType } from "../../utils/authutils";

export async function sandboxHomeLoader({ params }: LoaderFunctionArgs) {
  const pattern = /^[\w.+-]+$/; // This pattern validates the username in the url
  if (!params.username?.match(pattern) && !params.project?.match(pattern)) {
    throw new Response("Not Found", { status: 404 });
  }
  return null;
}

export default function SandboxHome() {
  const loaderData = useRouteLoaderData("base-route") as UserType;
  const context = useAuthContext();

  useEffect(() => {
    context?.updateUserInfo(loaderData);
  }, []);
  return (
    <div className="w-scren h-screen bg-zinc-200 dark:bg-[rgb(10,10,10)]">
      <Header />
      <div className="flex h-full bg-white dark:bg-[rgb(14,14,14)]">
        <div className="h-full w-72 border-r-2"></div>
        <div className="flex-grow h-full"></div>
      </div>
    </div>
  );
}
