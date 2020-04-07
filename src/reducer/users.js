import { Types } from "../actions/users";

const initialState = {
  items: []
};

export default function users(state = initialState, action) {
  switch (action.Types) {
    case Types.GET_USERS_SUCCESS: {
      return {
        ...state,
        items: action.payload.items
      };
    }
    default : {
        return state;
    }
  }
}
