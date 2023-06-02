import React, { useContext} from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router";


import { AuthContext } from "../context/AuthContext";
import { authTypes } from "../types/authTypes";
export const Navbar = () => {
    const navigate = useNavigate();

    const { log, dispatch } = useContext(AuthContext);
    const handleLogout = () => {
        dispatch({ type: authTypes.logout });

        navigate('/login');

    }


    return (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                aria-current="page"
                                to="/Citas"
                            >
                                Citas
                            </NavLink>   </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>

                        {log.role === "Admin" ? (
                        <li className="nav-item dropdown" style={{ visibility: 'visible' }}>
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Configuraciones avanzadas
                            </a>

                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li> <Link
                                    className="dropdown-item"
                                    aria-current="page"
                                    to="/AdministrarUsuario"
                                >
                                    Administrar Usuario
                                </Link></li>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        aria-current="page"
                                        to="/AdministrarCitas"
                                    >
                                        Administrar citas
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        <li className="nav-item dropdown" style={{ visibility: 'hidden' }}>
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Configuraciones avanzadas
                            </a>

                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li> <Link
                                    className="dropdown-item"
                                    aria-current="page"
                                    to="/AdministrarUsuario"
                                >
                                    Administrar Usuario
                                </Link></li>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        aria-current="page"
                                        to="/AdministrarCitas"
                                    >
                                        Administrar citas
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    )}
                    
                    </ul>

                   
                    <form className="d-flex">

                        <button className="btn btn-outline-success" type="buttin" onClick={handleLogout}>Exit</button>
                    </form>
                </div>
            </div>
        </nav>
    </>)

}