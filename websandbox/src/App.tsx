import { createBrowserRouter, createRoutesFromChildren, Route } from "react-router-dom";

import HomeRoute from "./components/HomePage";
import LogoutRoute from "./components/AuthComponents/Logout";
import Login, { loginAction } from "./components/AuthComponents/Login";
import Signup, { signupAction } from "./components/AuthComponents/Signup";
import "./index.css";
import { RootComponent, baseRouteLoader } from "./components/UtilityComponents/RootComponents";
import { redirectAuthenticatedUserRouteLoader } from "./utils/authutils";
import LoginProtectedRouteRoot, {
  loginProtectedRouteLoader,
} from "./components/UtilityComponents/LoginProtectedRouteRoot";
import DashboardHome, { dashboardHomeLoader } from "./components/Dashboard/Home";
import createSandboxAction, { CreateSandboxComponent } from "./components/Dashboard/CreateSandbox";
import Error from "./components/UtilityComponents/Error";
import SandboxHome, { sandboxHomeLoader } from "./components/SandboxComponents";
import { SandboxContextProvider } from "./contexts/sandboxContext";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route loader={baseRouteLoader} id="base-route" errorElement={<Error />}>
      <Route element={<RootComponent />}>
        <Route path="" index element={<HomeRoute />}></Route>
        <Route path="logout" element={<LogoutRoute />} />
        <Route loader={redirectAuthenticatedUserRouteLoader}>
          <Route path="login" element={<Login />} action={loginAction}></Route>
          <Route path="signup" element={<Signup />} action={signupAction}></Route>R
        </Route>
        <Route />
        <Route loader={loginProtectedRouteLoader} element={<LoginProtectedRouteRoot />}>
          <Route path="dashboard">
            <Route path="" element={<DashboardHome />} loader={dashboardHomeLoader} />
            <Route
              path="create"
              element={<CreateSandboxComponent />}
              action={createSandboxAction}
            />
            <Route />
          </Route>
        </Route>
      </Route>
      <Route
        path=":username/:project"
        element={
          <SandboxContextProvider>
            <SandboxHome />
          </SandboxContextProvider>
        }
        id="sandbox-editor-route"
        loader={sandboxHomeLoader}
      ></Route>
    </Route>
  )
);
export { router };
