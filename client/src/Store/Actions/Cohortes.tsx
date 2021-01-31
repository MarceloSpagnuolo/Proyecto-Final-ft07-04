import axios from "axios";

import {
  POST_COHORTE,
  DEL_COHORTE,
  GET_COHORTES,
  PUT_COHORTES,
  ERROR_MESSAGE,
  GET_ACTIVE_COHORTES,
  GET_COHORTE,
  PUT_INSTRUCTOR,
} from "../Constants/Cohortes";

const url = "http://localhost:3001";

export const getCohortes = () => async (dispatch: any) => {
  try {
    const res = await axios.get(`${url}/cohorte`);
    dispatch({
      type: GET_COHORTES,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para taer los cohortes",
    });
  }
};

export const postCohorte = (payload: any) => async (dispatch: any) => {
  try {
    const res = await axios.post(`${url}/cohorte`, payload);
    dispatch({
      type: POST_COHORTE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para crear el cohorte",
    });
  }
};

//Action que busque cohortes activos o no, recibe un booleano
export const getActiveCohortes = (payload: Boolean) => async (dispatch: any) => {
  try {
    const res = await axios.get(`${url}/cohorte/active/${payload}`);
    dispatch({
      type: GET_ACTIVE_COHORTES,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas con los cohortes",
    });
  }
};

export const getCohorte = (id: any) => async (dispatch: any) => {
  try {
    const res = await axios.get(`${url}/cohorte/${id}`);
    dispatch({
      type: GET_COHORTE,
      payload: res.data,
    });
  } catch(e) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: "Cohorte no encontrado",
    });
  };
};

export const putInstructor = (cohorteId: any, instructorId: any) => async (dispatch: any) => {
  try {
    const res = await axios.put(`${url}/cohorte/${cohorteId}`, {Instructor: instructorId});
    dispatch({
      type: PUT_INSTRUCTOR,
      payload: res.data
    })
  } catch(e) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: "Error al asignar instructor",
    });
  };
};