import { ERROR_MESSAGE } from "Store/Constants/Users";
import {
  GET_COHORTES,
  POST_COHORTE,
  DEL_COHORTE,
  PUT_COHORTES,
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
    return {...state, cohortes: action.payload}
    case POST_COHORTE:
      return {
        ...state,
        cohortes: state.cohortes.concat(action.payload),
      };
    case ERROR_MESSAGE: {
      alert(action.message);
    }
  }
  return state;
}

export default Cohortes;
