import Swal from "sweetalert2";
import {
  GET_STANDUPS,
  PUT_STANDUPS,
  POST_STANDUP,
  DEL_STANDUP,
  ERROR_MESSAGE,
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
