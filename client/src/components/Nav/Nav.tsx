import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
                    {useLocation().pathname !== "/" ?
                    <>
                    <div >
                        <div onClick={() => divChange("a")} className="mlP">Pepito</div>
                    {display1 === "a" ? <div className="containermlH">
                            <div className="mlH">Mi Perfil</div>
                            <div className="mlH">Logout</div>
                        </div> : null}
                    </div>
                    <div>
                        <div onClick={() => divChange("b")} className="mlP">Alumnos</div>
                        {display1 === "b" ? <div className="containermlH">
                            <div className="mlH">Invitaciones</div>
                            <div className="mlH">Gestión de Alumnos</div>
                        </div> : null}
                    </div>
                    <div >
                        <div onClick={() => divChange("c")} className="mlP">Cohortes</div>
                        {display1 === "c" ? <div className="containermlH">
                            <div className="mlH">Gestión de Cohortes</div>
                            <div className="mlH">Gestión de Grupos</div>
                        </div> : null}
                    </div>
                    </>
                    : null}
                </div>
            </div>
        </div>
    )
}

export default Nav