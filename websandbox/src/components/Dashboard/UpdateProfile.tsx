import { Form, ActionFunctionArgs, useActionData } from "react-router-dom";
import { updateProfile} from "../../utils/authutils";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import Alert from "@mui/material/Alert";
import useAuthContext from "../../contexts/authContext";

export async function updateProfileAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const [username, password] = [formData.get("username"), formData.get("password")];
  const credentials = {
    username: username ? username.toString() : "",
    password: password ? password.toString() : "",
  };
  if (credentials.username && credentials.password) return updateProfile(credentials);
  if (credentials.username) return updateProfile({username: credentials.username})
  return updateProfile({password: credentials.password})
}

function validatePassword(password1: string, password2: string): string {
  if (password1.length < 8) return "Passwords must be at lease 8 characters";
  if (password1 !== password2) return "Passwords must match";
  return "";
}

function validateUsername(username: string): string {
  const pattern = /^[\w.+h-]+$/;
  if (username.length < 3) {
    return "Username must be three characters minimum";
  }
  if (!pattern.test(username)) {
    return "Enter a valid username. This value may contain only letters, numbers, and ./+/-/_ characters.";
  }
  return "";
}

function extractErrorsFromResponse(res: AxiosResponse | null) {
  const output = {
    username: res?.data?.username ? res.data.username[0] : "",
    password: res?.data?.password ? res.data.password[0] : "",
  };
  return output;
}

export default function UpdateProject() {
  const data = useActionData() as AxiosResponse | null;
  const authContext = useAuthContext()
  const [error, setError] = useState(() => extractErrorsFromResponse(data));

  const handleSubmit = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
      password2: { value: string };
    };
    const [username, password, password2] = [
      target.username.value || authContext?.user?.username,
      target.password.value,
      target.password2.value,
    ];
    const errors = {
      username: validateUsername(username || ""),
      password: validatePassword(password, password2),
    };
    if ((password.length + password2.length) === 0) errors.password = "";
    if (errors.username.length + errors.password.length === 0) return;
    setError(errors);
    e.preventDefault();
  };

  useEffect(() => setError(extractErrorsFromResponse(data)), [data]);
  
  return (
    <div className="w-full h-max flex items-center justify-center py-9">
      <div className="w-[90vw] dark:bg-[rgb(17,17,17)] border dark:border-none max-w-2xl p-6 h-max-content rounded-xl">
        <h1 className="text-2xl text-gray-800 pb-4 font-semibold dark:text-gray-300 flex justify-center gap-1 items-center m-22">
          Update Your Details
        </h1>
        <Form method="post" className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
          {(error.username || error.password) && (
            <Alert severity="error">{error.username ? error.username : error.password}</Alert>
          )}
          <label htmlFor="signup-username" className=" text-gray-900 dark:text-gray-200">
            Username
          </label>
          <input
            type="text"
            autoFocus
            name="username"
            className="p-2 text-sm text-gray-900 border-gray-400 dark:border-gray-300 dark:text-gray-200 bg-inherit border rounded-lg"
            placeholder={authContext?.user?.username || "Username"}
            id="signup-username"
          />
          <label htmlFor="signup-password" className=" text-gray-900 dark:text-gray-200">
            Password
          </label>
          <input
            type="password"
            className="p-2 text-sm text-gray-900 border-gray-400 dark:border-gray-300 dark:text-gray-200 bg-inherit border rounded-lg"
            name="password"
            id="signup-password"
            placeholder="Password"
          />
          <label htmlFor="signup-password-2" className=" text-gray-900 dark:text-gray-200">
            Password Again
          </label>
          <input
            type="password"
            className="p-2 text-sm text-gray-900 border-gray-400 dark:border-gray-300 dark:text-gray-200 bg-inherit border rounded-lg"
            name="password2"
            id="signup-password-2"
            placeholder="Password Again"
          />
          <div>
            <button className="bg-[#1976d2] shadow-lg text-gray-100 rounded-md mt-3 px-3 w-20 py-2 float-right" >
              Update
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
