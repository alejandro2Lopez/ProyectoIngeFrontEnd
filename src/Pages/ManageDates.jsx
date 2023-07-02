
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "../assets/calendar.css"
import { AuthContext } from "../context/AuthContext";

import WithLoadingList from "../components/WithLoadingList";
import ListAttendance from "../components/ListAttendance";

import { fetchMethods } from "../components/FetchMethods";

export const ManageDates = () => {
    const { log } = useContext(AuthContext);

    const [selectedDay, setSelectedDay] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [barber, setBarber] = useState(1);
    const fecha = new Date;
    const year = parseInt(fecha.getFullYear());
    const month = parseInt(fecha.getMonth() + 1);
    const day = parseInt(fecha.getDate());
    const [fulldate, setFullDate] = useState(`${year}-${month}-${day}`);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };
      

    const LoadingList = WithLoadingList(ListAttendance);

    const [userdates, setUserDates] = useState(null)
  
    const [AppStateLoading, setAppStateLoading] = useState(false);
    
    const user = log.idperson;
    useEffect(() => {
        if (refresh) {
            fetchMethods.getFetch(`citas/citasbarbero/${barber},${fulldate}`).then((res) => setUserDates(res.data));

            setRefresh(false);

        }

    }, [setUserDates,  refresh, user])

    const sendDataB = async (e) => {


        console.log(fecha.getFullYear());
        console.log(fecha.getUTCDay());
        console.log(fecha.getMonth())
        setBarber(e.target.value);


        setRefresh(true); //Refrezca cuando se selecciona el barbero
        console.log(`Acá al entre ${refresh}`);

    }

    const minimumDate = {

        year: year,
        month: month,
        day: day
    };
    const formatInputValue = () => {
        if (`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}` !== fulldate) {
            if (!selectedDay && !selectedMonth) return fulldate;
            setRefresh(true); //Refresca cuando uno hace un cambi en la fecha
            console.log(fulldate);
            setFullDate(`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`);
            return `Mes: ${selectedDay.month}` + `  Day: ${selectedDay.day}`;
        }
    };
    return (<>
    
        <div className="d-flex justify-content-center align-items-center">
            <div className="dropdown  col-xs-*">
                <select className="form-select" aria-label="Default select example" onChange={(e) => { sendDataB(e) }}>
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

       {/* <button type="button" onClick={() => setRefresh(true)}>
            Actualizar
        </button>*/}

        <div>
            <LoadingList isLoading={AppStateLoading} contents={userdates} onRefresh={handleRefresh} />
        </div>
       
        
    </>
    );
}