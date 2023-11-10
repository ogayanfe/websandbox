import { createBrowserRouter, createRoutesFromChildren, Route } from "react-router-dom";

import HomeRoute from "./components/HomePage";
import LogoutRoute from "./components/AuthComponents/logout";
import Login, { loginAction } from "./components/AuthComponents/Login";
import Signup, { signupAction } from "./components/AuthComponents/Signup";
import "./index.css";
import BaseRootComponent from "./components/UtilityComponents/BaseRootComponent";
import { redirectAuthenticatedUserRouteLoader } from "./utils/authutils";
import LoginProtectedRouteRoot, {
  loginProtectedRouteLoader,
} from "./components/UtilityComponents/LoginProtectedRouteRoot";
import DashboardHome, { dashboardHomeLoader } from "./components/Dashboard/Home";
import createSandboxAction, { CreateSandboxComponent } from "./components/Dashboard/CreateSandbox";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/">
      <Route path="" element={<BaseRootComponent />}>
        <Route loader={redirectAuthenticatedUserRouteLoader}>
          <Route path="" index element={<HomeRoute />}></Route>
          <Route path="login" element={<Login />} action={loginAction}></Route>
          <Route path="signup" element={<Signup />} action={signupAction}></Route>
        </Route>
        <Route />
        <Route path="logout" element={<LogoutRoute />} />
        <Route path="" loader={loginProtectedRouteLoader} element={<LoginProtectedRouteRoot />}>
          <Route path="dashboard">
            <Route path="" element={<DashboardHome />} loader={dashboardHomeLoader} />
            <Route
              path="create"
              element={<CreateSandboxComponent />}
              action={createSandboxAction}
            />
            <Route />
          </Route>
          R
        </Route>
      </Route>
    </Route>
  )
);
export { router };
