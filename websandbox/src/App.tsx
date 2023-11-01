import {
  createBrowserRouter,
  createRoutesFromChildren,
  Outlet,
  redirect,
  Route,
} from "react-router-dom";

import HomeRoute from "./components/HomePage";

import LoginProtectedRoute, {
  loginProtectedRouteLoader,
} from "./components/AuthComponents/loginProtectedRoute";
import Login from "./components/AuthComponents/Login";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route>
      <Route path="/" element={<HomeRoute />}></Route>
      <Route path="/" element={<Outlet />}>
        <Route path="/login" element={<Login />}></Route>
      </Route>

      <Route
        path="/"
        loader={loginProtectedRouteLoader}
        element={<LoginProtectedRoute />}
      ></Route>
    </Route>
  )
);
export { router };
