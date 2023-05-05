import React from "react";
import IconEdit from "@mui/icons-material/Edit";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Textarea from "react-textarea-autosize";
import { connect } from "react-redux";
import { editCard } from "../actions";

class DreveskoEditButton extends React.Component {
  state = {
    formOpen: false,
    text: "",
    text_opis: "",
  };

  openForm = () => {
    this.setState({
      formOpen: true,
    });
  };

  closeForm = (e) => {
    this.setState({
      formOpen: false,
      text: "",
      text_opis: "",
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
    const { dispatch, cardId } = this.props;
    const { text, text_opis } = this.state;

    if (text) {
      this.setState({
        text: "",
        text_opis: "",
      });
      dispatch(editCard(cardId, text, text_opis));
    }
    return;
  };

  //editbutton
  renderEditButton = () => {
    return (
      <div
        id="edit"
        onClick={this.openForm}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          cursor: "pointer",
          
        }}
      >
        <IconEdit />
      </div>
    );
  };

  renderForm = () => {
    const { cardText, cardOpis } = this.props;

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
              placeholder={cardText}
              autoFocus
              value={this.state.text || cardText}
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
              placeholder={cardOpis}
              autoFocus
              value={this.state.text_opis || cardOpis}
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