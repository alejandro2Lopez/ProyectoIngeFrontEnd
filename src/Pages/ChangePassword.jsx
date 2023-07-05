
import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export const ChangePass = () => {
    const { log } = useContext(AuthContext);

    return (
        <body className='block-scroll'>
            <div style={{  width: "100%", height: "100vh" }}>
                <div className="container py-5">
                    <div className="row">
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="shadow p-3  card mb-4">
                                <div className="card-body text-center">
                                    <img
                                        src={require("../assets/Desconocido.png")}
                                        alt="avatar"
                                        className="rounded-circle img-fluid"
                                        style={{ width: 150 }}
                                    />
                                    <h5 className="my-3">{log.userName}</h5>

                                    <div className="d-flex justify-content-center mb-2">

                                    </div>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="shadow p-3 card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Nombre de usuario</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{log.userName}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{log.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Numero telefónixo</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">(506) {log.numberPhone}</p>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className=" shadow p-3  card ">
                                        <div className="card-body">
                                            <h3>Cambiar contraseña</h3>
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <p>Contraseña</p>

                                            <input type="password" class="form-control" id="inputPassword2" placeholder="Password" />
                                            <p>Confirmar contraseña</p>

                                            <input type="password" class="form-control" id="inputPassword2" placeholder="Password" />
                                            <button type="submit" class="btn btn-secondary mb-2">Confirm identity</button>
                                        </div>

                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}