export const Types = {
    GET_COMMENTS_REQUEST: "comments/get_comments_request",
    GET_COMMENTS_SUCCESS: "comments/get_comments_success",
    DELETE_COMMENT_REQUEST: "comments/delete_comment_request",
    CREATE_COMMENT_REQUEST: "comments/create_comment_request",
    COMMENTS_ERROR: "comments/comment_error"
  };
  
  export const getCommentsRequest = () => ({
    type: Types.GET_COMMENTS_REQUEST
  });
  
  export const getCommentSuccess = ({ items }) => ({
    type: Types.GET_COMMENTS_SUCCESS,
    payload: {
      items
    }
  });
  
  export const createCommentRequest = ({ id, comment }) => ({
    type: Types.CREATE_COMMENT_REQUEST,
    payload: {
      id,
      comment
    }
  });
  
  export const deleteCommentRequest = id => ({
    type: Types.DELETE_COMMENT_REQUEST,
    payload: {
      id
    }
  });
  
  export const commentsError = ({ error }) => ({
    type: Types.COMMENTS_ERROR,
    payload: {
      error
    }
  });
  