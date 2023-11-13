import { Outlet, useRouteLoaderData } from "react-router-dom";
import DashboardHeader from "./Header";
import { clearAuthTokens, getApiClient, UserType } from "../../utils/authutils";
import React, { useEffect } from "react";
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

function BaseRootComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-[rgb(14,_14,_14)] w-screen h-screen text-main flex flex-col">
      <DashboardHeader />
      <div className="flex-grow overflow-y-auto w-full">{children}</div>
    </div>
  );
}

export function RootComponent() {
  const data = useRouteLoaderData("base-route") as UserType;
  const authContext = getAuthContext();

  useEffect(() => {
    authContext?.updateUserInfo(data);
  });

  return <BaseRootComponent>{<Outlet />}</BaseRootComponent>;
}

export function ErrorComponentContainer({ children }: { children: React.ReactNode }) {
  return <BaseRootComponent>{children}</BaseRootComponent>;
}
