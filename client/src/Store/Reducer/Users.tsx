import { GET_USERS, POST_USER, DEL_USER, PUT_USERS, GET_STUDENTS } from "../Constants/Users";

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
        users: action.payload
      }
    }
  }
  return state;
}

export default Users;
