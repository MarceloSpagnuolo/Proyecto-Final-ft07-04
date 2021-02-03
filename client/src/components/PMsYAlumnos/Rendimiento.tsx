import React, { useEffect,
    //  useState
     } from "react";
import "./MiCohorte.css";
import { 
    // useDispatch,
     useSelector } from "react-redux";

function Rendimiento(props: any) {
//   const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.Users);
//   const { cohorte } = useSelector((state: any) => state.Cohortes);
  const { id } = props.match.params;

  useEffect(() => {
    if(user._id && user._id !== id) {
      window.location.href = "/home"
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);


  return (
  <>
      <div>SOY LAS NOTAS DEL ALUMNO</div>
        </>
  )}

  export default Rendimiento;