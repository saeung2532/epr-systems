import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRNUMBER_SUCCESS,
  HTTP_PRNUMBER_FETCHING,
  HTTP_PRNUMBER_FAILED,
  HTTP_PRNUMBER_CLEAR,
  server,
} from "../constants";

export const setStatePRNumberToSuccess = (payload) => ({
  type: HTTP_PRNUMBER_SUCCESS,
  payload,
});

const setStatePRNumberToFetching = () => ({
  type: HTTP_PRNUMBER_FETCHING,
});

const setStatePRNumberToFailed = () => ({
  type: HTTP_PRNUMBER_FAILED,
});

const setStatePRNumberToClear = () => ({
  type: HTTP_PRNUMBER_CLEAR,
});

export const getPRNumbers = (fromStatus, toStatus) => {
  return async (dispatch) => {
    dispatch(setStatePRNumberToFetching());
    doGetPRNumbers(dispatch, fromStatus, toStatus);
  };
};

const doGetPRNumbers = async (dispatch, fromStatus, toStatus) => {
  try {
    let result = await httpClient.get(
      `${server.PRNUMBER_URL}/${fromStatus}/${toStatus}`
    );
    dispatch(setStatePRNumberToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    alert(JSON.stringify(err));
    localStorage.removeItem(server.TOKEN_KEY);
    dispatch(setStatePRNumberToFailed());
  }
};

export const getPRNumbersWithOutUser = () => {
  return async (dispatch) => {
    dispatch(setStatePRNumberToFetching());
    doGetPRNumbersWithOutUser(dispatch);
  };
};

const doGetPRNumbersWithOutUser = async (dispatch) => {
  try {
    let result = await httpClient.get(`${server.PRNUMBERWITHOUTUSER_URL}`);
    dispatch(setStatePRNumberToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    alert(JSON.stringify(err));
    localStorage.removeItem(server.TOKEN_KEY);
    dispatch(setStatePRNumberToFailed());
  }
};

export const getPRNumbersUser = (status) => {
  return async (dispatch) => {
    dispatch(setStatePRNumberToFetching(status));
    doGetPRNumbersUser(dispatch, status);
  };
};

const doGetPRNumbersUser = async (dispatch, status) => {
  try {
    let result = await httpClient.get(`${server.PRNUMBERUSER_URL}/${status}`);
    dispatch(setStatePRNumberToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    alert(JSON.stringify(err));
    localStorage.removeItem(server.TOKEN_KEY);
    dispatch(setStatePRNumberToFailed());
  }
};
