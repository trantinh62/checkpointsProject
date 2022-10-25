import { useLocation, Navigate } from "react-router-dom";
const PrivateRoute = (props) => {
  const { children } = props;
  const token = localStorage.getItem("localToken");
  let location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export { PrivateRoute };
