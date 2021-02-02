import axios from "axios";
import jwt from 'jsonwebtoken';
import { uploadAction } from "../../components/PanelControlStudents/InvitacionAlumnos/actionUpdate";
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
  GET_STUDENTS,
  UPDATE_USER_PASSWORD,
  GET_USER_EDIT,
} from "../Constants/Users";

const url = "http://localhost:3001";

  
export const sendInvitation = (payload: any) => async (dispatch: any) => {
    try {
        if (payload.file) {
            const upFile: any = await uploadAction(payload);
            const res: any = await axios.post(`${url}/mails`, upFile)
        } else {
            const res: any = await axios.post(`${url}/mails`, payload)
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
        const res: any = await axios.get(`${url}/users/estudiantes`);
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
  
  
  
export const postUser = (payload: any) => async (dispatch: any) => {
  try {
    const res = await axios.post(`${url}/users/register`, payload);
    if(res){
      const {email,password} = payload;
      const datos = {email,password};
      const newToken = await axios.post(`${url}/auth/login`, datos);
      if(newToken){
        localStorage.setItem('userToken', newToken.data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken.data}`;
      }
    }
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
    try {
      localStorage.setItem('userToken', payload);
      axios.defaults.headers.common['Authorization'] = `Bearer ${payload}`;
      const usuario = jwt.decode(payload);
      //console.log(usuario ,"soy el accion");
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

export const updatePassword = (data:Object) => async (dispatch: any) => {
  try {
    const res = await axios.put(`${url}/users/change_password`, data);
    dispatch({
      type: UPDATE_USER_PASSWORD,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Hubo un problema al intentar actualizar la contraseña",
    });
  }
};

//obtener datos para el perfil de un usuario

export const getUsereEdit = (id:string) => async (dispatch: any) => {
  
  try {
    const res = await axios.get(`${url}/users/${id}`);
    await dispatch({
      type: GET_USER_EDIT,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Hubo un problema al obtener el usuario para editar",
    });
  }
};


//oactualizar usuario

export const updateUser = (data:Object) => async (dispatch: any) => {
  
  console.log(data)
  try {
    const res = await axios.put(`${url}/users/modify/${1}`,data);
    await dispatch({
      type: PUT_USERS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Hubo un problema al actualizar el usuario",
    });
  }
};




