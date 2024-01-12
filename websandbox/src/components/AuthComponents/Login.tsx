import { Link, Form, redirect, useActionData, ActionFunctionArgs } from "react-router-dom";
import { login } from "../../utils/authutils";
import Alert from "@mui/material/Alert";

export async function loginAction({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let credentials = {
    username: formData.get("username")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };
  try {
    await login(credentials);
    const response = new Response();
    return redirect("/dashboard", response);
  } catch (e) {
    console.log(e);
    return { error: true };
  }
}

export default function Login() {
  const data = useActionData();
  let error = data === undefined ? false : true;

  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-[90vw] dark:bg-[rgb(0,0,0)] shadow-2xl bg-gray-100 max-w-lg p-6 h-max-content rounded-lgz border-l-4">
        <h2 className="text-2xl text-gray-800 font-semibold dark:text-gray-300 flex justify-center gap-1 items-center m-2">
          Login To
          <span className="">WebSandbox</span>
        </h2>
        {error && <Alert severity="error">Invalid username or password</Alert>}
        <Form className="w-full flex flex-col gap-3" method="POST">
          <label htmlFor="signup-username" className=" text-gray-900 dark:text-gray-200">
            Username
          </label>
          <input
            type="text"
            autoFocus
            name="username"
            required
            className="p-2 text-sm text-gray-900 border-gray-400 dark:border-white dark:text-gray-200 bg-inherit border-2"
            placeholder="username"
            id="signup-username"
          />
          <label htmlFor="signup-password" className=" text-gray-900 dark:text-gray-200">
            Password
          </label>
          <input
            type="password"
            className="p-2 text-sm text-gray-900 border-gray-400 dark:border-white dark:text-gray-200 bg-inherit border-2"
            name="password"
            id="signup-password"
            required
            placeholder="password"
          />
          <p className="mt-3 text-gray-700 font-semibold dark:text-gray-200">
            Don't have an account,{" "}
            <Link to="/signup" className="underline text-blue-600">
              Signup
            </Link>
          </p>
          <div className="flex justify-end items-center gap-2">
            <button className="bg-gray-600 text-gray-100 rounded-full px-2 w-20 py-1">Login</button>
            <button className="bg-blue-500 text-gray-100 rounded-lg px-2 w-max-content py-1">
              Login As Demo User
            </button>
          </div>
        </Form>
      </div>
    </main>
  );
}
