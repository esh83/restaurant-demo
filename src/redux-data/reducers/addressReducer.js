const initialState = {
  city: "",
  road: "",
};

export const addressReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CHANGE_ADDRESS":
      return { ...state ,city: payload.city, road: payload.road };

    default:
      return state;
  }
};
