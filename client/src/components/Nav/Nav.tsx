import { Link} from "react-router-dom";
import React, { useState, useEffect} from "react";
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
        {/* Logica para poder cambiar entre renderizar algo o no dependiendo del usuario */}
          {(user.role === "admin" || user.role === "instructor") ? 
          
          <div
            className={display ? "containerNavList" : "activeDiv"}
            id="divIdList"
          >
            <div className="divListasMobile">
              
              <div>
                <div onClick={() => linkTo("home")} className="mlP">
                  Inicio
                </div>
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
              <div>
                <div onClick={() => linkTo("cargaNotas")} className="mlP">
                  Checkpoints
                </div>
              </div>
              <div>
                <div onClick={() => divChange("a")} className="mlP">
                  {user.name && user.name.firstname}
                </div>
                {display1 === "a" ? (
                  <div className="containermlH">
                     <div className="mlH" onClick={() => linkTo("profile/miPerfil")}> Mi Perfil</div>
                    <div className="mlH" onClick={LogOut}>
                      Logout
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div> : (user.role === "PM") ?
            // LOGICA PARA RENDERIZAR PARA EL PM
            <div
            className={display ? "containerNavList" : "activeDiv"}
            id="divIdList"
          >
            <div className="divListasMobile">
              
              <div>
                <div onClick={() => linkTo("home")} className="mlP">
                  Inicio
                </div>
              </div>
              <div>
                <div onClick={() => linkTo(`panel`)} className="mlP">
                  Mi Standup
                </div>
              </div>
              <div>
                <div onClick={() => linkTo(`MiCohorte/${user.cohorte._id}`)} className="mlP">
                  Mi Cohorte
                </div>
              </div>
              <div>
                <div onClick={() => linkTo(`MisDatos/${user._id}`)} className="mlP">
                  Rendimiento
                </div>
              </div>
              <div>
                <div onClick={() => divChange("a")} className="mlP">
                  {user.name && user.name.firstname}
                </div>
                {display1 === "a" ? (
                  <div className="containermlH">
                      <div className="mlH" onClick={() => linkTo("profile/miPerfil")}> Mi Perfil</div>
                    <div className="mlH" onClick={LogOut}>
                      Logout
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        // LOGICA PARA RENDERIZAR LO QUE VE EL ALUMNO
        : (user.role === "alumno") ? 
        <div
        className={display ? "containerNavList" : "activeDiv"}
        id="divIdList"
      >
        <div className="divListasMobile">
          
          <div>
                <div onClick={() => linkTo("home")} className="mlP">
                  Inicio
                </div>
              </div>
          <div>
            <div onClick={() => linkTo(`MiCohorte/${user.cohorte._id}`)} className="mlP">
              Mi Cohorte
            </div>
          </div>
          { user.standup ?
            <div>
            <div onClick={() => linkTo(`MiGrupo/${user.standup._id}`)} className="mlP">
              Mi Standup
            </div>
          
          </div>
            : null}
          <div>
            <div onClick={() => linkTo(`MisDatos/${user._id}`)} className="mlP">
              Rendimiento
            </div>
          </div>
          <div>
            <div onClick={() => divChange("a")} className="mlP">
              {user.name && user.name.firstname}
            </div>
            {display1 === "a" ? (
              <div className="containermlH">
                  <div className="mlH" onClick={() => linkTo("profile/miPerfil")}> Mi Perfil</div>
                <div className="mlH" onClick={LogOut}>
                  Logout
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      : null}
        </>
      ) : null}
    </div>
  );
};

export default Nav;
