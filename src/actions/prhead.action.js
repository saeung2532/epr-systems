import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRHEAD_SUCCESS,
  HTTP_PRHEAD_FETCHING,
  HTTP_PRHEAD_FAILED,
  HTTP_PRHEAD_CLEAR,
  server,
} from "../constants";

export const setStatePRHeadToSuccess = (payload) => ({
  type: HTTP_PRHEAD_SUCCESS,
  payload,
});

const setStatePRHeadToFetching = () => ({
  type: HTTP_PRHEAD_FETCHING,
});

const setStatePRHeadToFailed = () => ({
  type: HTTP_PRHEAD_FAILED,
});

const setStatePRHeadToClear = () => ({
  type: HTTP_PRHEAD_CLEAR,
});

export const getMPRHeads = (prno, fromstatus, toStatus) => {
  return async (dispatch) => {
    // console.log("PR: " + prno + " STS: " + status);
    dispatch(setStatePRHeadToFetching());
    doGetMPRHeads(dispatch, prno, fromstatus, toStatus);
  };
};

const doGetMPRHeads = async (dispatch, prno, fromstatus, toStatus) => {
  try {
    let result = await httpClient.get(
      `${server.MPRHEAD_URL}/${prno}/${fromstatus}/${toStatus}`
    );
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRHeadToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRHeadToFailed());
  }
};

export const addPRHead = (formData, history) => {
  return async (dispatch) => {
    try {
      // console.log(formData);
      let result = await httpClient.post(server.PRHEAD_URL, formData);
      alert("Save Complete: " + JSON.stringify(result.data));
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const updatePRHead = (formData, history) => {
  return async (dispatch) => {
    try {
      // console.log(formData);
      await httpClient.put(server.PRHEAD_URL, formData);
      alert("Update Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const updateStsPRHead = (prno, status) => {
  return async (dispatch) => {
    try {
      // console.log(formData);
      await httpClient.put(`${server.PRHEAD_URL}/${prno}/${status}`);
      // alert("Update Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const getPRHeadsMonitoring = (
  prno,
  whs,
  bu,
  department,
  month,
  status
) => {
  return async (dispatch) => {
    // console.log(prno + " " + whs + " " + bu + " " + department + " " + month + " " + status);
    dispatch(setStatePRHeadToFetching());
    doGetPRHeadsMonitoring(dispatch, prno, whs, bu, department, month, status);
  };
};

const doGetPRHeadsMonitoring = async (
  dispatch,
  prno,
  whs,
  bu,
  department,
  month,
  status
) => {
  try {
    let result = await httpClient.get(
      `${server.PRHEADMONITORING_URL}/${prno}/${whs}/${bu}/${department}/${month}/${status}`
    );
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRHeadToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRHeadToFailed());
  }
};

export const getPRHeads = (prno, fromstatus, toStatus) => {
  return async (dispatch) => {
    // console.log("PR: " + prno + " STS: " + status);
    dispatch(setStatePRHeadToFetching());
    doGetPRHeads(dispatch, prno, fromstatus, toStatus);
  };
};

const doGetPRHeads = async (dispatch, prno, fromstatus, toStatus) => {
  try {
    let result = await httpClient.get(
      `${server.PRHEAD_URL}/${prno}/${fromstatus}/${toStatus}`
    );
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRHeadToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRHeadToFailed());
  }
};
