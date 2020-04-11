import {
  HTTP_PHGROUP_SUCCESS,
  HTTP_PHGROUP_FETCHING,
  HTTP_PHGROUP_FAILED,
  HTTP_PHGROUP_CLEAR,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_PHGROUP_FETCHING:
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
    case HTTP_PHGROUP_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_PHGROUP_SUCCESS:
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
