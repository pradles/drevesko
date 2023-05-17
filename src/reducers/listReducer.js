import { CONSTANTS } from "../actions";
import initialStateData from "../data/initialState.json";
//import fs from 'fs';


//console.log(initialStateData)

let listId = initialStateData.length;
let cardId = initialStateData.reduce((maxId, list) => {
    return Math.max(maxId, list.cards.reduce((maxCardId, card) => {
        return Math.max(maxCardId, parseInt(card.id.split("-")[1]));
    }, 0));
}, 0) + 1;

//console.log("length list",listId)
//console.log("length card",cardId)

const initialState = listId > 0
  ? initialStateData
  : [
      {
        title: "List 1",
        id: `list-${listId}`,
        cards: [
          {
            id: `card-${cardId}`,
            text: "Card 1",
            text_opis: "",
          },
        ],
      },
    ];


const listReducer = (state = initialState, action) => {
    switch (action.type){
        case CONSTANTS.ADD_LIST:{
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listId}`
            }
            listId += 1;
            const newState = [...state, newList];
            
            //fs.writeFileSync('../data/initialState.json', JSON.stringify(newState));

            //localStorage.setItem("state.json", JSON.stringify(newState));
            return newState;
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
        
        case CONSTANTS.KILL_CARD:{
            const { listId, cardId } = action.payload;
            console.log("KILL_CARD reducer called with:", action.payload);

            const newState = state.map(list => {
              if (list.id === listId) {
                const updatedCards = list.cards.filter(card => card.id !== cardId);
                return { ...list, cards: updatedCards };
              }
              return list;
            });

            return newState;
        }
          

        case CONSTANTS.ADD_CARD:{
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
        }

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