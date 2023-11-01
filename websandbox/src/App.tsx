import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
} from "react-router-dom";

import HomeRoute from "./components/HomePage";

import LoginProtectedRoute, {
  loginProtectedRouteLoader,
} from "./components/AuthComponents/loginProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route>
      <Route path="/" element={<HomeRoute />}></Route>
      <Route
        path="/"
        loader={loginProtectedRouteLoader}
        element={<LoginProtectedRoute />}
      ></Route>
    </Route>
  )
);
export { router };
