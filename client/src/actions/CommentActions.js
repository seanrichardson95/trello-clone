import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function addCommentSuccess(data) {
  return { type: types.ADD_COMMENT_SUCCESS, ...data };
}

export function addComment(comment, cardId, callback) {
  return function (dispatch) {
    const obj = { cardId, comment: { text: comment } };
    apiClient.addComment(obj, (data) => {
      dispatch(addCommentSuccess(data));

      if (callback) {
        callback();
      }
    });
  };
}
