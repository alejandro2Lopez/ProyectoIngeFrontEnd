
import { useState, useContext } from 'react';
import '../assets/RecoverPass.css'
import Swal from 'sweetalert2'
import { fetchMethods } from "../components/FetchMethods";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";


export const RecoverPass = () => {
    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate();


    {/*Variables para loggearse*/ }
    const [user, setUser] = useState("");
    const backtologin = () => {
        navigate('login')
    }
    
    const recoveryPass = () => {
        fetchMethods.getFetch(`users/recuperarContrasenna/${user}`).then((res) => {
            Swal.fire({
              title: 'Nueva contraseña enviada al correo: '+user,
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then(() => {
                navigate('login')
            });
        });
    }


    return (
        <body className='block-scroll'>


            <div className='body1'>
                <title>Andres Barbería</title>
                <link rel="stylesheet" type="text/css" href="slide navbar style.css" />
                <link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet" />
                <div className="main1">
                    <input type="checkbox" id="chk1" aria-hidden="true" />
                    <div className="align-middle">
                        <label className="label" ></label>
                        <label className="label" ></label>
                        <label className="label" ></label>
                        <label className="label" ></label>
                        <div className="signup1">

                            <div>

                                <label className="label" >Recuperar contraseña</label>
                                <div className="d-flex justify-content-center align-items-center">

                                    <p style={{ color: "white" }}>Ingrese el correo electrónico*</p>
                                </div>
                                <input type="email" name="email" placeholder="Email" value={user} onChange={(e) => setUser(e.target.value)} required />

                                <div className="d-flex justify-content-center align-items-center">

                                    <button className='button1' onClick={backtologin} >Regresar</button>
                                    <button className='button1' onClick={recoveryPass} >Aceptar</button>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </body>
    );
}

