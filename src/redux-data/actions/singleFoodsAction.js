import { client } from "../../client";

const reqSingle = () => {
  return {
    type: "FETCH_DATA_SINGLE",
  };
};
const successSingle = (data) => {
  return {
    type: "FETCH_SUCCESS_SINGLE",
    payload: {
      data,
    },
  };
};
const errorSingle = (error) => {
  return {
    type: "FETCH_ERROR_SINGLE",
    payload: {
      error,
    },
  };
};

export const fetchSingleFood = (id) => (dispatch) => {
  dispatch(reqSingle());
    try {
      client
        .getEntry(id)
        .then((res) => dispatch(successSingle(res)))
        .catch((err) => dispatch(errorSingle('خطایی پیش آمده')));
    } catch (err) {
      dispatch(errorSingle("خطایی پیش آمده"));
    }
  
};
