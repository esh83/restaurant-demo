const initialState = [];

export const shopBasketReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_FOOD_TO_BASKET":
      return [
        ...state,
        {
          id: payload.id,
          price: payload.price,
          title: payload.title,
          count: payload.count,
        },
      ];
    case "EDIT_FOOD_IN_BASKET":
      return [
        ...state.slice(0, payload.index),
        {
          ...state[payload.index],
          count: state[payload.index].count + payload.count,
        },
        ...state.slice(payload.index + 1),
      ];
      case "DELETE_FROM_BASKET":
        return [
          ...state.slice(0 ,payload.index),
          ...state.slice(payload.index + 1),
          
        ];
        case "DELETE_BASKET":
          return initialState
    default:
      return state;
  }
};
