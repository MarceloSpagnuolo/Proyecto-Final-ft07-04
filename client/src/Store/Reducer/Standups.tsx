import Swal from "sweetalert2";
import {
  GET_STANDUPS,
  POST_PM,
  GET_ONE_STANDUP,
  POST_STANDUP,
  DEL_STANDUP,
  ERROR_MESSAGE,
  GET_STANDUP_BY_USER,
} from "../Constants/Standups";

interface Store {
  standup: Object;
  standups: Array<any>;
}

const inicialState: Store = {
  standup: {},
  standups: [],
};

function Standups(state = inicialState, action: any) {
  switch (action.type) {
    case GET_STANDUPS: {
      return {
        standups: action.payload,
      }
    }
    case GET_ONE_STANDUP: {
      return {
        standup: action.payload
      }
    }
    case POST_PM: {
      return {
        standup: action.payload
      }
    }
    case POST_STANDUP: {
      return {
        ...state,
        standups: state.standups.concat(action.payload)
      }
    }
    case DEL_STANDUP: {
      return {
        ...state,
        standups: state.standups.filter((s) => s._id !== action.payload._id)
      }
    }
    case GET_STANDUP_BY_USER: {
      return {
        ...state,
        standup: action.payload
      }
    }
    case ERROR_MESSAGE: {
      Swal.fire(
        "Error",
        action.message,
        "error"
      );
      return state;
    }
    default: {
      return state;
    }
  }
}

export default Standups;
