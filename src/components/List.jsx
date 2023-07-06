import React, { useContext, useState } from "react";
import { fetchMethods } from "./FetchMethods";
import { AuthContext } from "../context/AuthContext";
//Muestra las citas agendadas por usuario.
const List = (props) => {
    const { log } = useContext(AuthContext);
    const [hora, setHora] = useState(0);
    const [date, setDate] = useState(null);
    const [ready, setReady] = useState(false);
    const [hairCut, setHairCut] = useState('')
    const { contents } = props;
    if (!contents || contents.length === 0) {
        return (
            <>
                <div className="d-flex justify-content-center align-items-center">
                    <h1>No hay citas agendadas</h1>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <img
                        src={require("../assets/Barber.png")}
                        alt="avatar"
                        className="rounded-circle img-fluid"
                        style={{ width: 200 }}
                    />

                </div>
            </>)

    }


    const handleDeleteDate = () => {
        if (ready) {
            fetchMethods.deleteFetch(`citas/citasdeusuario/${log.idperson},${hora},${date}, ${hairCut}`).then(() => {



            })
            setReady(false)
        }
    }
    const getDatatime = (hora, date, hairCut) => {
        setDate(date);
        setHora(hora);
        setHairCut(hairCut)
        setReady(true);
    }
    const dates = contents.map((date) => {

        return (
            <>
                <div className="card">
                    <div className="card-header">Cita</div>
                    <div className="card-body">
                        <h5 className="card-title"> Fecha: {date.fecha.toString().substring(0, 10)} Hora: {date.HoraCita}</h5>
                        <hr></hr>
                        <p className="card-text">
                            <div> Nombre del profesional: {date.Barber}</div>
                            <div> Tipo de corte: {date.HairCut}</div>

                        </p>

                        {date.cancelar == 0 ? (<h1></h1>) : (
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { getDatatime(date.idHoraCita, date.fecha.toString().substring(0, 10), date.HairCut) }}>Cancelar</button>)}
                    </div>
                </div>


            </>)
    })

    return (<>
        <form>{
            dates}

        </form>
        <form>
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
                                Eliminar cita
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">Desea eliminar la cita en la fecha: {date}  </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                            <button type="onsubmit" data-bs-dismiss="modal" onClick={handleDeleteDate} className="btn btn-primary">
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </>)
}
export default List;