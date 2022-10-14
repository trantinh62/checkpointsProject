import { combineReducers } from "redux";

import userLogin from "./userLogin";

const allReducers = combineReducers({
  userLogin,
});

export default allReducers;
