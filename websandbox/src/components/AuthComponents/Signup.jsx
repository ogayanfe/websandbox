import React from "react";
import { Form, Link } from "react-router-dom";

export default function Signup() {
  const [usernameError, passwordError] = [false, false];
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[90vw] bg-gray-50 max-w-lg p-6 h-max-content rounded-lg border-l-4">
        <h1 className="text-2xl text-gray-900 flex justify-center gap-1 items-center m-2">
          <span className="text-3xl hidden">Logo</span>
          Create An Account
        </h1>
        <Form method="post" className="w-full flex flex-col gap-3">
          <label htmlFor="signup-username">Username</label>

          {usernameError && (
            <p className="text-sm text-red-500">
              Invalid username, only letters, numbers, and @/./+/-/_ characters.
            </p>
          )}
          <input
            type="text"
            autoFocus
            name="username"
            required
            className="rounded-lg p-2 text-sm"
            placeholder="username"
            id="signup-username"
          />
          {passwordError && <p className="text-sm text-red-500">invalid password</p>}
          <label htmlFor="signup-password">Password</label>
          <input
            type="password"
            className="rounded-lg p-2 text-sm"
            name="password"
            id="signup-password"
            required
            placeholder="password"
          />

          <label htmlFor="signup-password-confirm">Password confirmation</label>
          <input
            type="password"
            className="rounded-lg p-2 text-sm"
            name="passwordConfirm"
            id="signup-password-confirm"
            required
            placeholder="password confirm"
          />
          <p className="mt-3">
            Already have an account,{" "}
            <Link to="/login" className="underline text-blue-600">
              Login
            </Link>
          </p>
          <div>
            <button className="bg-gray-600 text-gray-100 rounded-full px-2 w-20 py-1 float-right mt-2">
              Signup
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
