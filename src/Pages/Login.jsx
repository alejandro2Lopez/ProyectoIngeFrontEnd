
import { useState, useContext } from 'react';
import '../assets/login.css'
import Swal from 'sweetalert2'
import { fetchMethods } from "../components/FetchMethods";
import validator from 'validator'

import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { authTypes } from "../types/authTypes";
import { NavLink } from 'react-router-dom';


export const Login = () => {
    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate();


    {/*Variables para loggearse*/ }
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const [error, setError] = useState("");
    {/*Variables para registrar*/ }
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [numberphone, setNumberPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");




    const handleLogin = () => {

        fetchMethods.postFecth("users/login", { gmail: user, password: pass }).then((res) => {
            console.log(res)


            if (res.message === 'Loggeado') {
                dispatch({ type: authTypes.login, role: res.data.role, userName: res.data.username, gmail: res.data.gmail, numberPhone: res.data.numberPhone, idperson: res.data.idperson });
                navigate("/AddNewDoc");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o contraseña incorrecto',
                    confirmButtonColor: "#DD6B55"

                })


            }
        })
    };

    const handleSignup = () => {
        if (userName.trim() !== "" && email.trim() !== "" && numberphone.trim() !== "" && password.trim() !== "" && confirmPass.trim() !== "") {
            var errores = "\n";

            if (!validator.isEmail(email)) {
                console.log("Entré a la email")
                errores = errores + "\nError email inválido \n"
            }

            if (password.length < 8) {
                console.log("Entré a la pssword")
                errores = errores + "\rLa contraseña debe tener minusculas, mayusculas, y al menos 8 caracteres. \n"
            }
            if (password !== confirmPass) {
                console.log("Entré a la confirmación de la password")
                errores = errores + "\nLas contraseñas no coinciden \n"
            }
            if (errores.length <= 0) {
                fetchMethods.postFecth("users/signup", { username: userName, email: email, password: password, confirmPassword: confirmPass, numberphone: numberphone }).then((res) => {
                    if (res.message === 'registrado') {
                        dispatch({ type: authTypes.login, role: "Normal", userName: userName, gmail: email, numberPhone: numberphone, idperson: res.data[0].idperson });
                        navigate("/AddNewDoc");

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "Email o numero telefonico inválido",
                            confirmButtonColor: "#DD6B55"

                        })
                    }
                })

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: ` ${errores}`,
                    confirmButtonColor: "#DD6B55"

                })
                setError("");
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los espacios son requeridos.',
                confirmButtonColor: "#DD6B55"

            })
        }
    };


    return (
        <body className='block-scroll'>


            <div className='body'>
                <title>Andres Barbería</title>
                <link rel="stylesheet" type="text/css" href="slide navbar style.css" />
                <link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet" />
                <div className="main">
                    <input type="checkbox" id="chk" aria-hidden="true" />
                    <div className="signup">
                        <div>
                            <label htmlFor="chk" aria-hidden="true">Ingresar</label>

                            <input type="email" name="email" placeholder="Email" value={user} onChange={(e) => setUser(e.target.value)} required />
                            <input type="password" name="pswd" placeholder="contraseña" value={pass} onChange={(e) => setPass(e.target.value)} required />


                            <button className='button' onClick={handleLogin} >Aceptar</button>
                            <div className="d-flex justify-content-center align-items-center">
                                <NavLink style={{ color: 'white' }} >Ha olvidado su contraseña?</NavLink>
                            </div>

                        </div>
                    </div>
                    <div className="login">
                        <div>
                            <label htmlFor="chk" aria-hidden="true">Registrarse</label>
                            <input type="text" name="txt" placeholder="Nombre de usuario" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                            <input type="email" name="email" placeholder="correo electronico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input type="number" name="number" placeholder="numero telefonico" value={numberphone} onChange={(e) => setNumberPhone(e.target.value)} required />
                            <input type="password" name="pswd" placeholder="contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />

                            <input type="password" name="topswd" placeholder=" confirme su contraseña" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required />
                            <button className='button' onClick={handleSignup}>Registrarse</button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </body>
    );
}

