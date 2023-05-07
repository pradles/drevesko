import React from "react";
import DreveskoCard from "./DreveskoCard";
import DreveskoActionButton from "./DreveskoActionButton";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';
import './App.css';
const ListContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.8);;
    
    width: 300px;
    padding: 8px;
    margin-right: 6px;
    height: 100%;
    margin-left: 10px;
    padding: 5px;
    border-radius: 5px;
`

const DreveskoList = ({title, cards, listId, index}) => {
    return (
        <Draggable draggableId={String(listId)} index={index} >
            {provided => (
                <ListContainer {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                    <Droppable droppableId={String(listId)}>
                        {(provided) =>(
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                            <h4>{title}</h4>
                            { cards.map((card, index) => <DreveskoCard key={card.id} index={index} text_opis={card.text_opis} text={card.text} cardId={card.id} listId={listId} />) }
                            {provided.placeholder}
                            <DreveskoActionButton listId={listId} />
                            </div>
                        )}
                    </Droppable>
                </ListContainer>
            )}
        </Draggable>
    )
};

export default DreveskoList;