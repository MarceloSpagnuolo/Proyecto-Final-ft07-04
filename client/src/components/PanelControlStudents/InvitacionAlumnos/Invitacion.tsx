import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Invitacion.css';
import { sendInvitation } from '../../../Store/Actions/Users';
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

interface inv {
    file?: any;
    email?: string;
    msj?: string;
}

const Invitacion = (): JSX.Element => {

    const dispatch = useDispatch();
    const [invitation, setInvi] = useState<inv>({})

    const handleOnChange = (e: any) => {
        let hojas: any = [];
        if (e.target.name !== "file") {
            setInvi({
                ...invitation,
                [e.target.name]: e.target.value,
            })
        } else {
            let reader = new FileReader();
            reader.readAsArrayBuffer(e.target.files[0])
            reader.onloadend = async (resOfRead: any) => {
                var data = new Uint8Array(resOfRead.target.result); //codificamos el result
                var excel = XLSX.read(data, { type: 'array' }); //leemos el archivo codificado  cuidado que se genera un bucle y se rompe todo
                 excel.SheetNames.forEach((sheetName: any) => {
                     var parseoHojas = XLSX.utils.sheet_to_json(excel.Sheets[sheetName]);
                     hojas.push({
                         data: parseoHojas,
                         sheetName
                     })
                 })
                console.log(hojas[0].data, "soy las hojas")
            }
            setInvi({
                ...invitation,
                [e.target.name]: e.target.files[0],

            })

        }

    }

    function handleSubmit(): any {
        if (invitation.file || invitation.email) {
            dispatch(sendInvitation(invitation))
            Swal.fire(
                "Listo",
                "Sus emails han sido enviados con éxito",
                "success"
            )
        } else {
            Swal.fire(
                "Error",
                "Por favor, debe ingresar un email",
                "error"
            )
        }

    }

    return (
        <div id="super-invitation">

            <h1>Invita nuevos alumnos</h1>
            <div className="container-invitation-students">
                <div>
                    <table>
                        <thead>
                            <tr id="recibe">
                                <input name="file" type="file" id="file" onChange={(e) => handleOnChange(e)} accept="png jpg jpeg gif xlsx" />
                                <input name="email" type="email" placeholder="correo@nuevo.alumno" id="email"
                                    onChange={(e) => handleOnChange(e)} />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <input name="msj" type="text" id="cuerpo" placeholder=" Mensaje de invitación."
                                    onChange={(e) => handleOnChange(e)} />
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="submit">
                    <input type="submit" onClick={() => handleSubmit()} />
                </div>
            </div>
        </div>
    )
}

export default Invitacion;