
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
  USERS_GROUP,
  SEARCH_BY_NAME,
  ERROR_MESSAGE,
} from "../Constants/Users";
import Swal from "sweetalert2";

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
        users: action.payload,
      };
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
    case GET_USER_BY_TOKEN:
      return { ...state, user: action.payload };

    case GET_USERS_BY_COHORTE:
      return { ...state, users: action.payload };
    case DELETE_USER_COHORTE:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload._id),
      };
    case MIGRAR_USER_COHORTE:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload._id),
      };
    case SEARCH_BY_NAME:
      return {
        ...state,
        users: action.payload
      }
    case ERROR_MESSAGE: {
      Swal.fire(
        "Error",
        action.message,
        "error"
      );
      return state;
    };
    default: {
      return state;
    }
  }
}

export default Users;
