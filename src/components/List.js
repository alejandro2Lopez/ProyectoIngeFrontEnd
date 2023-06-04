import React, { useContext } from "react";
import { fetchMethods } from "../components/FetchMethods";
import { AuthContext } from "../context/AuthContext";
const List = (props) => {
    const { log } = useContext(AuthContext);
    const { contents } = props;
    if (!contents || contents.length === 0) { return <h1>No Hay citas agendadas</h1> }


    const handleDeleteDate = (fecha, cliente, idhora) => {
        fetchMethods.deleteFetch(`citas/citasdeusuario/${cliente},${idhora},${fecha}`).then(() => {



        })
    }
    return (<>
        <div>{contents.map((date) => {

            return (<form>
                <div className="card">
                    <div className="card-header">Cita</div>
                    <div className="card-body">
                        <h5 className="card-title"> Fecha: {date.fecha.toString().substring(0, 10)} Hora: {date.HoraCita}</h5>
                        <hr></hr>
                        <p className="card-text">
                            <div> Nombre del profesional: {date.barber}</div>
                            <div> Tipo de corte: {date.HairCut}</div>

                        </p>

                        {date.cancelar === 0 ? (<h1></h1>) : (
                            <button type="submit" class="btn btn-danger" onClick={handleDeleteDate(date.fecha.toString().substring(0, 10), log.idperson, date.idHoraCita)}>Cancelar</button>)}
                    </div>
                </div></form>)
        })
        }</div>

    </>)
}
export default List;