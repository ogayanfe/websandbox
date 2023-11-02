import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="text-lg border-4 p-2 flex w-full justify-between items-center">
      <h1 className="font-bold italic text-xl">WebSandBox</h1>
      <nav className="flex justify-between pr-1 items-center">
        <Link to="/login" className="mr-2">
          Login
        </Link>
        <Avatar></Avatar>
      </nav>
    </header>
  );
}
