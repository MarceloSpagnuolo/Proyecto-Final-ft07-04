import { GET_STUDENTS, ERROR_MESSAGE } from "../Constants/Users";
import axios from 'axios';
import { uploadAction } from "../../components/PanelControlStudents/InvitacionAlumnos/actionUpdate";

const URL: string = 'http://localhost:3001';

export const sendInvitation = (payload: any) => async (dispatch: any) => {
    try {
        if (payload.file) {
            const upFile: any = await uploadAction(payload);
            const res: any = await axios.post(`${URL}/mails`, upFile)
        } else {
            const res: any = await axios.post(`${URL}/mails`, payload)
        }
    }
    catch (e) {
        dispatch({
            type: ERROR_MESSAGE,
            payload: "Error al invitar alumnos"
        })
    }
}


export const getStudents = () => async (dispatch: any) => {
    try {
        const res: any = await axios.get(`${URL}/users/estudiantes`);
        dispatch({
            type: GET_STUDENTS,
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: ERROR_MESSAGE,
            payload: "Error al traer alumnos"
        })
    }
}
