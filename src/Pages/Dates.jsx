import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
const Dates = () => {
    const {log} = useContext(AuthContext);
 const lae=log.role
 return (<h1>
        Entregados a {lae}
    </h1>)
}
export default Dates;