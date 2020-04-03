const initialState = {
  posts: [{ id: 0, title: "Test Post" }],
  signUpModal: {
    open: false
  }
};

const toDoReducer = (state = initialState, action) => {
  if (action.type === "ADD_POST") {
    return Object.assign({}, state, {
      posts: state.posts.concat(action.payload)
    });
  }

  if (action.type === "LOAD_POSTS") {
    return {
      ...state,
      posts: state.posts.concat(action.payload)
    };
  }

  return state;
};


export default toDoReducer;