import React from 'react';
import styled from 'styled-components';
import { Droppable } from "react-beautiful-dnd";

import Task from './task'
import { IColumn, ITask } from "../initial-data";


interface Props {
  column: IColumn,
  tasks: ITask[]
}

interface TaskList {
  isDragging: boolean
}
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${ (props: TaskList) => props.isDragging ? 'skyblue' : '#fff' }
`;

const Column: React.FC<Props> = ({ column, tasks }) => (
  <Container>
    <Title>{column.title}</Title>
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => 
        <TaskList isDragging={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, index) => <Task key={task.id} index={index} task={task} />)}
          {provided.placeholder}
        </TaskList>
      }
    </Droppable>
  </Container>
);

export default Column;
