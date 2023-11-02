import { Outlet, redirect } from "react-router-dom";
import useAuthContext from "../../contexts/authContext";

function LoginProtectedRouteLoader() {
  const authContext = useAuthContext();

  if (!authContext.isLoggedIn()) return redirect("/login");
  return <Outlet />;
}

export default LoginProtectedRouteLoader;
