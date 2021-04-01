import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_CAPEX_SUCCESS,
  HTTP_CAPEX_FETCHING,
  HTTP_CAPEX_FAILED,
  HTTP_CAPEX_CLEAR,
  server,
} from "../constants";

export const setStateCapexToSuccess = (payload) => ({
  type: HTTP_CAPEX_SUCCESS,
  payload,
});

const setStateCapexToFetching = () => ({
  type: HTTP_CAPEX_FETCHING,
});

const setStateCapexToFailed = () => ({
  type: HTTP_CAPEX_FAILED,
});

const setStateCapexToClear = () => ({
  type: HTTP_CAPEX_CLEAR,
});

export const getCapexCoscenters = (year, costcenter) => {
  return async (dispatch) => {
    dispatch(setStateCapexToFetching());
    doGetCapexCoscenters(dispatch, year, costcenter);
  };
};

const doGetCapexCoscenters = async (dispatch, year, costcenter) => {
  try {
    let result = await httpClient.get(
      `${server.CAPEXCOST_URL}/${year}/${costcenter}`
    );
    dispatch(setStateCapexToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateCapexToFailed());
  }
};

export const getCapexDepartments = () => {
  return async (dispatch) => {
    dispatch(setStateCapexToFetching());
    doGetCapexDepartments(dispatch);
  };
};

const doGetCapexDepartments = async (dispatch) => {
  try {
    let result = await httpClient.get(`${server.CAPEXDEPT_URL}`);
    dispatch(setStateCapexToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateCapexToFailed());
  }
};
