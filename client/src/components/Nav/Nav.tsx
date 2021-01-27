import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Nav.css";

const Nav = () => {
    const [display, setDisplay] = useState<boolean>(false)
    const [display1, setDisplay1] = useState<string>("")


    function change() {
        setDisplay(!display)
    }
    function divChange(a: string) {
        if (a === display1) {
            setDisplay1("")
            return
        }
        setDisplay1(a)
        return
    }
    return (
        <div className="pruebaNav">
            <img className="logo" alt="" src="https://cdn.discordapp.com/attachments/764979688446885898/802330293691482143/HM-BLANCO.png" />
            <img className="nombre" alt="" src="https://cdn.discordapp.com/attachments/764979688446885898/802016303111602226/hm.png" />
            <div className={display ? "btnNavbar x" : "btnNavbar"} onClick={() => change()}>
                <div className="barritaNav btna" ></div>
                <div className="barritaNav btnb" ></div>
                <div className="barritaNav btnc" ></div>
            </div>
            <div className={display ? "containerNavList" : "activeDiv"} id="divIdList">
                <div className="divListasMobile">
                    <div >
                        <div onClick={() => divChange("a")} className="mlP">Pepito</div>
                        {display1 === "a" ? <div className="containermlH">
                            <div className="mlH">Mi Perfil</div>
                            <div className="mlH">Logout</div>
                        </div> : null}
                    </div>
                    <div>
                        <Link rel="stylesheet" to="/PanelControlStudent">
                            <div className="mlP" onClick={() => setDisplay(!display)} >Alumnos</div>
                        </Link>
                    </div>
                    <div >
                        <Link rel="stylesheet" to="/Cohortes">
                            <div className="mlP" onClick={() => setDisplay(!display)}>Cohortes</div></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav