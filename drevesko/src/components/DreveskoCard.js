import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import DreveskoEditButton from "./DreveskoEditButton";


const CardContainer = styled.div`
  margin-bottom: 8px;
  padding: 0px;
  position: relative;
  &:hover {
    button {
      visibility: visible;
    }
  }
`;

const DreveskoCard = ({text_opis, text, cardId, index, listId}) =>{
  return(
    <Draggable draggableId={String(cardId)} index={index} >
      {provided =>(
        <CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Card>
            <CardContent>
              <Typography>
                {text}
              </Typography>
              <Typography>
                {text_opis}
              </Typography>
              <DreveskoEditButton cardId={cardId} listId={listId} text={text} text_opis={text_opis} /> 
            </CardContent>
          </Card>    
        </CardContainer>
      )}
    </Draggable>
  )
}


export default DreveskoCard;
