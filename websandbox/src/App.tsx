import { createBrowserRouter, createRoutesFromChildren, Outlet, Route } from "react-router-dom";

import HomeRoute from "./components/HomePage";

import LoginProtectedRoute from "./components/AuthComponents/loginProtectedRoute";
import Login, { loginAction } from "./components/AuthComponents/Login";
import Signup from "./components/AuthComponents/Signup";
import "./index.css";
import BaseRootComponent from "./components/UtilityComponents/BaseRootComponent";
import { redirectAuthenticatedUserRouteLoader } from "./utils/authutils";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route>
      <Route path="/" element={<BaseRootComponent />}>
        <Route path="/" element={<Outlet />} loader={redirectAuthenticatedUserRouteLoader}>
          <Route path="/" index element={<HomeRoute />}></Route>
          <Route path="/login" element={<Login />} action={loginAction}></Route>
          <Route path="/signup" element={<Signup />} action={loginAction}></Route>
        </Route>
      </Route>

      <Route path="/" element={<LoginProtectedRoute />}></Route>
    </Route>
  )
);
export { router };
