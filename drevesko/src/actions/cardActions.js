import { CONSTANTS } from "../actions";

export const addCard = (listId, text, text_opis) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { text_opis, text, listId }
    };
};

export const editCard = (listId, text, text_opis) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload: { text_opis, text, listId }
    };
};
