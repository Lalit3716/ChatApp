import { FC, useContext } from "react";
import { Outlet } from "react-router";
import authContext from "../../contexts/authContext";
import AuthPage from "../../pages/Auth";

const RouteGuard: FC = () => {
  const { isAuthenticated } = useContext(authContext);

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <AuthPage />;
};

export default RouteGuard;
