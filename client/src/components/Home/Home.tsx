import React from 'react';
import { Link } from 'react-router-dom';
import alumnos from '../../assets/boton-estudiantes.jpg';
import cohortes from '../../assets/Cohortes.png';
import topImg from '../../assets/topBanner.png';
import PanelControlStudents from 'components/PanelControlStudents/panelControl';
import Cohortes from 'components/Cohortes/Cohortes';
import './Home.css';

const Home = (): JSX.Element => {

    return (
        <div id="super">
            <img id="img-sup" src={topImg} alt="banner superior" />
            <h1>Bienvenido al panel del administrador</h1>

            <div id="bar-yellow"></div>

            <br />
            <div id="container-home">
                <div id='container-home-estudiantes'>
                    <Link rel="stylesheet" to="/PanelControlStudent">
                        <img id='home-estudiantes-boton' src={alumnos} alt="Redirect Alumnos" onClick={() => PanelControlStudents} />
                    </Link>
                    <div>
                        <div id='alumnos-content'><h1>Alumnos</h1></div>
                        <div id='alumnos-title-home'></div>
                    </div>
                </div>
                <br></br>
                <Link rel="stylesheet" to="/Cohortes">
                    <img id='home-estudiantes-boton' src={cohortes} alt="Redirect Cohortes" onClick={() => Cohortes} />
                </Link>
            </div>
        </div>
    )
}

export default Home