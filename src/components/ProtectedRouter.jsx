import { Navigate, Outlet } from "react-router-dom";
//Metodo para controlar las rutas de parte del frontEnd
export const ProtectedRoute = ({
  isAllowed,
  redirectTo = "" ,
  children,
}) => {

  console.log(!isAllowed)
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};