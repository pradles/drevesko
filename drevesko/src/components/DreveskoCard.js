import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';


const CardContainer = styled.div`
    margin-bottom: 8px;
    padding: 0px;
`

const DreveskoCard = ({text, id, index}) =>{
    return(
        <Draggable draggableId={String(id)} index={index} >
            {provided =>(
                <CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Card>
                        <CardContent>
                            <Typography>
                                {text}
                            </Typography>
                            <Typography>
                                opis
                            </Typography>
                        </CardContent>
                    </Card>     
                </CardContainer>
            )}
        </Draggable>
    )
}


export default DreveskoCard;