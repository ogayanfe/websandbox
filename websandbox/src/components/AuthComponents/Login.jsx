import { Link, Form, redirect, useActionData } from "react-router-dom";
import { login } from "../../utils/authutils";

export async function loginAction({ request }) {
  let formData = await request.formData();
  let credentials = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  if (await login(credentials)) {
    return redirect("/dashboard");
  }
  return { error: true };
}

export default function Login() {
  const data = useActionData();
  let error = data === undefined ? false : true;

  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-[90vw] bg-gray-50 max-w-lg p-6 h-max-content rounded-lgz border-l-4">
        <h1 className="text-2xl text-gray-500 flex justify-center gap-1 items-center m-2">
          <span className="text-3xl hidden">LOGO</span>
          Login To
          <span className="italic">WebSandbox</span>
        </h1>
        {error && <p>Invalid username or password</p>}
        <Form className="w-full flex flex-col gap-3" method="POST">
          <label htmlFor="signup-username">Username</label>
          <input
            type="text"
            autoFocus
            name="username"
            required
            className="rounded-lg p-2 text-sm"
            placeholder="username"
            id="signup-username"
          />
          <label htmlFor="signup-password">Password</label>
          <input
            type="password"
            className="rounded-lg p-2 text-sm"
            name="password"
            id="signup-password"
            required
            placeholder="password"
          />
          <p className="mt-3">
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
