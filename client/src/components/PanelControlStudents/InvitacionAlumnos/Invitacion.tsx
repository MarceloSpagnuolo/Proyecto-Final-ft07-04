import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Invitacion.css';
import { sendInvitation } from '../../../Store/Actions/Users';
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import grupoEstudiantes from '../../../assets/grupo-estudiantes.png'
import { getActiveCohortes } from 'Store/Actions/Cohortes';

const URL = "http://localhost:3001";

interface inv {
    file?: any;
    email?: string;
    msj?: string;
    cohorte?: any;
}

const Invitacion = (): JSX.Element => {

    const dispatch = useDispatch();
    const [invitation, setInvi] = useState<inv>({})
    const { cohortes } = useSelector((state: any) => state.Cohortes);

    useEffect(() => {
        dispatch(getActiveCohortes(true));
    },[])

    const handleOnChange = (e: any) => {
        let hojas: any = [];
        if (e.target.name !== "file") {
                if (e.target.value) {
                setInvi({
                    ...invitation,
                    [e.target.name]: e.target.value,
                })
            }
        } else {
            let reader = new FileReader();  //instanciamos nuevo archivo a leer
            reader.readAsArrayBuffer(e.target.files[0]) //se lee el archivo
            reader.onloadend = async (resOfRead: any) => {  //cuando termina de leerlo
                var data = new Uint8Array(resOfRead.target.result); //codificamos el result
                var excel = XLSX.read(data, { type: 'array' }); //leemos el archivo codificado
                excel.SheetNames.forEach((pagina: any) => { //si es un excel con mas de una hoja lo mapeamos
                    var parseoHojas = XLSX.utils.sheet_to_json(excel.Sheets[pagina]);//parseamos a JSON
                    hojas.push({    //pusheamos al array
                        data: parseoHojas,
                        pagina  //nombre de la hoja
                    })
                })
            }
            setInvi({
                ...invitation,
                [e.target.name]: hojas,

            })
        }
    }

    function handleSubmit(): any {
        if ((invitation.file ||  invitation.email) && invitation.cohorte) {
            dispatch(sendInvitation(invitation))
            Swal.fire(
                "Listo",
                "Sus emails han sido enviados con éxito",
                "success"
            )
        } else {
            Swal.fire(
                "Error",
                "Por favor, debe ingresar un email y el cohorte",
                "error"
            )
        }
    }

    return (
        <div id="super-invitation">
            <h1>Invita nuevos alumnos</h1>
            <div className="container-invitation-students">
                <div id='fondonegro-invitacion'>
                    <table id='tabla-panel-control'>
                        <thead>
                            <p id='texto-sube-lista'>Si tienes una lista de estudiantes en un archivo de Excel puedes añadirla </p>
                            <input name="file" type="file" id="file" onChange={(e) => handleOnChange(e)} accept=".xlsx, .xls" />
                            <a id='link-template' href={`${URL}/template.xlsx`} download>Descargar Plantilla</a>
                            <p> o si prefieres agregar uno a uno tambien puedes hacerlo </p>
                            <input name="email" type="email" placeholder="    correo@nuevo.alumno" id="invita-por-email"
                                onChange={(e) => handleOnChange(e)} />
                            <p>Deberás indicar el cohorte al cual estás haciendo la invitación</p>
                            <select name="cohorte" onChange={(e) => handleOnChange(e)}>
                                <option value="">Seleccione un Cohorte</option>
                                {cohortes && cohortes.length > 0 &&
                                    cohortes.map((coho: any) => (
                                    <option value={coho._id}>{coho.Nombre+" - Inicio: "+coho.Start}</option>))}
                            </select>
                        </thead>
                        <tbody>
                            <tr>
                                <input name="msj" type="text" id="mensaje-invitacion" placeholder="    Mensaje de invitación."
                                    onChange={(e) => handleOnChange(e)} />
                            </tr>
                        </tbody>
                    </table>
                    <button id='enviar-invitacion' onClick={() => handleSubmit()}>Enviar Invitación</button>
                </div>

                <div>
                    <img id='imagen-invitacion-estudiantes' src={grupoEstudiantes}></img>
                </div>

            </div>            
        </div>
    )
}

export default Invitacion;