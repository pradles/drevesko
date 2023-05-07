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
import DreveskoDeleteButton from "./DreveskoDeleteButton";

const CardContainer = styled.div`
  margin-bottom: 8px;
  padding: 0px;
  position: relative;

  &:hover .buttons {
    visibility: visible;
  }

  .buttons {
    visibility: hidden;
  }
`;


const DreveskoCard = ({text_opis, text, cardId, index, listId}) =>{
  return(
    <Draggable draggableId={String(cardId)} index={index} >
      {provided =>(
        <CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Card sx={{ background: 'rgba(255, 255, 255, 0.8);' }}>
            <CardContent>
              <Typography>
                <b>{text}</b>
                <hr></hr>
              </Typography>
              <Typography>
                {text_opis}
              </Typography>
                <DreveskoEditButton cardId={cardId} listId={listId} text={text} text_opis={text_opis} /> 
              <div className="buttons">
                <DreveskoDeleteButton cardId={cardId} listId={listId}/>
              </div>
            </CardContent>
          </Card>    
        </CardContainer>
      )}
    </Draggable>
  )
}


export default DreveskoCard;
