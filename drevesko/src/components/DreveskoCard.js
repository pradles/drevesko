import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const DreveskoCard = () =>{
    return(
        <Card>
            <CardContent>
                <Typography>
                    Naslov
                </Typography>
                <Typography>
                    opis
                </Typography>
            </CardContent>
    </Card>
    )
}

export default DreveskoCard;