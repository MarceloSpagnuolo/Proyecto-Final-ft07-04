import React from 'react';
import { Link } from 'react-router-dom';
import alumnos from '../../assets/Alumnos.png';
import cohortes from '../../assets/Cohortes.png';
import topImg from '../../assets/topBanner.png';
import PanelControlStudents from 'components/PanelControlStudents/panelControl';
import Cohortes from 'components/Cohortes/Cohortes';
import './Home.css';

const Home = (): JSX.Element => {

    return (
        <div id="super">
            <img id="img-sup" src={topImg} alt="banner superior" />
            <h1>Panel de Control General</h1>
            <h2>Gestiona alumnos y cohortes</h2>
            <div id="bar-yellow"></div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore error aspernatur est consequuntur aliquam obcaecati fugiat necessitatibus, sint magnam accusantium, dolorem atque illo facere quisquam voluptatibus, modi ipsa architecto! Voluptates!</p>
            <br />
            <div className="container-home">
                <Link rel="stylesheet" to="/PanelControlStudent">
                    <img src={alumnos} alt="Redirect Alumnos" onClick={() => PanelControlStudents} />
                </Link>
                <Link rel="stylesheet" to="/Cohortes">
                    <img src={cohortes} alt="Redirect Cohortes" onClick={() => Cohortes} />
                </Link>
            </div>
        </div>
    )
}

export default Home;