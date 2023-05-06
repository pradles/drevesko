import { CONSTANTS } from "../actions";

let listId = 2;
let cardId = 5;

const initialState = [
    {
        title: "Prvi",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text: "tle je tekst",
                text_opis: "opis"
            },
            {
                id: `card-${1}`,
                text: "tle je tekst2",
                text_opis: "opis2"
            }
        ]
    },
    {
        title: "Drugi",
        id: `list-${1}`,
        cards: [
            {
                id: `card-${2}`,
                text: "tle je tekst3",
                text_opis: "opis3"
            },
            {
                id: `card-${3}`,
                text: "tle je tekst4",
                text_opis: "opis4"
            },
            {
                id: `card-${4}`,
                text: "tle je tekst5",
                text_opis: "opis5"
            },
        ]
    }
]



const listReducer = (state = initialState, action) => {
    switch (action.type){
        case CONSTANTS.ADD_LIST:{
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listId}`
            }
            listId += 1;
            return [...state, newList];
        }

        case CONSTANTS.EDIT_CARD: {
            const { text_opis, text, cardId, listId } = action.payload;
            console.log("EDIT_CARD reducer called with:", action.payload);
        
            const newState = state.map(list => {
                if (list.id === listId) {
                    const updatedCards = list.cards.map(card => {
                        if (card.id === cardId) {
                            return {
                                ...card,
                                text,
                                text_opis,
                            };
                        }
                        return card;
                    });
                    return {
                        ...list,
                        cards: updatedCards,
                    };
                }
                return list;
            });
        
            return newState;
        }
        
          
          

        case CONSTANTS.ADD_CARD:
            const newCard = {
                text: action.payload.text,
                text_opis: action.payload.text_opis,
                id: `card-${cardId}`
            }
            cardId += 1;

            const newState = state.map(list => {
                if(list.id === action.payload.listId){
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else{
                    return list;
                }
            })
            return newState;
        
        case CONSTANTS.DRAG_HAPPENED:{
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;

            const newState = [...state];

            //dragging lists around
            if(type === "list") {
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }

            //in the same list
            if(droppableIdStart === droppableIdEnd){
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }
            // other list
            if(droppableIdStart !== droppableIdEnd){
                //find the list where the drag happened
                const listStart = state.find(list => droppableIdStart === list.id); 
                //pull out the card from the list
                const card = listStart.cards.splice(droppableIndexStart, 1);
                //find the list when drag ended
                const listEnd = state.find(list => droppableIdEnd === list.id);
                //put the card in the list
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }

            return newState;
        }

        default:
            return state;
    }
}

export default listReducer;