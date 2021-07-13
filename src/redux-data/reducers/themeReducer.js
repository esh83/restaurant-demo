const initialState = {
  mode: "light",
};

export const themeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SWITCH_MODE":
      return { ...state, mode: state.mode === "light" ? "dark" : "light" };

    default:
      return state;
  }
};
