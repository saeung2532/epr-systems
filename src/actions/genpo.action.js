import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_GENPO_SUCCESS,
  HTTP_GENPO_FETCHING,
  HTTP_GENPO_FAILED,
  HTTP_GENPO_CLEAR,
  server,
} from "../constants";

export const setStateGenPOToSuccess = (payload) => ({
  type: HTTP_GENPO_SUCCESS,
  payload,
});

const setStateGenPOToFetching = () => ({
  type: HTTP_GENPO_FETCHING,
});

const setStateGenPOToFailed = () => ({
  type: HTTP_GENPO_FAILED,
});

const setStateGenPOToClear = () => ({
  type: HTTP_GENPO_CLEAR,
});

export const getPONumber = () => {
  let result = "0123456";
  return result;
};

export const genPONumber = (status, prnoline) => {
  return async (dispatch) => {
    // console.log("PR: " + prno + " STS: " + status);
    dispatch(setStateGenPOToFetching());
    doGenPONumber(dispatch, status, prnoline);
  };
};

const doGenPONumber = async (dispatch, status, prnoline) => {
  try {
    let result = await httpClient.post(
      `${server.PRGENPO_URL}/${status}/${prnoline}`
    );
    alert(JSON.stringify(result.data));
    dispatch(setStateGenPOToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateGenPOToFailed());
  }
};

export const cancelPONumber = (pono) => {
  return async (dispatch) => {
    // console.log("PR: " + prno + " STS: " + status);
    dispatch(setStateGenPOToFetching());
    doCancelPONumber(dispatch, pono);
  };
};

const doCancelPONumber = async (dispatch, pono) => {
  try {
    // let result = await httpClient.post(
    //   `${server.PRGENPO_URL}/${status}/${prnoline}`
    // );
    // alert(JSON.stringify(result.data));
    // dispatch(setStateGenPOToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateGenPOToFailed());
  }
};
