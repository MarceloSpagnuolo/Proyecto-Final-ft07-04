import axios from "axios";

import { GET_USERS, POST_USER, PUT_USERS, DEL_USER } from "../Constants/Users";
const ERROR_MESSAGE = "ERROR_MESSAGE";

const url = "http://localhost:3001";

export const postUser = (payload: any) => async (dispatch: any) => {
  try {
    const res = await axios.post(`${url}/users/register`, payload);
    dispatch({
      type: POST_USER,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: "Problemas al registrar el usuario",
    });
  }
};
