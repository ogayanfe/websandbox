import FolderListComponent, { WebSandboxType } from "./FolderListComponent";
import { getApiClient } from "../../utils/authutils";
import { useLoaderData } from "react-router-dom";
import { deleteSandbox } from "../../utils/sandboxUtils";

export async function dashboardStarredLoader() {
  const apiClient = getApiClient();
  const response = await apiClient.get("/sandbox/?filter=starred");
  return response.data;
}

function StarredComponent() {
  const data = useLoaderData() as WebSandboxType[];
  console.log(data);

  return (
    <div className="w-full py-2">
      {data.length > 0 ? (
        <FolderListComponent sandboxes={data} deleteSandbox={deleteSandbox} />
      ) : (
        <p className="text-2xl text-center w-full upperscase text-black dark:text-blue-100 capitaldize py-20">
          You have no starred items
        </p>
      )}
    </div>
  );
}

export default StarredComponent;
