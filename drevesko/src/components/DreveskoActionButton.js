import React from "react";
import IconAdd from "@mui/icons-material/Add";
import IconClose from "@mui/icons-material/Close";
import { Button, Card } from "@mui/material";
import Textarea from "react-textarea-autosize"
import { connect } from "react-redux";
import { addList, addCard } from "../actions"

class DreveskoActionButton extends React.Component{

    state = {
        formOpen: false,
        text: ""
    };

    openForm = () => {
        this.setState({
            formOpen: true
        });
    };

    closeForm = e => {
        this.setState({
            formOpen: false
        })
    }

    handleInputChange = e =>{
        this.setState({
            text: e.target.value
        })
    }

    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;

        if(text) {
            this.setState({
                text: ""
            })
            dispatch(addList(text));
        }
        return;
    }

    handleAddCard = () => {
        const { dispatch, listId } = this.props;
        const { text } = this.state;

        if(text) {
            this.setState({
                text: ""
            })
            dispatch(addCard(listId, text));
        }
        return;
    }

    renderAddButton = () => {
        const { list } = this.props;

        const buttonText = list ? "Add another list" : "Add another card";
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

        return(
            <div onClick={this.openForm}
            style={{
                ...styles.buttonContainer,
                opacity: buttonTextOpacity,
                color: buttonTextColor,
                background: buttonTextBackground
            }}>
                <IconAdd/>
                <p>{buttonText}</p>
            </div>
        )
    }

    renderForm = () => {
        const { list } = this.props;
        const placeholder = list ? "Enter list title..." : "Enter title for this card...";
        const buttonTitle = list ? "Add list" : "Add card";

        return (
            <div>
                <Card style={{
                    overflow: "visible",
                    minHeight: 80,
                    minWidth: 272,
                    padding: "6px 8px 2px"
                }}>
                <Textarea  
                    placeholder={placeholder}
                    autoFocus
                    onBlur={this.closeForm}
                    value={this.state.text}       
                    onChange={this.handleInputChange}      
                    style={{
                        overflow: "hidden",
                        resize: "none",
                        width: "100%",
                        outline: "none",
                        border: "none"
                    }} 
                />
                </Card>
                <div style={styles.formButtonGroup}>
                    <Button 
                        onMouseDown={ list ? this.handleAddList: this.handleAddCard}
                        variant="contained" 
                        style={{color: "white", backgroundColor: "#5aac44"}}>
                    {buttonTitle}</Button>

                    <IconClose style={{marginLeft: 8, cursor: "pointer"}} />
                </div>
            </div>
        );
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }

}

const styles = {
    buttonContainer: {
        display: "Flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadious: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },
    formButtonGroup: {
        marginTop: 8,
        display: "flex",
        alignItems: "center"
    }
}


export default connect() (DreveskoActionButton);