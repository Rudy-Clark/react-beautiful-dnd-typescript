import React, { useState } from 'react';
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import initialData, { IColumn, ITask } from "../initial-data";
import Column from './column';

const App: React.FC = () => {
  const [data, setData] = useState<initialData>(initialData);

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
  const handleDragEnd: (result: DropResult) => void = result => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;

    if (source.droppableId === destination.droppableId && 
          destination.index === source.index) return;
    
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
  };

  
  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
    >
      {data.columnOrder.map(columnId => {
        const column: IColumn = data.columns[columnId];
        const tasks: ITask[] = column.taskIds.map(taskId => data.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </DragDropContext>
  );
};

export default App;
