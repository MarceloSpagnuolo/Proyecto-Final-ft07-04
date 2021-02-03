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
  SEARCH_BY_NAME,
  ERROR_MESSAGE,
  PUT_NOTAS,
} from "../Constants/Users";
import Swal from "sweetalert2";
import { EMFILE } from "constants";

interface Store {
  user: Object;
  users: Array<any>;
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
      console.log("ENTRE AL REDUCER");
      return {
        ...state,
        users: action.payload,
      };
    case PUT_NOTAS: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.historia._id === action.payload._id) {
            user.historia = action.payload;
            return user;
          } else {
            return user;
          }
        }),
      };
    }
    case ERROR_MESSAGE: {
      Swal.fire("Error", action.message, "error");
      return state;
    }
    default: {
      return state;
    }
  }
}

export default Users;
