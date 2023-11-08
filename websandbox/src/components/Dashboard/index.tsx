import DashboardHeader from "./DashboardHeader";
import FolderListComponent from "./FolderListComponent";

export default function DashboardRoot() {
  return (
    <div className="bg-[RGB(14,_14,_14)] w-screen h-screen text-main flex flex-col">
      <DashboardHeader />
      <div className="overflow-y-auto flex flex-col">
        <h2 className="text-3xl text-center text-white p-8">Your web folders</h2>
        <FolderListComponent />
      </div>
    </div>
  );
}
