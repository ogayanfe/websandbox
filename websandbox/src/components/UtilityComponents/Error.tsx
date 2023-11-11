import BaseRootCompenent from "./BaseRootComponent";
import { Link, useRouteError } from "react-router-dom";
import useAuthContext from "../../contexts/authContext";
import { Button } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

export default function Error() {
  const error = useRouteError() as {
    data?: string;
    status?: number;
  };
  const authContext = useAuthContext();
  return (
    <BaseRootCompenent>
      <div className="flex gap-3 h-4/5 w-full text-black font-semibold dark:text-blue-50 items-center justify-center flex-col text-2xl">
        <h2>{error?.data ? error.data : "An Error Has Occured"}</h2>
        <p>{error?.status ? error.status : ""}</p>
        <Button
          component={Link}
          to={authContext?.authenticated() ? "/dashboard" : "/"}
          variant="contained"
          startIcon={<ArrowLeftIcon />}
        >
          {authContext?.authenticated() ? "Back To Dashboard" : "Back To Home"}
        </Button>
      </div>
    </BaseRootCompenent>
  );
}
