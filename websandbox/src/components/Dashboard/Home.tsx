import FolderListComponent from "./FolderListComponent";

export default function DashboardHome() {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-blue-100 p-8">
        Your project folders
      </h2>
      <FolderListComponent />
    </div>
  );
}
