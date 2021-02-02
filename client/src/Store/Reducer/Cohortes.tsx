import Swal from "sweetalert2";
import { ERROR_MESSAGE } from "Store/Constants/Users";
import {
  GET_COHORTES,
  POST_COHORTE,
  DEL_COHORTE,
  PUT_COHORTES,
  GET_ACTIVE_COHORTES,
  GET_COHORTE,
  PUT_INSTRUCTOR,
} from "../Constants/Cohortes";

interface Store {
  cohorte: Object;
  cohortes: Array<any>;
}

const inicialState: Store = {
  cohorte: {},
  cohortes: [],
};

function Cohortes(state = inicialState, action: any) {
  switch (action.type) {
    case GET_COHORTES:
      return { ...state, cohortes: action.payload };
    case POST_COHORTE:
      return {
        ...state,
        cohortes: state.cohortes.concat(action.payload),
      };
    case GET_ACTIVE_COHORTES:
      return {
        ...state,
        cohortes: Array.isArray(action.payload) ? action.payload : [action.payload],
      };
    case ERROR_MESSAGE: {
      Swal.fire(
        "Error",
        action.message,
        "error"
      )
      return { state };
    }
    case GET_COHORTE: {
      return {
        ...state,
        cohorte: action.payload,
      }
    }
    case PUT_INSTRUCTOR: {
      return {
        ...state,
        cohorte: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}

export default Cohortes;
