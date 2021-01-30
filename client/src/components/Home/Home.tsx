import React from 'react';
import { Link } from 'react-router-dom';
import alumnos from '../../assets/boton-estudiantes.jpg';
import cohortes from '../../assets/Cohortes.png';
import topImg from '../../assets/topBanner.png';
import PanelControlStudents from 'components/PanelControlStudents/panelControl';
import Cohortes from 'components/Cohortes/Cohortes';
import './Home.css';

const flechita = "https://lh3.googleusercontent.com/proxy/tPLBV_fEAWxd_QdZW73t1ziwpujBfdKWtpfWqN_R9bHpdO2ADJ3b0hkcLRMjkwdUWqIgPigc6wcmrtCzmu2ledRE7supTedk9OFsy3arrGo1fSxQ2fJl1Y6NHi2tBlhdiA"
const flechitaDerecha = "https://image.flaticon.com/icons/png/512/25/25426.png"

const Home = (): JSX.Element => {

    return (
        <div id='fondo-amarillo'>
            {/*  <h1>Bienvenido al panel del administrador</h1> */}
            <div id='fondo-blanco'>
                <img id="foto-header" src={topImg} alt="banner superior" />
                <div id='contenido-home'>
                    <div id='titulo-home'>
                        <h4>ESTA ES LA HENRY APP</h4>
                        <h2>Gestiona Tus Cohortes y Alumnos</h2>
                    </div>
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
        </div >
    )
}

export default Home