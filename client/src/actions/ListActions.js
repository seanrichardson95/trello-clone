import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createListRequest() {
  return { type: types.CREATE_LIST_REQUEST }
}

export function createListSuccess(list) {
  return { type: types.CREATE_LIST_SUCCESS, list };
}

export function createList(list, callback) {
  return function(dispatch) {
    dispatch(createListRequest);
    apiClient.createList(list, data => {
      dispatch(createListSuccess(data.list));

      if (callback) {
        callback();
      }
    });
  }
}

export function updateListRequest() {
  return { type: types.UPDATE_LIST_REQUEST }
}

export function updateListSuccess(list) {
  return { type: types.UPDATE_LIST_SUCCESS, list };
}

export function updateList(id, updatedFields, callback) {
  return function(dispatch) {
    dispatch(updateListRequest);
    apiClient.updateList(id, updatedFields, data => {
      dispatch(updateListSuccess(data.list));

      if (callback) {
        callback();
      }
    })
  }
}
