import { Outlet, redirect } from "react-router-dom";
import { getAuthTokens } from "../../utils/authutils";

export async function loginProtectedRouteLoader() {
  if (!getAuthTokens()) {
    return redirect("/login");
  }
  return null;
}

export default function LoginProtectedRouteRoot() {
  return <>{<Outlet />}</>;
}
