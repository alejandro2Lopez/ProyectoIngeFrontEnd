
import { useState, useContext} from 'react';
import '../assets/login.css'




import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { authTypes } from "../types/authTypes";
import { NavLink } from 'react-router-dom';


export const Login = () => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [notify, setNotify] = useState("");

  
    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate();
    const { id } = useParams()
    const handleLogin = () => {


        dispatch({type: authTypes.login, role:"Admin"});

        navigate("/AddNewDoc");

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
                        <form>
                            <label htmlFor="chk" aria-hidden="true">Ingresar</label>
                            <input type="email" name="email" placeholder="nombre de usuario"/>
                            <input type="password" name="pswd" placeholder="contraseña" />


                            <button className='button'>Aceptar</button>
                           <div className="d-flex justify-content-center align-items-center">
                           <NavLink  style={{color: 'white'}} >Ha olvidado su contraseña?</NavLink>
                           </div>
                           
                        </form>
                    </div>
                    <div className="login">
                        <form>
                            <label htmlFor="chk" aria-hidden="true">Registrarse</label>
                            <input type="text" name="txt" placeholder="Nombre de usuario" required />
                            <input type="email" name="email" placeholder="correo electronico" required />
                            <input type="number" name="number" placeholder="numero telefonico" required />
                            <input type="password" name="pswd" placeholder="contraseña" required />
                            <input type="password" name="topswd" placeholder=" confirme su contraseña" required />
                            <button className='button' onClick={handleLogin}>Registrarse</button>

                        </form>
                    </div>
                </div>
            </div>
        </body>
    );
}

