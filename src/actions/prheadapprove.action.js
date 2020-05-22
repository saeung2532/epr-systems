import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRHEADAPPROVE_SUCCESS,
  HTTP_PRHEADAPPROVE_FETCHING,
  HTTP_PRHEADAPPROVE_FAILED,
  HTTP_PRHEADAPPROVE_CLEAR,
  server,
} from "../constants";

export const setStatePRHeadApproveToSuccess = (payload) => ({
  type: HTTP_PRHEADAPPROVE_SUCCESS,
  payload,
});

const setStatePRHeadApproveToFetching = () => ({
  type: HTTP_PRHEADAPPROVE_FETCHING,
});

const setStatePRHeadApproveToFailed = () => ({
  type: HTTP_PRHEADAPPROVE_FAILED,
});

const setStatePRHeadApproveToClear = () => ({
  type: HTTP_PRHEADAPPROVE_CLEAR,
});

export const getPRHeadApproves = (cono, divi, prno, status, approve) => {
  return async (dispatch) => {
    // console.log("PR: " + prno + " STS: " + status);
    dispatch(setStatePRHeadApproveToFetching());
    doGetPRHeadApproves(dispatch, cono, divi, prno, status, approve);
  };
};

const doGetPRHeadApproves = async (
  dispatch,
  cono,
  divi,
  prno,
  status,
  approve
) => {
  try {
    let result = await httpClient.get(
      `${server.PRSTOCKHEADAPPROVE_URL}/${cono}/${divi}/${prno}/${status}/${approve}`
    );
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRHeadApproveToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRHeadApproveToFailed());
  }
};

export const approvePRHead = (formData, history) => {
  return async (dispatch) => {
    try {
      await httpClient.put(server.PRAPPROVE_URL, formData);
      alert("Approve Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const rejectPRHead = (formData, history) => {
  return async (dispatch) => {
    try {
      await httpClient.put(server.PRAPPROVE_URL, formData);
      alert("Reject Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};
