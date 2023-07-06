import { useEffect, useReducer } from "react";

import AdminRouter from "./Routes/ManageRoutes";

import { AuthContext } from "./context/AuthContext";
import { AuthReducer } from "./reducers/AuthReducer";
//Inicializa el sistema, se cargan los datos del local Storage y demás
const init = () => {
  return JSON.parse(localStorage.getItem("log")) || { log: false };
};

const App = () => {
  const [log, dispatch] = useReducer(AuthReducer, {}, init);

  useEffect(() => {
    localStorage.setItem("log", JSON.stringify(log));
  }, [log]);

  return (
    <AuthContext.Provider value={{ log, dispatch }}>
      <AdminRouter />
    </AuthContext.Provider>
  );
};

export default App;
