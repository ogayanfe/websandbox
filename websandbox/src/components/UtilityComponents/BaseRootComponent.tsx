import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function RouteComponent() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
