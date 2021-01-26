import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
   
  } from "../Constants/Auth";
  
import clienteAxios from '../../config/axios';


export function loginAction(credentials:Object) {
    return async function (dispatch:any) {
        
        try {
            const response = await clienteAxios.post("/auth", credentials)
            console.log(response.data)
            dispatch(loginUser(response.data))
           
        } catch (error) {
            console.log(error);
            dispatch(loginError(error ))
        }

    };
}

// login exitoso
const loginUser = (data:any) => (
    { type:  LOGIN_SUCCESS, payload: data }
)

// si hubo un error en login
const loginError = (err:any) => ({
    type: LOGIN_ERROR,
    payload: err
});