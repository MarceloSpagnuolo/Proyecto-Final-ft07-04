import axios from "axios";
import { GET_USERS, POST_USER, PUT_USERS, DEL_USER, GET_USERS_BY_COHORTE, ERROR_MESSAGE } from "../Constants/Users";

const url = "http://localhost:3001"

export const getUsersbyCohorte = (id: any) => async (dispatch: any) => {
    try {
      const res = await axios.get(`${url}/users/cohorte/${id}`, );
      dispatch({
        type: GET_USERS_BY_COHORTE,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: ERROR_MESSAGE,
        message: 'Problemas para crear el usuario',
      });
    }
  };