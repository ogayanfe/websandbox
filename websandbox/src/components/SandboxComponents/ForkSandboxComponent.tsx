import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useParams,
} from "react-router-dom";
import { getApiClient } from "../../utils/authutils";
import { AxiosError } from "axios";
import Alert from "@mui/material/Alert";
import { useState } from "react";

interface ForkSandboxActionType {
  error: boolean;
  data: Response | string;
}

export default async function forkSandboxAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const apiClient = getApiClient();
  const owner = formData.get("owner_username");
  const project = formData.get("project");
  const title = formData.get("title");
  try {
    await apiClient.post(`/sandbox/${owner}/${project}/fork`, {
      title: title,
    });
    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return {
        error: true,
        data: (await error?.response?.data.title[0]) || "Something Wrong Wrong",
      };
    }
    return { error: true, data: "Something went wrong, check connection and try again" };
  }
}

export async function forkSandboxLoader({ params }: LoaderFunctionArgs) {
  const url = `sandbox/${params.username}/${params.project}`;
  const apiClient = getApiClient();
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw new Response("Not Found", { status: 404 });
  }
}

export function ForkSandboxComponent() {
  const params = useParams();
  const data = useActionData() as ForkSandboxActionType;
  const [title, setTitle] = useState(`${params.username}__${params.project}__fork`);

  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-[90vw] dark:bg-[rgb(0,0,0)] shadow-2xl bg-gray-100 max-w-lg p-6 h-max-content rounded-lgz border-l-4">
        <h2 className="text-2xl text-gray-800 font-semibold dark:text-gray-300 flex justify-center gap-1 items-center m-2">
          <span className="text-3xl ">LOGO</span>
          Fork Sandbox
        </h2>
        {data?.error && <Alert severity="error">{data?.data.toString()}</Alert>}
        <Form className="w-full flex flex-col gap-3" method="POST">
          <label htmlFor="sandbox-name" className=" text-gray-900 dark:text-gray-200">
            Sandbox name
          </label>
          <input
            type="text"
            autoFocus
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 text-sm text-gray-900 border-gray-400 dark:border-white dark:text-gray-200 bg-inherit border-2"
            placeholder="sandbox name (e.g Project X)"
            id="sandbox-name"
          />
          <input type="hidden" name="owner_username" value={params.username} />
          <input type="hidden" name="project" value={params.project} />
          <div className="flex justify-end pr-10 p-2">
            <button className="bg-gray-600 text-gray-100 rounded-full px-2 w-20 py-1">Fork</button>
          </div>
        </Form>
      </div>
    </main>
  );
}
