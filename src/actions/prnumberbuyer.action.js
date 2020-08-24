import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRNUMBERBUYER_SUCCESS,
  HTTP_PRNUMBERBUYER_FETCHING,
  HTTP_PRNUMBERBUYER_FAILED,
  HTTP_PRNUMBERBUYER_CLEAR,
  server,
} from "../constants";

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