import { useLoaderData } from "react-router-dom";
import FolderListComponent, { WebSandboxType } from "./FolderListComponent";
import { getApiClient } from "../../utils/authutils";

export async function dashboardHomeLoader() {
  const apiClient = getApiClient();
  const response = await apiClient.get("/sandbox/");
  return response.data;
}

async function deleteSandbox(id: number, title: string, onSuccess: () => void) {
  if (!confirm(`Are you sure you want to delete "${title}" from your projects?`)) return;
  try {
    const apiClient = getApiClient();
    const res = await apiClient.delete(`/sandbox/${id}/destroy/`);
    if (res.status < 400 && res.status >= 200) {
      onSuccess();
    }
  } catch (error) {
    console.log(error);
    alert("Operation failed, check internet connection and try again");
  }
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
