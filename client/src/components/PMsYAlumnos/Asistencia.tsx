import React, { useEffect} from "react";
import "./Asistencia.css";
import { useDispatch, useSelector } from "react-redux";
import { } from "../../Store/Actions/Users";
import { } from "../../Store/Actions/Cohortes";



function Asistencia(props: any) {
    const dispatch = useDispatch();   
    const alumnos: any = useSelector((state: any) => state.Users.users);
    const Grupo: any = useSelector((state: any) => state.Standups.standup);
  
    return (
        <div>Hola</div>
    );
  }
  
  export default Asistencia;