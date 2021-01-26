import { GET_USERS, POST_USER, DEL_USER, PUT_USERS, GET_USERS_BY_COHORTE } from "../Constants/Users";

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
    case POST_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
    case GET_USERS_BY_COHORTE:
      return {...state, users: action.payload}
  }
}

export default Users;
