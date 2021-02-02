import { Link, Redirect } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByToken } from "Store/Actions/Users";
import { useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const [display1, setDisplay1] = useState<string>("");
  const dispatch = useDispatch();
  const user: any = useSelector((state: any) => state.Users.user);
  const location = useLocation();

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
    localStorage.removeItem("userToken");
    window.location.href = "/";
  }
  function linkTo(string: string): void {
    window.location.href = `/${string}`
  }

  return (
    <div className="pruebaNav">
      <Link to="/home">
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
      {location.pathname !== "/" && !location.pathname.includes("registro") ? (
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
                  {user.name && user.name.firstname}
                </div>
                {display1 === "a" ? (
                  <div className="containermlH">
                   <Link to="/profile/miPerfil" style={{ textDecoration: 'none' }}><div className="mlH"> Mi Perfil</div></Link>
                    <div className="mlH" onClick={LogOut}>
                      Logout
                    </div>
                  </div>
                ) : null}
              </div>
              <div>
                <div onClick={() => linkTo("PanelControlStudent")} className="mlP">
                  Alumnos
                </div>
              </div>
              <div>
                <div onClick={() => linkTo("cohortes")} className="mlP">
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
