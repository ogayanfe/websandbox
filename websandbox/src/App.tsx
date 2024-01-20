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
import DashboardBase, { dashboardHomeLoader } from "./components/Dashboard";
import createSandboxAction, { CreateSandboxComponent } from "./components/Dashboard/CreateSandbox";
import Error from "./components/UtilityComponents/Error";
import SandboxHome, { sandboxHomeLoader } from "./components/SandboxComponents";
import { SandboxContextProvider } from "./contexts/sandboxContext";
import updateSandboxAction, {
  UpdateSandboxComponent,
  UpdateSandboxLoader,
} from "./components/Dashboard/UpdateSandbox";
import DashboardHome from "./components/Dashboard/DashboardHome";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route loader={baseRouteLoader} id="base-route" errorElement={<Error />}>
      <Route element={<RootComponent />}>
        <Route loader={redirectAuthenticatedUserRouteLoader}>
          <Route path="" index element={<HomeRoute />}></Route>
          <Route path="login" element={<Login />} action={loginAction}></Route>
          <Route path="signup" element={<Signup />} action={signupAction}></Route>R
        </Route>
        <Route loader={loginProtectedRouteLoader} element={<LoginProtectedRouteRoot />}>
          <Route
            path="dashboard"
            element={<DashboardBase />}
            id="dashboard-base"
            loader={dashboardHomeLoader}
          >
            <Route path="" element={<DashboardHome />}></Route>
            <Route path="starred" element={<DashboardHome />}></Route>
            <Route path="update" element={<DashboardHome />}></Route>
          </Route>
          <Route
            path="dashboard/create"
            element={<CreateSandboxComponent />}
            action={createSandboxAction}
          />
          <Route
            path=":username/:project/edit"
            element={<UpdateSandboxComponent />}
            action={updateSandboxAction}
            loader={UpdateSandboxLoader}
          />
          <Route path="logout" element={<LogoutRoute />} />
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
