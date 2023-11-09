import { useEffect } from "react";
import useAuthContext from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function LogoutRoute() {
  const authContext = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    authContext.logout();
    authContext.updateUserInfo(null);
    navigate("/", { replace: true });
  }, []);
  return <></>;
}
