import React, { Component } from 'react';
import DreveskoList from './DreveskoList';
import { connect } from 'react-redux';
import DreveskoActionButton from './DreveskoActionButton';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`

class App extends Component {
  
  onDragEnd = (result) =>{
    const { destination, source, draggableId, type} = result;
    
    if(!destination) {
      return;
    }

    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    ))


  }
  
  render() {

    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
      <div className="App">
        <h1>Hello World</h1>
        <Droppable droppableId='full-site' direction="horizontal" type="list" >
          {provided =>(
            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
              { lists.map((list, index) => 
              <DreveskoList listId={list.id} key={list.id} title={list.title} cards={list.cards} index={index} />
              )}
              {provided.placeholder}
              <DreveskoActionButton list />

            </ListContainer>
          )}
        </Droppable>
      </div>
      </DragDropContext>
    );
  }
}
/*
const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "row",
  }
}
*/
const mapStateToProps = state =>({
  lists: state.lists
})

export default connect(mapStateToProps) (App);
