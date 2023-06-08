
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "../assets/calendar.css"
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

import WithLoadingList from "../components/WithLoadingList";
import List from "../components/List";

import { fetchMethods } from "../components/FetchMethods";




export const ManageDates = () => {
    const { log } = useContext(AuthContext);

    const [appStateObject, setAppStateObject] = useState([]);
    const [selectedDay, setSelectedDay] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [barber, setBarber] = useState(1);
    const [hairCutT, setHairCut] = useState(1);
    const fecha = new Date;
    const year = parseInt(fecha.getFullYear());
    const month = parseInt(fecha.getMonth() + 1);
    const day = parseInt(fecha.getDate());
    const [fulldate, setFullDate] = useState(`${year}-${month}-${day}`);
    const [hour, setHour] = useState("");
    const [idHour, setIdHour] = useState(0);
   

    const LoadingList = WithLoadingList(List);

    const [userdates, setUserDates] = useState(null)
  
    const [AppStateLoading, setAppStateLoading] = useState(false);
    const user = log.idperson;
    useEffect(() => {
        if (refresh) {
            setAppStateLoading(true);
            fetchMethods.getFetch(`citas/citasbarbero/${barber},${fulldate}`).then((res) => setUserDates(res.data));
            setAppStateLoading(false);

            setRefresh(false);

        }



    }, [setUserDates, setAppStateLoading, refresh, user])

    useEffect(() => {
        if (refresh) {






            fetchMethods.getFetch(`citas/${barber},${hairCutT},${fulldate}`).then((res) => {
                setAppStateObject(res.data)
                console.log(appStateObject)
            });

            setRefresh(false);

        } console.log('entre1');



    }, [setAppStateObject, refresh, setFullDate, fulldate, hairCutT, setHairCut, barber, setBarber])
    const sendDataB = async (e) => {


        console.log(fecha.getFullYear());
        console.log(fecha.getUTCDay());
        console.log(fecha.getMonth())
        setBarber(e.target.value);


        setRefresh(true);
        console.log(`Acá al entre ${refresh}`);

    }
    const setearvalor = async (e) => {
        await setHairCut(e.target.value);
    }

    const sendDataT = (e) => {
        setearvalor(e);
        setRefresh(true);


    }
    const getDateTime = (idtime, hour) => {
        setIdHour(idtime);
        setHour(hour);
    }
    const confirmDate = () => {
        fetchMethods.postFecth("citas/", { barber: barber, client: log.idperson, hourid: idHour, date: fulldate, hairCut: hairCutT, hour: hour }).then((res) => {
            setRefresh(true);

        });
    }

    const minimumDate = {

        year: year,
        month: month,
        day: day
    };
    const formatInputValue = () => {
        if (`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}` !== fulldate) {
            if (!selectedDay && !selectedMonth) return fulldate;
            setRefresh(true);
            console.log(fulldate);
            setFullDate(`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`);
            return `Mes: ${selectedDay.month}` + `  Day: ${selectedDay.day}`;
        }
    };
    var num = 0;
    const listItems = appStateObject.map((number) =>

        <>
            {(() => {
                if (number.HoraCita !== "Ocupado") {
                    if (num === 0) {
                        num++;
                        return (<div className="col-md-auto">
                            <div className="d-grid gap-2 ">
                                <button className="btn btn-dark btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" onClick={() => getDateTime(number.idHoraCita, number.HoraCita)}>{number.HoraCita}</button>
                            </div>
                        </div>)
                    } else if (num === 1) {
                        num++;
                        return (<div className="col-md-auto">
                            <div className="d-grid gap-2 ">
                                <button class="btn btn-dark btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" onClick={() => getDateTime(number.idHoraCita, number.HoraCita)}>{number.HoraCita}</button>
                            </div>
                        </div>)
                    } else {
                        num = 0;
                        return (<div className="col-md-auto">
                            <div className="d-grid gap-2">
                                <button className="btn btn-dark btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" onClick={() => getDateTime(number.idHoraCita, number.HoraCita)}>{number.HoraCita}</button>
                            </div>
                        </div>)

                    }
                }
            })()}

        </>


    );
    return (<>
    
        <div className="d-flex justify-content-center align-items-center">
            <div className="dropdown  col-xs-*">
                <select className="form-select" aria-label="Default select example" onChange={(e) => { sendDataB(e) }}>
                    <option value={1}>Barbero</option>
                    <option value={1}>Andrés R</option>
                    <option value={2}>Michael</option>

                </select>
            </div>  
            <DatePicker

                value={selectedDay}
                onChange={setSelectedDay}
                inputPlaceholder="Select a date" // placeholder
                formatInputText={formatInputValue} // format value
                inputClassName="custom-input" // custom class
                shouldHighlightWeekends
                minimumDate={minimumDate}
            />
        </div>

        <div>
            <LoadingList isLoading={AppStateLoading} contents={userdates} />
        </div>
       
    </>
    );
}