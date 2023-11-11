import { Outlet, useLoaderData } from "react-router-dom";
import DashboardHeader from "../UtilityComponents/Header";
import { clearAuthTokens, getApiClient, UserType } from "../../utils/authutils";
import { useEffect } from "react";
import getAuthContext from "../../contexts/authContext";

export async function baseRouteLoader() {
  try {
    const data = await getUserProfileData();
    return data;
  } catch (error) {
    console.log(error);
    clearAuthTokens();
    return null;
  }
}

async function getUserProfileData() {
  const apiClient = getApiClient();
  const response = await apiClient.get("accounts/info/");
  return response.data;
}

export default function DashboardRoot({ children }: { children?: React.ReactNode }) {
  const data = useLoaderData() as UserType;
  const authContext = getAuthContext();

  useEffect(() => {
    authContext?.updateUserInfo(data);
  });

  return (
    <div className="dark:bg-[RGB(14,_14,_14)] w-screen h-screen text-main flex flex-col">
      <DashboardHeader />
      <div className="flex-grow overflow-y-auto w-full">
        {children}
        <Outlet />
      </div>
    </div>
  );
}
