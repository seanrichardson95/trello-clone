export default function comments(state = [], action) {
  switch (action.type) {
    case "FETCH_CARD_SUCCESS": {
      return action.card.comments;
    }
    case "ADD_COMMENT_SUCCESS": {
      return [ ...state, action.comment ];
    }
    default: {
      return state;
    }
  }
}