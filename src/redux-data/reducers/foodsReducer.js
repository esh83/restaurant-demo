const initialState = {
  loading: false,
  data: [],
  error: "",
};

export const foodsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FETCH_DATA":
      return { ...state, loading: true, data: [], error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: payload.data.items, error: "" };
    case "FETCH_ERROR":
      return { ...state, loading: false, data: [], error: payload.error };
      case "DATA_PRESENT":
      return state;
    default:
      return state;
  }
};
