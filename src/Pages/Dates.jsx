import React, { useContext, useState } from "react";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { AuthContext } from "../context/AuthContext";
export const Date = () => {
    const {log} = useContext(AuthContext);
    const [selectedDay, setSelectedDay] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(false);

    const formatInputValue = () => {
        if (!selectedDay && !selectedMonth) return '';
        console.log(selectedDay)
        return `Mes: ${selectedDay}` + `  Day: ${selectedDay.day}`;
        };
        return (
            <DatePicker
            value={selectedDay}
            onChange={setSelectedDay}
            inputPlaceholder="Select a date" // placeholder
            formatInputText={formatInputValue} // format value
            inputClassName="my-custom-input" // custom class
            shouldHighlightWeekends
            />
        );
}
