import {
  GET_STANDUPS,
  GET_ONE_STANDUP,
  DEL_STANDUP,
  POST_STANDUP,
  POST_PM,
  PUT_STANDUPS,
  ERROR_MESSAGE,
  GET_STANDUP_BY_USER,
} from "../Constants/Standups";
import axios from "axios";


const url = "http://localhost:3001";


export const getStandups = () => async (dispatch: any) => {
  try {
    const res = await axios.get(`${url}/standup`,);
    dispatch({
      type: GET_STANDUPS,
      payload: res.data,
    });
  }
  catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: "Error al traer grupos"
    })
  }
}
export const postPm = (payload: any) => async (dispatch: any) => {
  try {
    const res = await axios.post(`${url}/standup/PM`, payload);
    dispatch({
      type: POST_PM,
      payload: res.data,
    });
  }
  catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: "Error al postear PM"
    })
  }
}
//GET_ONE_STANDUP
export const getOneStandups = (id:any) => async (dispatch: any) => {
  try {
    const res = await axios.get(`${url}/standup/${id}`,);
    dispatch({
      type: GET_ONE_STANDUP,
      payload: res.data,
    });
  }
  catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: "Error al traer grupos"
    })
  }
}

export const getStandupsByCohorte = (id: any) => async (dispatch: any) => {
  try {
    const res = await axios.get(`${url}/standup/byCohorte/${id}`, );
    dispatch({
      type: GET_STANDUPS,
      payload: res.data,
    });
  }
  catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: "Error al traer grupos"
    })
  }
}

export const postStandup = (payload: any) => async (dispatch: any) => {
  try {
    const res = await axios.post(`${url}/standup`, payload);
    dispatch({
      type: POST_STANDUP,
      payload: res.data,
    });
  }
  catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: "Error al crear grupo"
    })
  }
}

//DEL_STANDUP
export const delStandup = (id: any) => async (dispatch: any) => {
  try {
    const res = await axios.delete(`${url}/standup/${id}`,);
    dispatch({
      type: DEL_STANDUP,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: "Error al eliminar grupo"
    })
  }
}

export const getStadupByUser = (pmId: any) => async (dispatch: any) => {
  try {
    const res = await axios.get(`${url}/standup/search/${pmId}`);
    dispatch({
      type: GET_STANDUP_BY_USER,
      payload: res.data
    })
  } catch(e) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: "No se encontró el standup"
    })
  }
}