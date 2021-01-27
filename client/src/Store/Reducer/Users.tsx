import { GET_USERS, POST_USER, DEL_USER, PUT_USERS, GET_USERS_BY_COHORTE,GET_USER_BY_TOKEN } from "../Constants/Users";

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
    case GET_USERS_BY_COHORTE:
      return {...state, users: action.payload}

    case GET_USER_BY_TOKEN:
      return {...state, user: action.payload}  
  }
  return state;
}

export default Users;
