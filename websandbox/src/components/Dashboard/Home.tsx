import { useRevalidator } from "react-router-dom";
import useAuthContext from "../../contexts/authContext";
import { getApiClient } from "../../utils/authutils";
import FolderListComponent from "./FolderListComponent";
import { useEffect } from "react";

export async function dashboardHomeLoader() {
  const apiClient = getApiClient();
  const response = await apiClient.get("/sandbox/");
  return response.data;
}

export default function DashboardHome() {
  const authContext = useAuthContext();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (revalidator.state === "idle" && authContext?.authenticated && authContext.user === null) {
      revalidator.revalidate();
    }
  }, []);
  return (
    <div className="flex flex-col">
      <h2 className="text-xl xl:text-2xl font-semibold text-center text-gray-800 dark:text-blue-100 p-8">
        Your project folders
      </h2>
      <FolderListComponent />
    </div>
  );
}
