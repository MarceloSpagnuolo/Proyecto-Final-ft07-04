
import { DefaultRootState } from "react-redux";
import {
  GET_USERS,
  POST_USER,
  DEL_USER,
  PUT_USERS,
  GET_USERS_BY_COHORTE,
  DELETE_USER_COHORTE,
  MIGRAR_USER_COHORTE,
  GET_USER_BY_TOKEN,
  GET_STUDENTS,
  USERS_GROUP
} from "../Constants/Users";

interface Store {
  user: Object;
  users: Array<any>  ;
}

const inicialState: Store = {
  user: {},
  users: [],
};

function Users(state = inicialState, action: any) {
  switch (action.type) {
    case GET_STUDENTS: {
      return {
        ...state,
        users: action.payload
      }
    }
    case USERS_GROUP: {
      return {
        ...state,
        users: action.payload
      }
    }
    case POST_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
    case GET_USER_BY_TOKEN:
      return { ...state, user: action.payload }

    case GET_USERS_BY_COHORTE:
      return { ...state, users: action.payload };
    case DELETE_USER_COHORTE:
      return {
        ...state,
        users: state.users.map((us) => {
          if (us._id === action.payload._id) {
            return action.payload;
          } else {
            return us;
          }
        }),
      };
    case MIGRAR_USER_COHORTE:
      return {
        ...state,
        users: state.users.map((us) => {
          if (us._id === action.payload._id) {
            return action.payload;
          } else {
            return us;
          }
        }),
      };

  }
}

export default Users;
