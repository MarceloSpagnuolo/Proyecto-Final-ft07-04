import { SEND_INVITATION } from "../Constants/Users";
import axios from 'axios';

const URL: string = 'http://localhost:3001';

export const sendInvitation = (payload: object) => async (dispatch: any) => {
    try {
        const res: any = await axios.post(`${URL}/mails`, payload)
        console.log(res.data, "soy la action")
        dispatch({ type: SEND_INVITATION, payload: res.data })
    }
    catch (e) {
        console.log(e);
    }
}
