import actionTypes from "../util/actionTypes";
//import { matchPath } from "react-router-dom";

const initialState = {
  comments: [{ id: 0, title: "Test Comment 0" }],
};

let counter = 1;

const commentReducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_COMMENT) {
    return Object.assign({}, state, {
      comments: state.comments.concat(action.payload)
    });
  }

  if (action.type === actionTypes.LOAD_COMMENTS) {
    let commentsHistory = [];

    let l = counter + 8;
    let range = Array.from({length: l},(v,k)=>(k+1));
    range.splice(0, counter - 1);

    range.map((id) => commentsHistory.push({ id: id, title: "Test Comment " + id }));
    // for (var i = counter; i <= counter + 8; i++)
    // {
    //   let id = i;
    //   commentsHistory.push({ id: id, title: "Test Comment " + id });
    // }
    counter += 9;
    
    return {
      ...state,
      comments: state.comments.concat(commentsHistory)
    };
  }

  if (action.type === actionTypes.DEL_COMMENT)   {
    return Object.assign({}, state, {
        comments: state.comments.filter((data) => {
          return data.id !== action.payload.id;
        })
      });
  }

  return state;
};


export default commentReducer;