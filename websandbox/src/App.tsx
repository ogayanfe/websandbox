import { createBrowserRouter, createRoutesFromChildren, Route } from "react-router-dom";

import HomeRoute from "./components/HomePage";

import Login, { loginAction } from "./components/AuthComponents/Login";
import Signup from "./components/AuthComponents/Signup";
import "./index.css";
import BaseRootComponent from "./components/UtilityComponents/BaseRootComponent";
import { redirectAuthenticatedUserRouteLoader } from "./utils/authutils";
import LoginProtectedRouteRoot, {
  loginProtectedRouteLoader,
} from "./components/UtilityComponents/LoginProtectedRouteRoot";
import DashboardRoot from "./components/Dashboard";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/">
      <Route path="" element={<BaseRootComponent />}>
        <Route loader={redirectAuthenticatedUserRouteLoader}>
          <Route path="" index element={<HomeRoute />}></Route>
          <Route path="login" element={<Login />} action={loginAction}></Route>
          <Route path="signup" element={<Signup />} action={loginAction}></Route>
        </Route>
        <Route />
        <Route path="" loader={loginProtectedRouteLoader} element={<LoginProtectedRouteRoot />}>
          <Route path="dashboard" element={<DashboardRoot />}></Route>
        </Route>
      </Route>
    </Route>
  )
);
export { router };
