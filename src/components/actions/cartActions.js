import {
  ADD_TO_CART,
  REMOVE_ITEM,
  REMOVE_ALL_ITEMS,
  SUB_QUANTITY,
  ADD_QUANTITY,
  UP_VOTE,
  DOWN_VOTE,
} from "./action-types/cartActions";

//add cart action
export const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    id,
  };
};
//remove item action
export const removeItem = (id) => {
  return {
    type: REMOVE_ITEM,
    id,
  };
};
//subtract qt action
export const subtractQuantity = (id) => {
  return {
    type: SUB_QUANTITY,
    id,
  };
};
//add qt action
export const addQuantity = (id) => {
  return {
    type: ADD_QUANTITY,
    id,
  };
};
export const removeAllItems = () => {
  return {
    type: REMOVE_ALL_ITEMS,
  };
};

export const upVote = (id, user) => {
  return {
    type: UP_VOTE,
    id,
    user,
  };
};

export const downVote = (id, user) => {
  return {
    type: DOWN_VOTE,
    id,
    user,
  };
};