import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import topImg from '../../assets/topBanner.png';
import PanelControlStudents from 'components/PanelControlStudents/panelControl';
import Cohortes from 'components/Cohortes/Cohortes';
import './Home.css';


const Home = () => {
    const user: any = useSelector((state: any) => state.Users.user);

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            window.location.href = "/";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (user.role === "admin" || user.role === "instructor") ? (
        // LOGICA PARA RENDERIZAR LO QUE VE EL ADMIN
        <div id='fondo-amarillo'>
            <div id='blank-space'></div>
            <div id='fondo-blanco'>
                <img id="foto-header" src={topImg} alt="banner superior" />
                <div id='contenido-home'>
                    <div id='titulo-home'>
                        <h2>Gestiona Tus Cohortes y Alumnos</h2>
                        <h4>Bienvenid@ al Henry manager</h4>
                        <h3>Henry Manager te permite hacer seguimiento a tus estudiantes, revisar su desempeño, y organizar a los futuros henrys en grupos de estudio</h3>
                    </div>
                    <div id='home-paneles'>
                        <div id='panel-estudiantes'>
                            <p>Para gestionar alumnos puedes hacer click en el botón, o acceder a través de la barra de navegacion</p>
                            <Link rel="stylesheet" to="/PanelControlStudent">
                                <button id='home-estudiantes-boton' onClick={() => PanelControlStudents}>Panel Alumnos</button>
                            </Link>
                        </div>
                        <div id='panel-cohortes'>
                            <p id="home-estudiantes-h4-instrucciones">Para administrar cohortes haz click en el botón o usa los controles de la barra de navegacion</p>
                            <Link rel="stylesheet" to="/Cohortes">
                                <button id='home-estudiantes-boton' onClick={() => Cohortes}>Panel cohortes</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
        // LOGICA PARA RENDERIZAR LO QUE VE EL PM
        : (user.role === "PM") ?
            <div id='fondo-amarillo'>
                <div id='blank-space'></div>
                <div id='fondo-blanco'>
                    <img id="foto-header" src={topImg} alt="banner superior" />
                    <div id='contenido-home-pm'>
                        <div id='titulo-home-pm'>
                            <h4>ESTA ES LA HENRY APP</h4>
                            <h2>Gestiona Tu StandUp Y Tu Cohorte</h2>
                        </div>
                        <div id='pm-home-paneles-container'>
                            <div id='panel-estudiantes-pm'>
                                <p className='pm-home-parrafos'>Para gestionar tu StandUp haz click en el botón, o accede a través de la barra de navegacion</p>
                                <Link rel="stylesheet" to={`/MiGrupo/${user.standup._id}`}>
                                    <button id='home-pm-boton'>Mi Standup</button>
                                </Link>
                            </div>
                            <div id='panel-cohortes-pm'>
                                <p className='pm-home-parrafos'>Para ver tu Cohorte haz click en el botón o usa los controles de la barra de navegacion</p>
                                <Link rel="stylesheet" to={`/MiCohorte/${user.cohorte._id}`}>
                                    <button id='home-pm-boton'>Mi Cohorte</button>
                                </Link>
                            </div>
                            <div id='panel-rendimiento-pm'>
                                <p className='pm-home-parrafos'>Para ver tu rendimiento haz click en el botón o usa los controles de la barra de navegacion</p>
                                <Link rel="stylesheet" to={`/MisDatos/${user._id}`}>
                                    <button id='home-pm-boton'>Mi Rendimiento</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            // LOGICA PARA RENDERIZAR LO QUE VE EL ALUMNO
            : (user.role === "alumno") ?
                <div id='fondo-amarillo'>
                    <br></br>
                    <div id='fondo-blanco'>
                        <img id="foto-header" src={topImg} alt="banner superior" />
                        <div id='contenido-home-estudiantes'>
                            <div id='titulo-home'>
                                <h4>ESTA ES LA HENRY APP</h4>
                                <h2>Gestiona Tu Avance Como Alumno</h2>
                            </div>
                            <div id='panel-estudiantes'>
                                <p>Para ver tu cohorte puedes hacer click en este botón, o acceder a través de la barra de navegacion</p>
                                <Link rel="stylesheet" to={`/MiCohorte/${user.cohorte._id}`}>
                                    <button id='home-estudiantes-boton' >Mi Cohorte</button>
                                </Link>
                            </div>
                            <div id='panel-cohortes'>
                                <p id="home-estudiantes-h4-instrucciones">Para ver tu rendimiento haz click en este botón o usa los controles de la barra de navegacion</p>
                                <Link rel="stylesheet" to={`/MisDatos/${user._id}`}>
                                    <button id='home-estudiantes-boton' >Mi rendimiento</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div >
                : null
}

export default Home