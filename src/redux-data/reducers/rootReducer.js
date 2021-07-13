import { combineReducers } from "redux";
import { themeReducer } from "./themeReducer";
import { foodsReducer } from "./foodsReducer";
import { singleFoodsReducer } from "./singleFoodsReducer";
import { shopBasketReducer } from "./shopBasketReducer";
import {addressReducer} from "./addressReducer";

export const rootReducer = combineReducers({
  theme: themeReducer,
  foods: foodsReducer,
  singleFood: singleFoodsReducer,
  basket: shopBasketReducer,
  address : addressReducer
});
