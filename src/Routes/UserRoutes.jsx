import React, { useContext } from "react";

import { Route, Navigate, Routes } from "react-router-dom";
import { Dates } from "../Pages/Dates";
import { Navbar } from "../components/Navbar";
import { ManageUser } from "../Pages/ManageUser";
import { ProtectedRoute } from "../components/ProtectedRouter";
import { ManageDates } from "../Pages/ManageDates";
import { FreeSchedule } from "../Pages/FreeSchedule";



import { AuthContext } from "../context/AuthContext";
import { UserDate } from "../Pages/UserDates";
import { ChangePass } from "../Pages/ChangePassword";
const UserRoutes = () => {
  const { log } = useContext(AuthContext);
  return (<>
    <Navbar></Navbar> {/*menu de barras*/}


    {/*Rutas en las que solo puede acceder el admin*/}
    <Routes>
      <Route element={<ProtectedRoute isAllowed={!!log.log && log.role === "Administrador"} />}>
        <Route path="/AdministrarUsuario" element={<ManageUser />} />
        <Route path="/Agenda" element={<ManageDates />} />
        <Route path="/AdministrarCitas" element={<FreeSchedule />} />

      </ Route>


      {/* Rutas permitidas para ambos roles*/}
      <Route element={<ProtectedRoute isAllowed={!!log.log && (log.role === "Normal" || log.role === "Administrador")} />}>
        <Route path="/Citas" element={<Dates />} />
        <Route path="/CitasAgendadas" element={<UserDate/>} />
        <Route path="*" element={<Navigate to="/Citas" />} />
        <Route path="/CambiarContrasennia" element={<ChangePass/>} />
      </ Route>

    </Routes>
  </>
  )

}

  ;
export default UserRoutes;

