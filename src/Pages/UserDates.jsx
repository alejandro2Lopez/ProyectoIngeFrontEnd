import React, { useContext, useEffect, useState } from "react";
import { fetchMethods } from "../components/FetchMethods";
import List from "../components/List";
import WithLoadingList from "../components/WithLoadingList";
import { AuthContext } from "../context/AuthContext";
//Muestra las citas de usuario
export const UserDate = () => {
    const LoadingList = WithLoadingList(List);
    const { log } = useContext(AuthContext);
    const [userdates, setUserDates] = useState(null)
    const [refresh, setRefresh] = useState(true)
    const [AppStateLoading, setAppStateLoading] = useState(false);
    const user = log.idperson;
    useEffect(() => {
        if (refresh) {
            setAppStateLoading(true);
            fetchMethods.getFetch(`citas/citasdeusuario/${user}`).then((res) => setUserDates(res.data));
            setAppStateLoading(false);

            setRefresh(false);

        }



    }, [setUserDates, setAppStateLoading, refresh, user])




    return (<>
        <div>
            <LoadingList isLoading={AppStateLoading} contents={userdates} />
        </div>

    </>)
}
