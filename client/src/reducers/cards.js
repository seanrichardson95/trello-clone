export default function cards(state = [], action) {
  switch (action.type) {
    case "BOARD_FETCHED": {
      const cards = action.board.lists.reduce(
        (acc, list) => acc.concat(list.cards),
        []
      );
      let newState = [...state];
      cards.forEach((card) => {
        if (!newState.find((existingCard) => existingCard._id === card._id)) {
          newState.push(card);
        }
      });
      return newState;
    }
    case "CREATE_CARD_SUCCESS": {
      return [...state, action.card];
    }
    default:
      return state;
  }
}
