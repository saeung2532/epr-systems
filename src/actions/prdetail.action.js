import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRDETAIL_SUCCESS,
  HTTP_PRDETAIL_FETCHING,
  HTTP_PRDETAIL_FAILED,
  HTTP_PRDETAIL_CLEAR,
  server,
} from "../constants";

export const setStatePRDetailToSuccess = (payload) => ({
  type: HTTP_PRDETAIL_SUCCESS,
  payload,
});

const setStatePRDetailToFetching = () => ({
  type: HTTP_PRDETAIL_FETCHING,
});

const setStatePRDetailToFailed = () => ({
  type: HTTP_PRDETAIL_FAILED,
});

const setStatePRDetailToClear = () => ({
  type: HTTP_PRDETAIL_CLEAR,
});

export const getEPRDetails = (prno) => {
  return async (dispatch) => {
    // console.log("PR: " + prno);
    dispatch(setStatePRDetailToFetching());
    doGetEPRDetails(dispatch, prno);
  };
};

const doGetEPRDetails = async (dispatch, prno) => {
  try {
    let result = await httpClient.get(`${server.EPRDETAIL_URL}/${prno}`);
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRDetailToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRDetailToFailed());
  }
};

export const getPRDetailApproves = (cono, divi, prno, status, page) => {
  return async (dispatch) => {
    // console.log("PR: " + prno);
    dispatch(setStatePRDetailToFetching());
    // doGetMPRDetailApproves(dispatch, cono, divi, prno, status);
    if (page === "approvempr") {
      doGetMPRDetailApproves(dispatch, cono, divi, prno, status);
    } else {
      doGetEPRDetailApproves(dispatch, cono, divi, prno, status);
    }
  };
};

// export const getMPRDetailApproves = (cono, divi, prno, status) => {
//   return async (dispatch) => {
//     // console.log("PR: " + prno);
//     dispatch(setStatePRDetailToFetching());
//     doGetMPRDetailApproves(dispatch, cono, divi, prno, status);
//   };
// };

const doGetMPRDetailApproves = async (dispatch, cono, divi, prno, status) => {
  try {
    let result = await httpClient.get(
      `${server.MPRDETAILAPPROVE_URL}/${cono}/${divi}/${prno}/${status}`
    );
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRDetailToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRDetailToFailed());
  }
};

// export const getEPRDetailApproves = (cono, divi, prno, status) => {
//   return async (dispatch) => {
//     // console.log("PR: " + prno);
//     dispatch(setStatePRDetailToFetching());
//     doGetEPRDetailApproves(dispatch, cono, divi, prno, status);
//   };
// };

const doGetEPRDetailApproves = async (dispatch, cono, divi, prno, status) => {
  try {
    let result = await httpClient.get(
      `${server.EPRDETAILAPPROVE_URL}/${cono}/${divi}/${prno}/${status}`
    );
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRDetailToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRDetailToFailed());
  }
};

export const getEPRDetailsMonitoring = (prno) => {
  return async (dispatch) => {
    // console.log("PR: " + prno);
    dispatch(setStatePRDetailToFetching());
    doGetEPRDetailsMonitoring(dispatch, prno);
  };
};

const doGetEPRDetailsMonitoring = async (dispatch, prno) => {
  try {
    let result = await httpClient.get(
      `${server.EPRDETAILMONITORING_URL}/${prno}`
    );
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRDetailToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRDetailToFailed());
  }
};

export const addEPRDetail = (formData, history) => {
  return async (dispatch) => {
    try {
      await httpClient.post(server.EPRDETAIL_URL, formData);
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const updateEPRDetail = (formData, history) => {
  return async (dispatch) => {
    try {
      // console.log(formData);
      await httpClient.put(server.EPRDETAIL_URL, formData);
      // alert("Update Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const deleteEPRDetail = (prno, itemline) => {
  return async (dispatch) => {
    try {
      // console.log(formData);
      await httpClient.delete(`${server.EPRDETAIL_URL}/${prno}/${itemline}`);
      // alert("Delete Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};
