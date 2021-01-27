import axios from "axios";
import { GET_USERS, POST_USER, PUT_USERS, DEL_USER, GET_USERS_BY_COHORTE, ERROR_MESSAGE,GET_USER_BY_TOKEN } from "../Constants/Users";
import jwt from 'jsonwebtoken';

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


  export const getUserByToken = (payload:any) => async (dispatch:any) => {
    console.log(payload)
    try {
      localStorage.setItem('userToken', payload);
     
      axios.defaults.headers.common['Authorization'] = `Bearer ${payload}`;
      const usuario = jwt.decode(payload);
      console.log(usuario)
      dispatch({
        type: GET_USER_BY_TOKEN,
        payload: usuario,
      });
    } catch (e) {
      dispatch({
        type: ERROR_MESSAGE,
        message: 'No se encuentra el usuario',
      });
    }
  };