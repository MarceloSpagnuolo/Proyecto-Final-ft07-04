import { Link, Redirect } from 'react-router-dom';
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByToken } from "Store/Actions/Users";
import { useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const [display1, setDisplay1] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(getUserByToken(token));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function change() {
    setDisplay(!display);
  }
  function divChange(a: string) {
    if (a === display1) {
      setDisplay1("");
      return;
    }

    setDisplay1(a);
    return;
  }

  function LogOut(): void {
    localStorage.removeItem("userToken")
    window.location.href = "/"
  }

  return (
    <div className="pruebaNav">
      <Link to="/home" >
        <img
          className="logo"
          alt=""
          src="https://cdn.discordapp.com/attachments/764979688446885898/802330293691482143/HM-BLANCO.png"
        />
      </Link>
      <img
        className="nombre"
        alt=""
        src="https://cdn.discordapp.com/attachments/764979688446885898/802016303111602226/hm.png"
      />
      {useLocation().pathname !== "/" ? (
        <>
          <div
            className={display ? "btnNavbar x" : "btnNavbar"}
            onClick={() => change()}
          >
            <div className="barritaNav btna"></div>
            <div className="barritaNav btnb"></div>
            <div className="barritaNav btnc"></div>
          </div>
          <div
            className={display ? "containerNavList" : "activeDiv"}
            id="divIdList"
          >
            <div className="divListasMobile">
              <div>
                <div onClick={() => divChange("a")} className="mlP">
                  Pepito
                </div>
                {display1 === "a" ? (
                  <div className="containermlH">
                    <div className="mlH">Mi Perfil</div>
                    <div className="mlH" onClick={LogOut} >Logout</div>
                  </div>
                ) : null}
              </div>
              <div>
                <div onClick={() => divChange("b")} className="mlP">
                  Alumnos
                </div>
              </div>
              <div>
                <div onClick={() => divChange("c")} className="mlP">
                  Cohortes
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Nav;
