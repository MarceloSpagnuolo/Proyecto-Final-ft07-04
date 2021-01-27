import axios from "axios";


import {
  POST_COHORTE,
  DEL_COHORTE,
  GET_COHORTES,
  PUT_COHORTES,
  ERROR_MESSAGE
} from "../Constants/Cohortes";

const url = "http://localhost:3001";

export const getCohortesActivos = () => async (dispatch: any) => {
  const res = await axios.get(`${url}`);
};

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
      message: 'Problemas para taer los cohortes',
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
      message: 'Problemas para crear el cohorte',
    });
  }
};
