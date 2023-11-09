import { Outlet } from "react-router-dom";
import DashboardHeader from "../UtilityComponents/Header";

export default function DashboardRoot() {
  return (
    <div className="dark:bg-[RGB(14,_14,_14)] w-screen h-screen text-main flex flex-col">
      <DashboardHeader />
      <div className="flex-grow overflow-y-auto w-full">
        <Outlet />
      </div>
    </div>
  );
}
