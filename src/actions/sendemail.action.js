import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_SENDEMAIL_SUCCESS,
  HTTP_SENDEMAIL_FETCHING,
  HTTP_SENDEMAIL_FAILED,
  HTTP_SENDEMAIL_CLEAR,
  server,
} from "../constants";

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

export const sendEmail = (prno, fromstatus, tostatus) => {
  return async (dispatch) => {
    dispatch(setStateSendEmailToFetching());
    doSendEmail(dispatch, prno, fromstatus, tostatus);
  };
};

const doSendEmail = async (dispatch, prno, fromstatus, tostatus) => {
  try {
    let result = await httpClient.post(
      `${server.SENDEMAIL_URL}/${prno}/${fromstatus}/${tostatus}`
    );
    dispatch(setStateSendEmailToSuccess(result.data));
    alert(JSON.stringify(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateSendEmailToFailed());
  }
};
