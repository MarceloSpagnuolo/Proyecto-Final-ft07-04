
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
  UPDATE_USER_PASSWORD,
  ERROR_MESSAGE,
  GET_USER_EDIT,
} from "../Constants/Users";

interface Store {
  user: Object;
  users: Array<any>;
  msg:string;
  userToEdit:Object
}

const inicialState: Store = {
  user: {},
  users: [],
  msg:'',
  userToEdit:{}
};

function Users(state = inicialState, action: any) {
  switch (action.type) {
    case GET_STUDENTS: {
      return {
        ...state,
        users: action.payload
      }
    }
    case POST_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
    case GET_USER_BY_TOKEN:
      return { ...state, user: action.payload }

    case GET_USERS_BY_COHORTE:
      return { ...state, users: action.payload };
    case DELETE_USER_COHORTE:
      return {
        ...state,
        users: state.users.map((us) => {
          if (us._id === action.payload._id) {
            return action.payload;
          } else {
            return us;
          }
        }),
      };
    
      case UPDATE_USER_PASSWORD:
      return {
        ...state,
        msg: action.payload
      };
      case ERROR_MESSAGE:
        return {
          ...state,
          msg: action.payload
      };
      case GET_USER_EDIT:
        return {
          ...state,
          userToEdit: action.payload
      };
      case PUT_USERS:
        return {
          ...state,
      };
  }
}

export default Users;
