import { useEffect, useReducer } from "react";

import AdminRouter from "./Routes/ManageRoutes";

import { AuthContext } from "./context/AuthContext";
import { AuthReducer } from "./reducers/AuthReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("log")) || { log: false };
};

const App = () => {
  const [log, dispatch, role] = useReducer(AuthReducer, {}, init);

  useEffect(() => {
    localStorage.setItem("log", JSON.stringify(log));
    localStorage.setItem("role", JSON.stringify(role))
  }, [log, role]);

  return (
    <AuthContext.Provider value={{ log, dispatch, role: "Alejo"}}>
      <AdminRouter />
    </AuthContext.Provider>
  );
};

export default App;
