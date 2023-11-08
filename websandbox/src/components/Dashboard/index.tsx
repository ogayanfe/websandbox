import DashboardHeader from "../UtilityComponents/Header";
import FolderListComponent from "./FolderListComponent";

export default function DashboardRoot() {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl text-center text-white p-8">Your web folders</h2>
      <FolderListComponent />
    </div>
  );
}
