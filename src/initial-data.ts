// @ts-ignore
interface Tasks {
  [key: string]: {
      id: string,
      content: string,
  },
}

interface Columns {
  id: string,
  title: string,
  taskIds: string[]
}

export interface InitialData  {
  tasks: Tasks,
  columns: Columns
  columnOrder: string[]
}

const initialData: Readonly<InitialData> = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
  },
  columns: {
    id: 'column-1',
    title: 'To do',
    taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
  },
  columnOrder: ['column-1'],
};

export default initialData;

