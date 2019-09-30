import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from "react-beautiful-dnd";

import Task from './task'
import { IColumn, ITask } from "../initial-data";


interface Props {
  column: IColumn
  tasks: ITask[]
  index: number
}

interface TaskList {
  isDraggingOver: boolean
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 320px;
  display: flex;
  flex-flow: column wrap;
`;

const Title = styled.h3`
  padding: 8px;
  background-color: #fff;
`;

const TaskList = styled.div`
  padding: 8px;
  background-color: ${(props: TaskList) => props.isDraggingOver ? 'lightgrey' : '#fff'};
  flex-grow: 1;
  min-height: 100px;
`;

const Column: React.FC<Props> = ({ column, tasks, index }) => (
  <Draggable draggableId={column.id} index={index}>
    {provided => (
      <Container {...provided.draggableProps} ref={provided.innerRef}>
        <Title {...provided.dragHandleProps}>{column.title}</Title>
        <Droppable 
          droppableId={column.id}
          type="task"
        >
          {(provided, snapshot) => 
            <TaskList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => <Task key={task.id} index={index} task={task} />)}
              {provided.placeholder}
            </TaskList>
          }
        </Droppable>
      </Container>
    )}
  </Draggable>
);

export default Column;
