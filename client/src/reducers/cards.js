export default function cards(state = [], action) {
  switch (action.type) {
    case "BOARD_FETCHED": {
      const cards = action.board.lists.reduce(
        (acc, list) => acc.concat(list.cards),
        []
      );
      let newState = [...state];
      cards.forEach((card) => {
        const indx = newState.findIndex(
          (existingCard) => existingCard._id === card._id
        );
        if (indx === -1) {
          newState.push(card);
        } else {
          newState[indx] = card;
        }
      });
      return newState;
    }
    case "CREATE_CARD_SUCCESS": {
      return [...state, action.card];
    }
    case "FETCH_CARD_SUCCESS": {
      const cards = [...state];
      if (
        cards.length > 0 &&
        cards.find((card) => card._id === action.card._id)
      ) {
        return cards.map((card) => {
          if (card._id === action.card._id) {
            return action.card;
          }
          return card;
        });
      } else {
        return [action.card];
      }
    }
    case "EDIT_CARD_SUCCESS": {
      return [...state].map((card) => {
        if (card._id === action.card.card._id) {
          return action.card.card;
        }
        return card;
      });
    }
    default:
      return state;
  }
}
