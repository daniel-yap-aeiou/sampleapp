import Item1 from "../../images/item1.jpg";
import Item2 from "../../images/item2.jpg";
import Item3 from "../../images/item3.jpg";
import Item4 from "../../images/item4.jpg";
import Item5 from "../../images/item5.jpg";
import Item6 from "../../images/item6.jpg";
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  REMOVE_ALL_ITEMS,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
  UP_VOTE,
  DOWN_VOTE,
} from "../actions/action-types/cartActions";

const initState = {
  items: [
    {
      id: 1,
      title: "Winter body",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 110,
      img: Item1,
      votes: [],
    },
    {
      id: 2,
      title: "Adidas",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 80,
      img: Item2,
      votes: [],
    },
    {
      id: 3,
      title: "Vans",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 120,
      img: Item3,
      votes: [],
    },
    {
      id: 4,
      title: "White",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 260,
      img: Item4,
      votes: [],
    },
    {
      id: 5,
      title: "Cropped-sho",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 160,
      img: Item5,
      votes: [],
    },
    {
      id: 6,
      title: "Blues",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 90,
      img: Item6,
      votes: [],
    },
  ],
  addedItems: [],
  total: 0,
};
const cartReducer = (state = initState, action) => {
  //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find((item) => item.id === action.id);
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find((item) => action.id === item.id);
    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.price,
      };
    } else {
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + addedItem.price;

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find((item) => action.id === item.id);
    let new_items = state.addedItems.filter((item) => action.id !== item.id);

    //calculating the total
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    
    return {
      ...state,
      addedItems: new_items,
      total: newTotal,
    };
  }
  //INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal,
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter((item) => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal,
      };
    }
  }

  if (action.type === ADD_SHIPPING) {
    return {
      ...state,
      total: state.total + 6,
    };
  }

  if (action.type === "SUB_SHIPPING") {
    return {
      ...state,
      total: state.total - 6,
    };
  }

  if (action.type === REMOVE_ALL_ITEMS) {
    return {
      ...state,
      addedItems: [],
      total: 0,
    };
  }

  if (action.type === UP_VOTE) {
    let addedItem = state.items.find((item) => item.id === action.id);
    let existingItems = state.items.filter((item) => item.id !== action.id);
    let upVoteUser = action.user;

    if (addedItem && upVoteUser) {
      if (!addedItem.votes.includes(upVoteUser)) {
        addedItem.votes.push(upVoteUser);
      }

      let newItems = [...existingItems, addedItem];
      let sortedItems = newItems.sort(function (a, b) {
        return a.id - b.id;
      });

      return {
        ...state,
        items: sortedItems,
      };
    }
  }

  if (action.type === DOWN_VOTE) {
    let addedItem = state.items.find((item) => item.id === action.id);
    let existingItems = state.items.filter((item) => item.id !== action.id);
    let downVoteUser = action.user;

    if (addedItem && downVoteUser) {
      let newVotes = addedItem.votes.filter(
        (item) => item !== downVoteUser
      );
      addedItem.votes = newVotes;

      let newItems = [...existingItems, addedItem];
      let sortedItems = newItems.sort(function (a, b) {
        return a.id - b.id;
      });

      return {
        ...state,
        items: sortedItems,
      };
    }
  }

  return state;
};

export default cartReducer;
