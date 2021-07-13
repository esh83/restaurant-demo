import { client } from "../../client";

const req = () => {
  return {
    type: "FETCH_DATA",
  };
};
const success = (data) => {
  return {
    type: "FETCH_SUCCESS",
    payload: {
      data,
    },
  };
};
const error = (error) => {
  return {
    type: "FETCH_ERROR",
    payload: {
      error,
    },
  };
};
const dataPresent = () => {
  return {
    type: "DATA_PRESENT",
  };
};
export const fetchFoods = () => (dispatch, getState) => {
  const data = getState().foods.data.length;
  if (!data) {
    try {
      dispatch(req());
      client
        .getEntries()
        .then((res) => dispatch(success(res)))
        .catch((err) => dispatch(error('خطایی پیش آمده')));
    } catch (err) {
      dispatch(error('خطایی پیش آمده'));
    }
  } else {
    dispatch(dataPresent());
  }
};
