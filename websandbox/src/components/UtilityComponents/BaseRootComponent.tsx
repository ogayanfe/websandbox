import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function RouteComponent() {
  return (
    <div className="flex flex-col bg-[rgb(14,14,14)] w-full h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
