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
        <div id="super">
            <img id="img-sup" src={topImg} alt="banner superior" />
            <h1>Bienvenido al panel del administrador</h1>

            <div id="bar-yellow"></div>

            <br />
            <div id="container-home">
                    <Link rel="stylesheet" to="/PanelControlStudent">
                        <img id='home-estudiantes-boton' src={alumnos} alt="Redirect Alumnos" onClick={() => PanelControlStudents} />
                    </Link>
                    {/* <div> ESTO NO ES NECESARIO: El texto "alumnos" debe estar editado adentro de la imagen
                        <div id='alumnos-content'><h1>Alumnos</h1></div>
                        <div id='alumnos-title-home'></div>
                    </div> */}
                <div>
                    <img id="home-imagen-flechita" src={flechita} alt="flechita">
                    </img>
                </div>
                <div id="home-estudiantes-div-instrucciones">
                    <h4 id="home-estudiantes-h4-instrucciones">Haciendo click en este botón podrá moverse al administrador de alumnos. También pude moverse a través de los botones de la barra de navegación. Aquí Podrá gestionar a todos los alumnos de la aplicación.</h4>
                    <div>                        
                    <img src={flechitaDerecha} alt="flechitaDerecha" id="home-flechita-derecha"></img>
                    </div>
                    <div id="home-estudiantes-div-instrucciones2">
                        
                    <h4 id="home-estudiantes-h4-instrucciones">Podrá también administrar los cohortes y grupos a los que pertecene aquí</h4>
                </div>
                </div>
                <div>
                    <img id="home-imagen-flechita2" src={flechita} alt="flechita">
                    </img>
                </div>

                <br />
                <Link rel="stylesheet" to="/Cohortes">
                    <img id='home-estudiantes-boton' src={cohortes} alt="Redirect Cohortes" onClick={() => Cohortes} />
                </Link>
                <div>
                    <img id="home-imagen-flechita" src={flechita} alt="flechita">
                    </img>
                </div>
                <div id="home-estudiantes-div-instrucciones">
                    <h4 id="home-estudiantes-h4-instrucciones">Aquí accederá al administrador de cohortes, donde podrá gstionar los cohortes existentes, crear nuevos o visualizar los finalizados</h4>
                </div>
            </div>
        </div>
    )
}

export default Home