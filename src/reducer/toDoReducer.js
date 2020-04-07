import actionTypes from "../util/actionTypes";

const initialState = {
  posts: [],
  signUpModal: {
    open: false
  }
};

const toDoReducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_POST) {
    return Object.assign({}, state, {
      posts: state.posts.concat(action.payload)
    });
  }

  if (action.type === actionTypes.LOAD_POSTS) {
    return {
      ...state,
      posts: state.posts.concat(action.payload)
    };
  }

  if (action.type === actionTypes.DEL_POSTS) {
    // if (state.posts && state.posts.length === 1) {
    //   let _posts = state.posts;

    //   if (_posts && _posts.length !== 0) {
    //     let index = _posts.findIndex(x => x.id === action.payload.id);
    //     _posts.splice(index, 1);
    //   }

    //   return Object.assign({}, state, {
    //     posts: _posts && _posts.length === 0 ? [] : _posts
    //   });
    // }

    const newState = Object.assign([], state);
    const indexOfCatToDelete = state.posts.findIndex(cat => {
      console.log(cat.id);
      console.log(action.payload.id);
      return cat.id == action.payload.id;
    })
    newState.posts.splice(indexOfCatToDelete, 1);
    console.log(newState);

    // const _state = { ...state, posts: newState.posts };
    // console.log(_state);
    // return _state;

    // return Object.assign({}, state, {
    //   posts: newState.posts
    // });

    return {
      ...state,
      posts: newState.posts
    };

    // const filtered = state.posts.filter((e, index) => index !== action.payload.id);
    // console.log(filtered);
    // return Object.assign({}, state, {
    //   posts: filtered
    // });



  //   let _posts = state.posts.filter((data) => {
  //     //console.log(data);
  //     return data.id !== action.payload.id;
  //   });
  // console.log(_posts);

  //   state.posts = [];
  //   state.posts.concat(_posts);
  //   return {
  //     ...state,
  //     posts: state.posts
  //   };

    // return Object.assign({}, state, {
    //   posts: state.posts.filter((data) => {
    //     console.log(data);
    //     return data.id !== action.payload.id;
    //   })
    // });

    // state.posts.filter((data, i) => i !== action.payload.id);

    // if (state.posts === null || state.posts === undefined) {
    //   return Object.assign({}, state, {
    //     posts: []
    //   });
    // }

    // return Object.assign({}, state, {
    //   posts: state.posts
    // });
  }

  if (action.type === actionTypes.DEL_ALL_POSTS) {
    return Object.assign({}, state, {
      posts: []
    });
  }

  return state;
};

export default toDoReducer;
