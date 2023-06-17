import React, { useContext, useEffect, useState } from "react";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "../assets/calendar.css";
import { AuthContext } from "../context/AuthContext";


import { fetchMethods } from "../components/FetchMethods";

export const FreeSchedule = () => {
  const { log } = useContext(AuthContext);

  const [selectedDay, setSelectedDay] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [barber, setBarber] = useState(1);
  const [hairCutT, setHairCut] = useState(1);
  const fecha = new Date();
  const year = parseInt(fecha.getFullYear());
  const month = parseInt(fecha.getMonth() + 1);
  const day = parseInt(fecha.getDate());
  const [fulldate, setFullDate] = useState(`${year}-${month}-${day}`);
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [idHour, setIdHour] = useState(0);
  const [hour, setHour] = useState("");
  const [vectorHours, setvectorHours] = useState([]);

  useEffect(() => {
    if (refresh) {
        
      fetchMethods.getFetch(`citas/horaCita`).then((res) => {
        setvectorHours(res.data)
          console.log(vectorHours)
      });

      setRefresh(true);

    } console.log('entre1');

  }, [setvectorHours, refresh, setFullDate, fulldate, hairCutT, setHairCut, barber, setBarber])

  const availableHours = [
    "08:00 am",
    "08:20 am",
    "08:40 am",
    "09:00 am",
    "09:20 am",
    "09:40 am",
    "10:00 am",
    "10:20 am",
    "10:40 am",
    "11:00 am",
    "11:20 am",
    "11:40 am",
    "01:00 pm",
    "01:20 pm",
    "01:40 pm",
    "02:00 pm",
    "02:20 pm",
    "02:40 pm",
    "03:00 pm",
    "03:20 pm",
    "03:40 pm",
    "04:00 pm",
    "04:20 pm",
    "04:40 pm",
    "05:00 pm",
    "05:20 pm",
    "05:40 pm",
    "06:00 pm",
    "06:20 pm",
    "06:40 pm",
  ];

  const handleStartHourChange = (e) => {
    setStartHour(e.target.value);
  };

  const handleEndHourChange = (e) => {
    setEndHour(e.target.value);
  };

  const sendDataB = async (e) => {

    console.log(fecha.getFullYear());
    console.log(fecha.getUTCDay());
    console.log(fecha.getMonth())
    setBarber(e.target.value);

    setRefresh(true);
    console.log(`Acá al entre ${refresh}`);

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
  console.log(vectorHours);
  return (
    <>

    <div className="d-flex justify-content-center align-items-center">
        <div className="dropdown col-xs-*">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              sendDataB(e);
            }}
          >
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

      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="dropdown col-xs-*">
          <select
            className="form-select"
            aria-label="Default select example"
            value={startHour}
            onChange={handleStartHourChange}
          >
            <option value="">Hora inicio</option>
            {vectorHours.map((hour) => (
              <option key={hour.id} value={hour.HoraCita}>
                {hour.HoraCita}
              </option>
            ))}
          </select>
        </div>
        
        <div className="dropdown col-xs-*">
          <select
            className="form-select"
            aria-label="Default select example"
            value={endHour}
            onChange={handleEndHourChange}
          >
            <option value="">Hora final</option>
            {vectorHours.map((hour) => (
              <option key={hour.id} value={hour.HoraCita }>
              {hour.HoraCita}
              </option>
            ))}
          </select>
        </div>
      </div>

   
    </>
  );
};
