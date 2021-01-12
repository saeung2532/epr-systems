import { combineReducers } from "redux";
import loginReducer from "./login.reducer"
import companyReducer from "./company.reducer"

export default combineReducers({
  loginReducer,
  companyReducer,
});



