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
export const setStateLoginToFetching = () => ({
  type: HTTP_LOGIN_FETCHING,
});

export const setStateLoginToFailed = (payload) => ({
  type: HTTP_LOGIN_FAILED,
  payload,
});

export const setStateLoginToSuccess = (payload) => ({
  type: HTTP_LOGIN_SUCCESS,
  payload,
});

export const setStateLoginToLogout = () => ({
  type: HTTP_LOGIN_LOGOUT,
});

// Called by Login Component

// export const login = (value, history) => {
//   return async dispatch => {
//     try {
//       dispatch(setStateLoginToFetching()); // fetching
//       let result = await httpClient.post(server.HTTP_LOGIN_URL, value);
//       // console.log(JSON.stringify(result));
//       if (result.data.result === "ok") {
//         localStorage.setItem(server.TOKEN_KEY, result.data.token);
//         localStorage.setItem(
//           server.REFRESH_TOKEN_KEY,
//           result.data.refreshToken
//         );
//         dispatch(setStateLoginToSuccess(result));
//         history.push("/pr_stock");
//       } else {
//         dispatch(setStateLoginToFailed());
//       }
//     } catch (err) {
//       alert(JSON.stringify(err));
//       dispatch(setStateLoginToFailed());
//     }
//   };
// };
export const login = (value, history) => {
  return async (dispatch) => {
    dispatch(setStateLoginToFetching()); // fetching
    doGetLogins(dispatch, value, history);
  };
};

const doGetLogins = async (dispatch, value, history) => {
  try {
    let result = await httpClient.post(server.LOGIN_URL, value);
    // console.log(JSON.stringify(result));
    if (result.data.result === "ok") {
      localStorage.setItem(server.TOKEN_KEY, result.data.token);
      localStorage.setItem(server.REFRESH_TOKEN_KEY, result.data.refreshToken);
      dispatch(setStateLoginToSuccess(result));
      history.push("/");
    } else {
      // console.log(JSON.stringify(result.data.message));
      dispatch(setStateLoginToFailed(result.data.message));
    }
  } catch (err) {
    alert(JSON.stringify(err));
    dispatch(setStateLoginToFailed());
  }
};

export const logout = (history) => {
  return (dispatch) => {
    // console.log(history);
    localStorage.removeItem(server.TOKEN_KEY);
    dispatch(setStateLoginToLogout());
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
      // console.log(decodedToken.payload.exp + " : " + dateNow.getTime().toString().substr(0,10));
      if (
        decodedToken.payload.exp <
        dateNow
          .getTime()
          .toString()
          .substr(0, 10)
      ) {
        // console.log("getToken: " + false);
        return false;
      } else {
        // console.log("getToken: " + true);
        return true;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const getTokenCono = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    var getCono = decodedToken.payload.role.toString().split(":");
    return getCono[0].trim();
  } catch (e) {
    return false;
  }
};

export const getTokenDivi = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    var getDivi = decodedToken.payload.role.toString().split(":");
    return getDivi[1].trim();
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

export const getApproveTokenCompany = () => {
  try {
    let token = localStorage.getItem(server.APPROVE_TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload.role;
  } catch (e) {
    return false;
  }
};

export const getApproveTokenUsername = () => {
  try {
    let token = localStorage.getItem(server.APPROVE_TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload.aud;
  } catch (e) {
    return false;
  }
};
