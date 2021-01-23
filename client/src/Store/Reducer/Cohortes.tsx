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
  }
  return state;
}

export default Cohortes;
