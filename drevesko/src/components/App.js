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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #555;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 5px;
  margin-bottom: 10px;
`
const HomeButton = styled.button`
  background-color: lightgray;
  border: none;
  padding: 10px;
  margin-right: 5px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: darkgray;
  }
`;

const MenuButton = styled.button`
  background-color: lightgray;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: darkgray;
  }
`;

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
          <Header>
            <div>
              <HomeButton>Home</HomeButton>
              <MenuButton>Menu</MenuButton>
            </div>
            <div style={{color: 'white'}}>Username</div>
          </Header>
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

const mapStateToProps = state =>({
  lists: state.lists
})

export default connect(mapStateToProps)(App);
