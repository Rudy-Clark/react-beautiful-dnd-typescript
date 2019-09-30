import React from 'react';
import styled from 'styled-components';

import { ITask } from "./initial-data";

interface Props {
  task: ITask
}

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
`;

const Task: React.FC<Props> = ({ task }) => <Container>{task.content}</Container>;

export default Task;
