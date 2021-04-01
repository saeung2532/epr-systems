import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRDETAILBUYER_SUCCESS,
  HTTP_PRDETAILBUYER_FETCHING,
  HTTP_PRDETAILBUYER_FAILED,
  HTTP_PRDETAILBUYER_CLEAR,
  server,
} from "../constants";

export const setStatePRDetailBuyerToSuccess = (payload) => ({
  type: HTTP_PRDETAILBUYER_SUCCESS,
  payload,
});

const setStatePRDetailBuyerToFetching = () => ({
  type: HTTP_PRDETAILBUYER_FETCHING,
});

const setStatePRDetailBuyerToFailed = () => ({
  type: HTTP_PRDETAILBUYER_FAILED,
});

const setStatePRDetailBuyerToClear = () => ({
  type: HTTP_PRDETAILBUYER_CLEAR,
});

export const getEPRDetails = (prno) => {
  return async (dispatch) => {
    // console.log("PR: " + prno);
    dispatch(setStatePRDetailBuyerToFetching());
    doGetEPRDetails(dispatch, prno);
  };
};

const doGetEPRDetails = async (dispatch, prno) => {
  try {
    let result = await httpClient.get(`${server.EPRDETAILBUYER_URL}/${prno}`);
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRDetailBuyerToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRDetailBuyerToFailed());
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

export const updateEPRConfirmDetailReject = (prno, buyer) => {
  return async (dispatch) => {
    try {
      // console.log(formData);
      await httpClient.put(
        `${server.EPRCONFIRMDETAILREJECT_URL}/${prno}/${buyer}`
      );
      // alert("Update Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const updateEPRConfirmDetailItem = (prno, line, buyer) => {
  return async (dispatch) => {
    try {
      // console.log(formData);
      await httpClient.put(
        `${server.EPRCONFIRMDETAILITEM_URL}/${prno}/${line}/${buyer}`
      );
      alert("Confirm Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const updateEPRConfirmDetailAll = (prno, buyer) => {
  return async (dispatch) => {
    try {
      // console.log(formData);
      await httpClient.put(
        `${server.EPRCONFIRMDETAILALL_URL}/${prno}/${buyer}`
      );
      alert("Confirm Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const getEPRDetailsGrouping = (prno) => {
  return async (dispatch) => {
    // console.log("PR: " + prno);
    dispatch(setStatePRDetailBuyerToFetching());
    doGetEPRDetailsGrouping(dispatch, prno);
  };
};

const doGetEPRDetailsGrouping = async (dispatch, prno) => {
  try {
    let result = await httpClient.get(
      `${server.EPRDETAILGROUPING_URL}/${prno}`
    );
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRDetailBuyerToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRDetailBuyerToFailed());
  }
};

export const updateEPRDetailGrouping = (prno, itemline, group, date) => {
  return async (dispatch) => {
    try {
      // console.log(formData);
      await httpClient.put(
        `${server.EPRDETAILGROUPING_URL}/${prno}/${itemline}/${group}/${date}`
      );
      // alert("Delete Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const getEPRDetailsGenPO = (status, prnoline) => {
  return async (dispatch) => {
    // console.log("PR: " + prno);
    dispatch(setStatePRDetailBuyerToFetching());
    doGetEPRDetailsGenPO(dispatch, status, prnoline);
  };
};

const doGetEPRDetailsGenPO = async (dispatch, status, prnoline) => {
  try {
    let result = await httpClient.get(
      `${server.EPRDETAILGENPO_URL}/${status}/${prnoline}`
    );
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRDetailBuyerToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRDetailBuyerToFailed());
  }
};
