import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom";
import { getApiClient } from "../../utils/authutils";
import { AxiosError } from "axios";
import Alert from "@mui/material/Alert";

import useAuthContext from "../../contexts/authContext";

interface CreateSandboxActionType {
  error: boolean;
  data: Response | string;
}

export default async function createSandboxAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const apiClient = getApiClient();
  const name = formData.get("name");
  const username = formData.get("username");
  try {
    await apiClient.post("/sandbox/", {
      title: name,
    });
    return redirect("/" + username + "/" + name);
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: true, data: await error?.response?.data.title[0] };
    }
    return { error: true, data: "Something went wrong, check connection and try again" };
  }
}

export function CreateSandboxComponent() {
  const data = useActionData() as CreateSandboxActionType | undefined;
  const authContext = useAuthContext();

  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-[90vw] dark:bg-[rgb(0,0,0)] shadow-2xl bg-gray-100 max-w-lg p-6 h-max-content rounded-lgz border-l-4">
        <h2 className="text-2xl text-gray-800 font-semibold dark:text-gray-300 flex justify-center gap-1 items-center m-2">
          <span className="text-3xl hidden">LOGO</span>
          Create Sandbox
        </h2>
        {data?.error && <Alert severity="error">{data?.data.toString()}</Alert>}
        <Form className="w-full flex flex-col gap-3" method="POST">
          <label htmlFor="sandbox-name" className=" text-gray-900 dark:text-gray-200">
            Sandbox name
          </label>
          <input
            type="text"
            autoFocus
            name="name"
            required
            className="p-2 text-sm text-gray-900 border-gray-400 dark:border-white dark:text-gray-200 bg-inherit border-2"
            placeholder="sandbox name (e.g Project X)"
            id="sandbox-name"
          />
          <input type="hidden" name="username" value={authContext?.user?.username} />
          <div className="flex justify-end pr-10 p-2">
            <button className="bg-blue-600 text-gray-100 rounded-full px-2 w-20 py-1">
              Create
            </button>
          </div>
        </Form>
      </div>
    </main>
  );
}
