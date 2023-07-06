import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Login } from "../Pages/Login";
import { ProtectedRoute } from "../components/ProtectedRouter";
import { Navigate } from "react-router";
import UserRoutes from "./UserRoutes";
import { RecoverPass } from "../Pages/RecoverPass";
//Se administran las rutas
const AdminRouter = () => {
  const { log } = useContext(AuthContext);


  return (<>
    {!log.log ? (
      <Router>
        <Routes>
          <Route element={<ProtectedRoute redirectTo='/login' isAllowed={log.log === false} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/RecuperarContrasennia" element={<RecoverPass />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </ Route>
        </Routes>
      </Router>
    ) : (
      <Router>
        <UserRoutes></UserRoutes>
      </Router>
    )}
  </>
  )


};

export default AdminRouter;
