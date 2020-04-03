const initialState = {
  comments: [{ id: 0, title: "Test Comment 0" }],
};

const commentsHistory = [
  { id: 1, title: "Test Comment 1" },
  { id: 2, title: "Test Comment 2" },
  { id: 3, title: "Test Comment 3" },
  { id: 4, title: "Test Comment 4" },
  { id: 5, title: "Test Comment 5" },
  { id: 6, title: "Test Comment 6" },
  { id: 7, title: "Test Comment 7 " },
  { id: 8, title: "Test Comment 8" },
];

const commentReducer = (state = initialState, action) => {
  if (action.type === "ADD_COMMENT") {
    return Object.assign({}, state, {
      comments: state.comments.concat(action.payload)
    });
  }

  if (action.type === "LOAD_COMMENTS") {
    return {
      ...state,
      comments: state.comments.concat(commentsHistory)
    };
  }

  return state;
};


export default commentReducer;