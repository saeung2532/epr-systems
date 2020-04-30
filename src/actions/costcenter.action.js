import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_COSTCENTER_SUCCESS,
  HTTP_COSTCENTER_FETCHING,
  HTTP_COSTCENTER_FAILED,
  HTTP_COSTCENTER_CLEAR,
  server,
} from "../constants";

export const setStateCostCenterToSuccess = (payload) => ({
  type: HTTP_COSTCENTER_SUCCESS,
  payload,
});

const setStateCostCenterToFetching = () => ({
  type: HTTP_COSTCENTER_FETCHING,
});

const setStateCostCenterToFailed = () => ({
  type: HTTP_COSTCENTER_FAILED,
});

const setStateCostCenterToClear = () => ({
  type: HTTP_COSTCENTER_CLEAR,
});

export const getCostCenters = (department) => {
  return async (dispatch) => {
    dispatch(setStateCostCenterToFetching());
    dogetCostCenters(dispatch, department);
  };
};

const dogetCostCenters = async (dispatch, department) => {
  try {
    let result = await httpClient.get(`${server.COSTCENTER_URL}/${department}`);
    dispatch(setStateCostCenterToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateCostCenterToFailed());
  }
};
