import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black text-lg text-white p-2 flex w-full justify-between items-center">
      <h1 className="font-bold italic text-xl">WebSandBox</h1>
      <nav className="flex justify-between pr-1 items-center">
        <Avatar>A</Avatar>
        <Link to="/login" className="ml-2">
          Login
        </Link>
      </nav>
    </header>
  );
}
