import React from "react";
import IconDelete from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import { deleteCard } from "../actions";

class DreveskoDeleteButton extends React.Component {
    handleDeleteCard = () => {
        const { dispatch, listId, cardId } = this.props;
        dispatch(deleteCard(listId, cardId));
      };

  renderDeleteButton = () => {
    return (
      <div
        id="delete"
        onClick={this.handleDeleteCard}
        style={{
          position: "absolute",
          top: 55,
          right: 6,
          cursor: "pointer",
        }}
      >
        <IconDelete />
      </div>
    );
  };

  render() {
    return this.renderDeleteButton();
  }
}

export default connect()(DreveskoDeleteButton);

