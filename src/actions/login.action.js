import {
  HTTP_LOGIN_SUCCESS,
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_FAILED,
  HTTP_LOGIN_LOGOUT,
} from "../constants";
import { server } from "../constants";
import { httpClient } from "./../utils/HttpClient";
import jwt from "jsonwebtoken";
import { useSelector } from "react-redux";

// const loginReducer = useSelector(({ loginReducer }) => loginReducer);

// Information being sent to Reducer
export const setLoginStateToFetching = () => ({
  type: HTTP_LOGIN_FETCHING,
});

export const setLoginStateToFailed = () => ({
  type: HTTP_LOGIN_FAILED,
});

export const setLoginStateToSuccess = (payload) => ({
  type: HTTP_LOGIN_SUCCESS,
  payload,
});

export const setLoginStateToLogout = () => ({
  type: HTTP_LOGIN_LOGOUT,
});

// Called by Login Component

// export const login = (value, history) => {
//   return async dispatch => {
//     try {
//       dispatch(setLoginStateToFetching()); // fetching
//       let result = await httpClient.post(server.HTTP_LOGIN_URL, value);
//       // console.log(JSON.stringify(result));
//       if (result.data.result == "ok") {
//         localStorage.setItem(server.TOKEN_KEY, result.data.token);
//         localStorage.setItem(
//           server.REFRESH_TOKEN_KEY,
//           result.data.refreshToken
//         );
//         dispatch(setLoginStateToSuccess(result));
//         history.push("/pr_stock");
//       } else {
//         dispatch(setLoginStateToFailed());
//       }
//     } catch (err) {
//       alert(JSON.stringify(err));
//       dispatch(setLoginStateToFailed());
//     }
//   };
// };
export const login = (value, history) => {
  return async (dispatch) => {
    dispatch(setLoginStateToFetching()); // fetching
    doGetLogins(dispatch, value, history);
  };
};

const doGetLogins = async (dispatch, value, history) => {
  try {
    let result = await httpClient.post(server.HTTP_LOGIN_URL, value);
    // console.log(JSON.stringify(result));
    if (result.data.result === "ok") {
      localStorage.setItem(server.TOKEN_KEY, result.data.token);
      localStorage.setItem(server.REFRESH_TOKEN_KEY, result.data.refreshToken);
      dispatch(setLoginStateToSuccess(result));
      history.push("/");
    } else {
      dispatch(setLoginStateToFailed());
    }
  } catch (err) {
    alert(JSON.stringify(err));
    dispatch(setLoginStateToFailed());
  }
};

export const logout = (history) => {
  return (dispatch) => {
    console.log(history);
    localStorage.removeItem(server.TOKEN_KEY);
    dispatch(setLoginStateToLogout());
    history.push("/login");
  };
};

// export const isLoggedIn = () => {
//   return true;
// };

export const isLoggedIn = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    // console.log("getToken: " + token);
    if (token) {
      var decodedToken = jwt.decode(token, { complete: true });
      var dateNow = new Date();
      // console.log("decodedToken: " + JSON.stringify(decodedToken));
      // console.log(decodedToken.payload.exp + " : " + dateNow.getTime());
      if (decodedToken.payload.exp < decodedToken.payload.exp) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const getTokenCompany = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload.role;
  } catch (e) {
    return false;
  }
};

export const getTokenUsername = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload.aud;
  } catch (e) {
    return false;
  }
};
