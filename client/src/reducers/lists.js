import * as actions from "../constants/ActionTypes"

export default function lists(state = [], action) {
  switch (action.type) {
    case actions.BOARD_FETCHED: {
      let newState = [...state];
      action.board.lists.forEach(origList => {
        // eslint-disable-next-line no-unused-vars
        const { cards, ...list } = origList;
        if (!newState.find(existingList => existingList._id === list._id)) {
          newState.push(list);
        }
      });

      return newState;
    }
    case actions.CREATE_LIST_SUCCESS: {
      return [...state, action.list];
    }
    case actions.UPDATE_LIST_SUCCESS: {
      return state.map(list => {
        if (list._id !== action.list._id) return list;
        return action.list;
      });
    }
    default:
      return state;
  }
}
