import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_SENDEMAIL_SUCCESS,
  HTTP_SENDEMAIL_FETCHING,
  HTTP_SENDEMAIL_FAILED,
  HTTP_SENDEMAIL_CLEAR,
  server,
} from "../constants";
import * as prheadActions from "./prhead.action";

export const setStateSendEmailToSuccess = (payload) => ({
  type: HTTP_SENDEMAIL_SUCCESS,
  payload,
});

const setStateSendEmailToFetching = () => ({
  type: HTTP_SENDEMAIL_FETCHING,
});

const setStateSendEmailToFailed = () => ({
  type: HTTP_SENDEMAIL_FAILED,
});

const setStateSendEmailToClear = () => ({
  type: HTTP_SENDEMAIL_CLEAR,
});

export const sendEmail = (
  prno,
  status,
  document,
  prnoselect,
  whs,
  bu,
  department,
  month,
  statusselect
) => {
  return async (dispatch) => {
    dispatch(setStateSendEmailToFetching());
    doSendEmail(
      dispatch,
      prno,
      status,
      document,
      prnoselect,
      whs,
      bu,
      department,
      month,
      statusselect
    );
  };
};

const doSendEmail = async (
  dispatch,
  prno,
  status,
  document,
  prnoselect,
  whs,
  bu,
  department,
  month,
  statusselect
) => {
  try {
    let resultsendmail = await httpClient.post(
      `${server.SENDEMAIL_URL}/${prno}/${status}/${document}`
    );
    dispatch(setStateSendEmailToSuccess(resultsendmail.data));

    let resultepr = await httpClient.get(
      `${server.EPRHEADMONITORING_URL}/${prnoselect}/${whs}/${bu}/${department}/${month}/${statusselect}`
    );
    dispatch(prheadActions.setStatePRHeadToSuccess(resultepr.data));

    alert(JSON.stringify(resultsendmail.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateSendEmailToFailed());
  }
};
