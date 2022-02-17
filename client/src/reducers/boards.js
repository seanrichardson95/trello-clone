export default function boards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARDS_SUCCESS": {
      return action.boards;
    }
    case "CREATE_BOARD_SUCCESS": {
      const newBoard = action.board;
      return state.concat(newBoard);
    }
    case "BOARD_FETCHED": {
      if (state.find(board => board._id === action.board._id)) {
        return state;
      } else {
        // eslint-disable-next-line no-unused-vars
        const { lists, ...board} = action.board;
        return state.concat(board);
      }
    }
    default:
      return state;
  }
}
