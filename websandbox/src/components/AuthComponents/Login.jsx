import { Form, redirect } from "react-router-dom";
import { login } from "../../utils/authutils";

export async function loginAction() {
  console.log("Hello WOrld");
  login();
  return redirect("/dashboard");
}

export default function Login() {
  return (
    <div className="w-full">
      <div className="border-4">
        <h2>
          Login To <span className="italic">WebSandBox</span>
        </h2>
        <div>
          <Form method="post">
            <label>
              Username: <input type="text" required />
            </label>
            <label>
              Password: <input type="password" required />
            </label>
            <button type="submit">Login</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
