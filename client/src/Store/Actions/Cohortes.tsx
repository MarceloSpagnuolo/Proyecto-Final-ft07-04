import axios from "axios";

import {
  POST_COHORTE,
  DEL_COHORTE,
  GET_COHORTES,
  PUT_COHORTES,
} from "../Constants/Cohortes";

const url = "http://localhost:3001/";

export const getCohortesActivos = () => async (dispatch: any) => {
  const res = await axios.get(`${url}`);
};
