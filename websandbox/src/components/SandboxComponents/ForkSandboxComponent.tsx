import { useNavigate, useParams } from "react-router-dom";
import { getApiClient } from "../../utils/authutils";
import { AxiosError } from "axios";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import useSandboxContext from "../../contexts/sandboxContext";
import useAuthContext from "../../contexts/authContext";
import { TreeNodeType } from "../../types/utils/sandboxUtils";

interface forkSandboxReturnType {
  error: boolean;
  data: string;
}

async function forkSandbox(
  title: string,
  files: TreeNodeType[]
): Promise<forkSandboxReturnType> {
  const apiClient = getApiClient();
  try {
    await apiClient.post(`/sandbox/`, {
      title: title.toLowerCase(),
      files: files,
    });
    return { error: false, data: title };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        error: true,
        data: (await error?.response?.data.title[0]) || "Something Went Wrong",
      };
    }
    return {
      error: true,
      data: "Something went wrong, check connection and try again",
    };
  }
}

export function ForkSandboxComponent() {
  const params = useParams() as {
    username: string;
    project: string;
  };
  const [title, setTitle] = useState(
    `${params.project}_${Math.round(Math.random() * 1000000)}`
  );
  const [error, setError] = useState("");
  const sandboxContext = useSandboxContext();
  const authContext = useAuthContext();
  const navigate = useNavigate();

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    e.stopPropagation();
    const { error, data } = await forkSandbox(
      title,
      sandboxContext.treeData.children
    );
    if (error) {
      setError(data);
      return;
    }
    alert("Successfully forked project");
    sandboxContext.setShowForkComponent(false);
    const url = "/" + authContext?.user?.username + "/" + data;
    const shouldNavigate = window.confirm(
      `Switch to forked version of project at "${url}"?`
    );
    if (shouldNavigate) {
      navigate(url);
    }
  }

  return (
    <div
      className="w-screen h-screen flex items-center justify-center fixed bg-[rgba(255,255,255,.5)] dark:bg-[rgba(0,0,0,.6)]"
      onClick={() => {
        sandboxContext.setShowForkComponent(false);
      }}
    >
      <div className="w-[90vw] dark:bg-[rgb(0,0,0)] shadow-2xl bg-gray-100 max-w-lg p-6 h-[220px] border-l-4">
        <h2 className="text-2xl text-gray-800 font-semibold dark:text-gray-300 flex justify-center gap-1 items-center m-2">
          Fork Sandbox
        </h2>
        {error !== "" && <Alert severity="error">{error}</Alert>}
        <form className="w-full flex flex-col gap-3">
          <label
            htmlFor="sandbox-name"
            className=" text-gray-900 dark:text-gray-200"
          >
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
          <div className="flex justify-end pr-10 p-2">
            <button
              className="bg-blue-600 text-gray-100 rounded-full px-2 w-20 py-1"
              onClick={handleSubmit}
            >
              Fork
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
