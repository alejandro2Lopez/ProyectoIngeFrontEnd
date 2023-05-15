import React, { useContext, useState , useEffect} from "react";
import { fetchMethods} from "../components/FetchMethods";

export const ManageUser = () => {


    const [value, setValue] = useState('')
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        if (refresh) {

            fetchMethods.getFetch("users").then(val => setValue(val.data[0].nombreUsuario));

            setRefresh(false);
        }
    }, [setValue, refresh])


    return (<h1>
        Entregados a {value}
    </h1>)
}
