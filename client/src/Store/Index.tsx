import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Standups from "./Reducer/Standups";
import Cohortes from "./Reducer/Cohortes";
import Users from "./Reducer/Users";
import Auth from "./Reducer/AuthReducer";
import thunk from "redux-thunk";

export default createStore(
  combineReducers({ Standups, Cohortes, Users,Auth }),
  composeWithDevTools(applyMiddleware(thunk))
);
