import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
export const Date = () => {
    const {log} = useContext(AuthContext);
 const lae=log.role
 return (<h1>
        Entregados a {lae}
    </h1>)
}
