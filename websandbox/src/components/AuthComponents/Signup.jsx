import React from "react";
import { Form, Link } from "react-router-dom";

export default function Signup() {
  const [usernameError, passwordError] = [false, false];
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[90vw] dark:bg-[rgb(0,0,0)] shadow-2xl bg-gray-100 max-w-lg p-6 h-max-content rounded-lgz border-l-4">
        <h1 className="text-2xl text-gray-800 font-semibold dark:text-gray-300 flex justify-center gap-1 items-center m-22">
          Create An Account
        </h1>
        <Form method="post" className="w-full flex flex-col gap-3">
          <label htmlFor="signup-username" className=" text-gray-900 dark:text-gray-200">
            Username
          </label>
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
            className="p-2 text-sm text-gray-900 border-gray-400 dark:border-white dark:text-gray-200 bg-inherit border-2"
            placeholder="username"
            id="signup-username"
          />
          {passwordError && <p className="text-sm text-red-500">invalid password</p>}
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
          <label htmlFor="signup-password-2" className=" text-gray-900 dark:text-gray-200">
            Password Again
          </label>
          <input
            type="password"
            className="p-2 text-sm text-gray-900 border-gray-400 dark:border-white dark:text-gray-200 bg-inherit border-2"
            name="password"
            id="signup-password-2"
            required
            placeholder="password-2"
          />
          <p className="mt-3 text-gray-700 font-semibold dark:text-gray-200">
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
