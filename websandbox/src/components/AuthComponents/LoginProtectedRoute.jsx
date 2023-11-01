import { redirect } from "react-router-dom";

export default () => {
  return <></>;
};

async function loginProtectedRouteLoader() {
  return redirect("/");
}

export { loginProtectedRouteLoader };
