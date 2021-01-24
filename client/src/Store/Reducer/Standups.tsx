import {
  GET_STANDUPS,
  PUT_STANDUPS,
  POST_STANDUP,
  DEL_STANDUP,
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
  }
  return state;
}

export default Standups;
