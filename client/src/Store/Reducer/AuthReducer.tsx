import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
  } from "../Constants/Auth";
  
  interface Auth {
    token: any;
    isAuthenticated: boolean;
    user:Array<any>;
    msg:string
  }
  
  const inicialState: Auth = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user:[],
    msg:''
  };
  
  function Auth(state = inicialState, action: any) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated:action.payload.isLogged,
                user: action.payload.user, 
                msg:null
            }
        
        case LOGIN_ERROR:
            return {
                ...state,
                token:null,
                msg:action.payload.message
            }

        default:
            return state;
    }


    
  }
  
  export default Auth;
  