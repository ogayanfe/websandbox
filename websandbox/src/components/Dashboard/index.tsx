import DashboardHeader from "./DashboardHeader";

export default function DashboardRoot() {
  return (
    <div className="bg-[RGB(14,_14,_14)] w-screen h-screen text-main flex">
      <div className="flex-grow">
        <DashboardHeader />
      </div>
    </div>
  );
}
