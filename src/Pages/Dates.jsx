import React, { useContext, useEffect, useState } from "react";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "../assets/calendar.css"
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
export const Date = () => {
    const { log } = useContext(AuthContext);
    const [selectedDay, setSelectedDay] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(false);


    const formatInputValue = () => {
        if (!selectedDay && !selectedMonth) return '';
        return `Mes: ${selectedDay.month}` + `  Day: ${selectedDay.day}`;
    };
    const numbers = ['7:30', '8:00', '9:30', '11:30', '10:00'];
    let num = 0;
    const listItems = numbers.map((number) =>

        <div class="container">
            <div class="row">
                <div class="row gy-1">
                    {(() => {
                        if (num === 0) {
                            num++;
                            return (<div class="col col-lg-2">
                                <div class="d-grid gap-2 ">
                                    <button class="btn btn-dark btn-lg" type="button">{number}</button>
                                </div>
                            </div>)
                        } else if (num === 1) {
                            num++;
                            return (<div class="col col-lg-2">
                                <div class="d-grid gap-2 ">
                                    <button class="btn btn-dark btn-lg" type="button">{number}</button>
                                </div>
                            </div>)
                        } else {
                            num = 0;
                            return (<div class="col col-lg-2">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-dark btn-lg" type="button">{number}</button>
                                </div>
                            </div>)

                        }
                    })()}
                </div>
            </div>
        </div>

    );
    return (<>
        <div className="d-flex justify-content-center align-items-center">
            <div class="dropdown">
                <a class="btn btn-white dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Barbero
                </a>

                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Andrés R</a></li>
                    <li><a class="dropdown-item" href="#">Michael</a></li>
                </ul>
            </div>
            <DatePicker

                value={selectedDay}
                onChange={setSelectedDay}
                inputPlaceholder="Select a date" // placeholder
                formatInputText={formatInputValue} // format value
                inputClassName="custom-input" // custom class
                shouldHighlightWeekends
            />


            <div class="dropdown">
                <a class="btn btn-white dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Tipo de corte
                </a>

                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Barba</a></li>
                    <li><a class="dropdown-item" href="#">Cabello</a></li>
                    <li><a class="dropdown-item" href="#">Ambas</a></li>
                </ul>

            </div>


        </div>
        <div>
            {
                <div>{listItems}</div>
            }
        </div>
        <div class="container">
  <div class="row justify-content-md-center">
    <div class="col col-lg-2">
      1 of 3
    </div>
    <div class="col-md-auto">
      Variable width content
    </div>
    <div class="col col-lg-2">
      3 of 3
    </div>
  </div>
  <div class="row">
    <div class="col">
      1 of 3
    </div>
    <div class="col-md-auto">
      Variable width content
    </div>
    <div class="col col-lg-2">
      3 of 3
    </div>
  </div>
</div>
    </>
    );
}
