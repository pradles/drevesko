import React from "react";
import IconEdit from "@mui/icons-material/Edit";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Textarea from "react-textarea-autosize";
import { connect } from "react-redux";
import { editCard } from "../actions";

class DreveskoEditButton extends React.Component {
  state = {
    formOpen: false,
    text: this.props.text,
    text_opis: this.props.text_opis,
  };

  openForm = () => {
    this.setState({
      formOpen: true,
    });
  };

  closeForm = (e) => {
    this.setState({
      formOpen: false,
      text: this.props.text,
      text_opis: this.props.text_opis,
    });
  };

  handleBlur = ({ currentTarget, relatedTarget }) => {
    if (currentTarget.contains(relatedTarget)) return;
    this.closeForm();
    return;
  };

  handleInputChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleInputChangeOpis = (e) => {
    this.setState({
      text_opis: e.target.value,
    });
  };

  //editcard
  handleEditCard = () => {
    const { dispatch, cardId, listId } = this.props;
    const { text, text_opis } = this.state;

    // Only update text if it is truthy
    const updatedText = text ? text : this.props.text;

    // Only update text_opis if it is truthy
    const updatedTextOpis = text_opis ? text_opis : this.props.text_opis;

    console.log(cardId, updatedText, updatedTextOpis, listId);

    dispatch(editCard(cardId, updatedText, updatedTextOpis, listId));

    return;
};


  //editbutton
  renderEditButton = () => {
    return (
      <div
        onClick={this.openForm}
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          cursor: "pointer",
          
        }}
      >
        <IconEdit />
      </div>
    );
  };

  renderForm = () => {
    const { text, text_opis } = this.props;

    return (
      <div>
        <Card
          onBlur={this.handleBlur}
          style={{
            overflow: "visible",
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px",
          }}
        >
          <CardContent>
          <Typography gutterBottom>
              Title:
            </Typography>
            <Textarea
              id="title"
              placeholder={text}
              autoFocus
              value={this.state.text || text}
              onChange={this.handleInputChange}
              style={{
                overflow: "hidden",
                resize: "none",
                width: "100%",
                outline: "none",
                border: "none",
              }}
            />

            <Typography gutterBottom>
              Opis:
            </Typography>
            <Textarea
              id="opis"
              placeholder={text_opis}
              autoFocus
              value={this.state.text_opis || text_opis}
              onChange={this.handleInputChangeOpis}
              style={{
                overflow: "hidden",
                resize: "none",
                width: "100%",
                outline: "none",
                border: "none",
              }}
            />
          </CardContent>
        </Card>
        <div style={{ marginTop: 8 }}>
          <Button
            onMouseDown={this.handleEditCard}
            variant="contained"
            style={{ color: "white", backgroundColor: "#5aac44" }}
          >
            Save
          </Button>
          
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen
      ? this.renderForm()
      : this.renderEditButton();
  }
}

export default connect() (DreveskoEditButton);