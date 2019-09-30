import React from 'react';
import styled from 'styled-components';

import Task from './task'
import { IColumn, ITask } from "./initial-data";


interface Props {
  column: IColumn,
  tasks: ITask[]
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
`;

const Column: React.FC<Props> = ({ column, tasks }) => (
  <Container>
    <Title>{column.title}</Title>
    <TaskList>{tasks.map(task => <Task key={task.id} task={task} />)}</TaskList>
  </Container>
);


export default Column;
