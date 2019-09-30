import React, { useState } from 'react';

import initialData, { InitialData, IColumn, ITask } from "./initial-data";
import Column from './column';

const App: React.FC = () => {
  const [data, setData] = useState<InitialData>(initialData);

  return (
    <div>
      {data.columnOrder.map(columnId => {
        const column: IColumn = data.columns[columnId];
        const tasks: ITask[] = column.taskIds.map(taskId => data.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </div>
  );
};

export default App;
