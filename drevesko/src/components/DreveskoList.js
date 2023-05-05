import React from "react";
import DreveskoCard from "./DreveskoCard";
import DreveskoActionButton from "./DreveskoActionButton";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';

const ListContainer = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    margin-right: 10px;
    height: 100%;
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
                            { cards.map((card, index) => <DreveskoCard key={card.id} index={index} text_opis={card.text_opis} text={card.text} id={card.id} />) }
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