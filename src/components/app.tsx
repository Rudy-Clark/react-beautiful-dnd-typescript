import React, { useState } from 'react';
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';

import initialData, { IColumn, ITask } from "../initial-data";
import Column from './column';

const Container = styled.div`
  display: flex;
`;

const App: React.FC = () => {
  const [data, setData] = useState(initialData);

  /**
   * result @object
   * {
   *  draggableId: @string,
   *  type: @string | 'TYPE',
   *  reason: 'DROP',
   *  source: {
   *    droppableId: @string,
   *    index: @number
   *  },
   *  destination: {
   *    droppableId: @string,
   *    index: @number
   *  }
   * }
   */
  const handleDragEnd = (result: DropResult) => {

    const { destination, source, draggableId, type } = result;
    
    if (!destination) return;

    if (source.droppableId === destination.droppableId && 
          destination.index === source.index) return;

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData(currData => ({
        ...currData,
        columnOrder: newColumnOrder
      }));

      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const column = data.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
    
      const newColumn = {
        ...column,
        taskIds: newTaskIds
      };

      setData(currData => ({
        ...currData,
        columns: {
          ...currData.columns,
          [newColumn.id]: newColumn,
        }
      }));

      return;
    }
    
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    setData(currData => ({
      ...currData,
      columns: {
        ...currData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }));
  };
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable 
        droppableId={'all-columns'} 
        direction="horizontal" 
        type="column"
      >
        {provided => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
          {data.columnOrder.map((columnId, index) => {
            const column: IColumn = data.columns[columnId];
            const tasks: ITask[] = column.taskIds.map(taskId => data.tasks[taskId]);
  
            return <Column
                    key={column.id}
                    column={column} 
                    tasks={tasks}
                    index={index}
                  />;
          })}
          {provided.placeholder}
        </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
