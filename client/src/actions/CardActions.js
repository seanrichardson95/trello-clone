import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

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
