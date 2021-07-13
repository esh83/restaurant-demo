
const initialState = {
    loading: false,
    data: {},
    error: "",
  };
  
  export const singleFoodsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "FETCH_DATA_SINGLE":
        return { ...state, loading: true, data:{} , error: "" };
      case "FETCH_SUCCESS_SINGLE":
        return { ...state, loading: false, data: payload.data, error: "" };
      case "FETCH_ERROR_SINGLE":
        return { ...state, loading: false, data: {}, error: payload.error };

      default:
        return state;
    }
  };
  