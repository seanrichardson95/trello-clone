export default function lists(state = [], action) {
  switch (action.type) {
    case "BOARD_FETCHED": {
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
    default:
      return state;
  }
}
