import { useEffect } from "react";

export default function HomeRoute() {
  useEffect(() => {
    document.title = "WebSandbox | Home";
  }, []);

  return <div>Home Page</div>;
}
