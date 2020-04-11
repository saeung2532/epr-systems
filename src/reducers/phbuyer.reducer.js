import {
    HTTP_PHBUYER_SUCCESS,
    HTTP_PHBUYER_FETCHING,
    HTTP_PHBUYER_FAILED,
    HTTP_PHBUYER_CLEAR,
  } from "../constants";
  
  const initialState = {
    result: null,
    isFetching: false,
    isError: false,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case HTTP_PHBUYER_FETCHING:
        // return { ...state, result: null, isFetching: true, isError: false };
  
        return Object.assign({}, state, {
          ...state,
          result: null,
          isFetching: true,
          isError: false,
        });
  
      // return Object.assign({}, state, {
      //   ...state,
      //   result: null,
      //   isFetching: true,
      //   isError: false
      // });
      case HTTP_PHBUYER_FAILED:
        return { ...state, result: null, isFetching: false, isError: true };
      case HTTP_PHBUYER_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false };
  
      // return Object.assign({}, state, {
      //   ...state,
      //   result: payload,
      //   isFetching: false,
      //   isError: true
      // });
  
      default:
        return state;
    }
  };
  