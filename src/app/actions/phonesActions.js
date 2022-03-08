import {
  PHONES_FETCH_START,
  PHONES_FETCH_SUCCESS,
  PHONES_FETCH_FAIL,
} from "../actions/actionTypes";
import axios from "axios";

import db from "../helpers/db.json";

export const getPhones = (dispatch) => {
  dispatch({ type: PHONES_FETCH_START });
  dispatch({ type: PHONES_FETCH_SUCCESS, payload: db.phones })
  // axios
  //   .get(phonesURL)
  //   .then((res) => dispatch({ type: PHONES_FETCH_SUCCESS, payload: res.data }))
  //   .catch((err) => dispatch({ type: PHONES_FETCH_FAIL, payload: err }));
};
