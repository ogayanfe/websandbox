import { useLoaderData } from "react-router-dom";
import FolderListComponent, { WebSandboxType } from "./FolderListComponent";
import { getApiClient } from "../../utils/authutils";
import { deleteSandbox } from "../../utils/sandboxUtils";

export async function dashboardHomeLoader() {
  const apiClient = getApiClient();
  const response = await apiClient.get("/sandbox/");
  return response.data;
}

function DashboardHome() {
  const data = useLoaderData() as WebSandboxType[];
  return (
    <div className="w-full py-2">
      <FolderListComponent sandboxes={data} deleteSandbox={deleteSandbox} showCreateButton />
    </div>
  );
}

export default DashboardHome;
