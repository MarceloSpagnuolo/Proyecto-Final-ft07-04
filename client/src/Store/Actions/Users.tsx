import axios from "axios";
import jwt from 'jsonwebtoken';
import {
  GET_USERS,
  POST_USER,
  PUT_USERS,
  DEL_USER,
  GET_USERS_BY_COHORTE,
  ERROR_MESSAGE,
  DELETE_USER_COHORTE,
  MIGRAR_USER_COHORTE,
  GET_USER_BY_TOKEN, 
} from "../Constants/Users";

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

export const deleteUserCohorte = (id: any) => async (dispatch: any) => {
  try {
    const res = await axios.delete(`${url}/users/cohorte/${id}`);
    dispatch({
      type: DELETE_USER_COHORTE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para crear el usuario",
    });
  }
};

export const migrarUserCohorte = (id: any, cohorteName: string) => async (dispatch: any) => {
  try {
    const res = await axios.put(`${url}/users/cohorte/${id}`, {cohorteName});
    dispatch({
      type: MIGRAR_USER_COHORTE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para crear el usuario",
    });
  }
};

