import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { getAuthTokens, getApiClient, clearAuthTokens, UserType } from "../../utils/authutils";
import useAuthContext from "../../contexts/authContext";

export async function loginProtectedRouteLoader() {
  if (!getAuthTokens()) {
    return redirect("/login");
  }
  await userProfileDataLoader();
  try {
    const data = await userProfileDataLoader();
    return data;
  } catch (error) {
    console.log(error);
    clearAuthTokens();
    return redirect("/login");
  }
}

async function userProfileDataLoader() {
  const apiClient = getApiClient();
  const response = await apiClient.get("accounts/info/");
  return response.data;
}
export default function LoginProtectedRouteRoot() {
  const data = useLoaderData() as UserType;
  const authContext = useAuthContext();
  authContext?.updateUserInfo(data);
  return <div>{<Outlet />}</div>;
}
