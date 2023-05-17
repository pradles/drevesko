import { CONSTANTS } from "../actions";

export const addCard = (listId, text, text_opis) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { text_opis, text, listId }
    };
};

export const editCard = (cardId, text, text_opis, listId) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload: { text_opis, text, cardId, listId }
    };
};

export const deleteCard = (listId, cardId) => {
    return {
      type: CONSTANTS.KILL_CARD,
      payload: { listId, cardId }

    }
  }