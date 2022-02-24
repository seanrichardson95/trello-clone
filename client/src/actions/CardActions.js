import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";
import { fetchBoard } from "./BoardActions";

export function createCard(listId, title, callback) {
  return function (dispatch) {
    dispatch(createCardRequest);
    const card = {
      listId,
      card: {
        title,
      },
    };
    apiClient.createCard(card, (data) => {
      dispatch(createCardSuccess(data.card));

      if (callback) {
        callback();
      }
    });
  };
}

export function createCardRequest() {
  return { type: types.CREATE_CARD_REQUEST };
}

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, card };
}

export function fetchCardSuccess(card) {
  return { type: types.FETCH_CARD_SUCCESS, card };
}

export function editCardSuccess(data) {
  return { type: types.EDIT_CARD_SUCCESS, card: { ...data } };
}

export function fetchCard(id, callback) {
  return function (dispatch) {
    apiClient.getCard(id, (data) => {
      dispatch(fetchCardSuccess(data));

      if (callback) {
        callback();
      }
    });
  };
}

export function editCard(obj, id, callback) {
  return function (dispatch) {
    apiClient.editCard(obj, id, (data) => {
      dispatch(editCardSuccess(data));

      if (callback) {
        callback();
      }
    });
  };
}

export function addCommentSuccess(data) {
  return { type: types.ADD_COMMENT_SUCCESS, comment: data };
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
