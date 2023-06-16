
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "@sentisso/react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "../assets/calendar.css"
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

import { fetchMethods } from "../components/FetchMethods";
export const Dates = () => {
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
                disabledWeekDays={[0]}
                shouldHighlightWeekends
                minimumDate={minimumDate}
            />


            <div className="dropdown  col-xs-*">
                <select className="form-select" aria-label="Default select example" onChange={(e) => { sendDataT(e) }}>
                    <option value={1}>Tipo Corte</option>
                    <option value={1}>Barba</option>
                    <option value={2}>Cabello</option>
                    <option value={3}>Ambas</option>
                </select>
            </div>


        </div>
        <div>
            <hr />

            <div class="container">
                <div class="row justify-content-center">
                    <div class="row gy-1"> {listItems}</div>
                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Confirmar Cita
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">Desea confirmar la cita en la fecha: {fulldate} a las: {hour} </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Cerrar
                                    </button>
                                    <button type="button" data-bs-dismiss="modal" onClick={confirmDate} className="btn btn-primary">
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
    );
}