import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRNUMBERBUYER_SUCCESS,
  HTTP_PRNUMBERBUYER_FETCHING,
  HTTP_PRNUMBERBUYER_FAILED,
  HTTP_PRNUMBERBUYER_CLEAR,
  server,
} from "../constants";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

export const setStatePRNumberBuyerToSuccess = (payload) => ({
  type: HTTP_PRNUMBERBUYER_SUCCESS,
  payload,
});

const setStatePRNumberBuyerToFetching = () => ({
  type: HTTP_PRNUMBERBUYER_FETCHING,
});

const setStatePRNumberBuyerToFailed = () => ({
  type: HTTP_PRNUMBERBUYER_FAILED,
});

const setStatePRNumberBuyerToClear = () => ({
  type: HTTP_PRNUMBERBUYER_CLEAR,
});

export const getPRNumbers = (fromStatus, toStatus) => {
  return async (dispatch) => {
    dispatch(setStatePRNumberBuyerToFetching());
    doGetPRNumbers(dispatch, fromStatus, toStatus);
  };
};

const doGetPRNumbers = async (dispatch, fromStatus, toStatus) => {
  try {
    let result = await httpClient.get(
      `${server.PRNUMBERBUYER_URL}/${fromStatus}/${toStatus}`
    );
    dispatch(setStatePRNumberBuyerToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    alert(JSON.stringify(err));
    localStorage.removeItem(server.TOKEN_KEY);
    dispatch(setStatePRNumberBuyerToFailed());
  }
};

export const getPRNumbersGrouping = (statusHead, statusLine) => {
  return async (dispatch) => {
    dispatch(setStatePRNumberBuyerToFetching());
    doGetPRNumbersGrouping(dispatch, statusHead, statusLine);
  };
};

const doGetPRNumbersGrouping = async (dispatch, statusHead, statusLine) => {
  try {
    let result = await httpClient.get(
      `${server.PRNUMBERGROUPING_URL}/${statusHead}/${statusLine}`
    );
    dispatch(setStatePRNumberBuyerToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    alert(JSON.stringify(err));
    localStorage.removeItem(server.TOKEN_KEY);
    dispatch(setStatePRNumberBuyerToFailed());
  }
};

export const getPRNumbersGenPO = (statusHead, statusLine) => {
  return async (dispatch) => {
    dispatch(setStatePRNumberBuyerToFetching());
    doGetPRNumbersGenPO(dispatch, statusHead, statusLine);
  };
};

const doGetPRNumbersGenPO = async (dispatch, status) => {
  try {
    let result = await httpClient.get(`${server.PRNUMBERGENPO_URL}/${status}`);
    dispatch(setStatePRNumberBuyerToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    alert(JSON.stringify(err));
    localStorage.removeItem(server.TOKEN_KEY);
    dispatch(setStatePRNumberBuyerToFailed());
  }
};
