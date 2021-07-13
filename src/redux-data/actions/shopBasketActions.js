const add = (id, price, title, count) => {
  return {
    type: "ADD_FOOD_TO_BASKET",
    payload: {
      id,
      price,
      title,
      count,
    },
  };
};
const edit = (count, index) => {
  return {
    type: "EDIT_FOOD_IN_BASKET",
    payload: {
      count,
      index
    },
  };
};
export const deleteFromBasket = (index) => {
  return {
    type: "DELETE_FROM_BASKET",
    payload: {
      index
    },
  };
};

export const deleteBasket = () => {
  return {
    type: "DELETE_BASKET",
   
  };
};


export const addToBasket =
  (idMain, price, title, count) => (dispatch, getState) => {
    const items = getState().basket;
    const test = items.every((item) => item.id !== idMain);
    if (test) {
      dispatch(add(idMain, price, title, count));
    } else {
      const indexNumber = items.findIndex((item) => item.id === idMain);
      dispatch(edit(count , indexNumber))
    }
  };
