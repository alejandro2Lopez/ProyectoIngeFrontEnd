
import { useState, useContext } from 'react';
import '../assets/login.css'
import Swal from 'sweetalert2'
import { fetchMethods } from "../components/FetchMethods";
import validator from 'validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { authTypes } from "../types/authTypes";
import { NavLink } from 'react-router-dom';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

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

        fetchMethods.postFecth("users/login", { email: user, password: pass }).then((res) => {
            console.log(res)


            if (res.message === 'Loggeado') {
                dispatch({ type: authTypes.login, role: res.data.role, userName: res.data.username, email: res.data.email, numberPhone: res.data.numberPhone, idperson: res.data.idperson });
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
            var errores = "";

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
                        dispatch({ type: authTypes.login, role: "Normal", userName: userName, email: email, numberPhone: numberphone, idperson: res.data[0].idperson });
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
                    <div className="d-flex justify-content-end align-items-end">
                        <button id="enviar" className='btn' data-bs-toggle="modal" data-bs-target="#exampleModalToggle2" style={{ color: "white" }}>
                            Andrés Barbería<FontAwesomeIcon icon={faQuestionCircle} size="xl" color='White' />
                        </button >
                    </div>
                    <input type="checkbox" id="chk" aria-hidden="true" />

                    <div className="signup">

                        <div>

                            <label htmlFor="chk" aria-hidden="true">Ingresar</label>

                            <input type="email" name="email" placeholder="Email" value={user} onChange={(e) => setUser(e.target.value)} required />
                            <input type="password" name="pswd" placeholder="contraseña" value={pass} onChange={(e) => setPass(e.target.value)} required />


                            <button className='button' onClick={handleLogin} >Aceptar</button>
                            <div className="d-flex justify-content-center align-items-center">
                                <NavLink style={{ color: 'white' }} to="/RecuperarContrasennia">Ha olvidado su contraseña?</NavLink>
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

            <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2" >About us</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <h5>Andrés Barbería </h5>
                            <hr></hr>
                            <p>Dedicado desde el 2015 en el servicio de la barbería, siempre brindando confort y excelencia a nuestros clientes con sus cortes de cabello.</p>
                            <h5>Contacto</h5>
                            <hr></hr>
                            <p>Correo: AndrésB@gmail.com</p>
                            <p>Celular: 83118944</p>
                            <h5>Ubicación</h5>
                            <hr></hr>
                            <div className='d-flex justify-content-center align-items-center'>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15713.39736945841!2d-84.311392!3d10.0704349!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0594281566997%3A0xf3b6d1ce5b1b4d32!2zQW5kcsOpcyBCYXJiZXLDrWE!5e0!3m2!1ses!2scr!4v1688571827240!5m2!1ses!2scr"
                                    width={300}
                                    height={300}
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

