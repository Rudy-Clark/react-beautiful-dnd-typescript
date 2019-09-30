import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import { ITask } from "../initial-data";

interface Props {
  task: ITask,
  index: number,
}

interface Container {
  isDragging: boolean
}

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${(props: Container) => props.isDragging ? 'lightgreen' : '#fff'};
`;

// @param snapshot
//
// @draggable
// draggableSnapshot = {
//  isDragging: true,
//  draggingOver: 'column-1'
// }
// 
// @droppable
// droppableSnapshot = {
//  isDraggingOver: true,
//  draggingOverWith: 'task-1'
// }
//

const Task: React.FC<Props> = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <Container
      {...provided.dragHandleProps}
        {...provided.draggableProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {task.content}
      </Container>
    )}
  </Draggable>
);

export default Task;
