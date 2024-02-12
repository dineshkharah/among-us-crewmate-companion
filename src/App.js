
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import Column from './components/Column';
import Navbar from './components/Navbar';
import { useState } from 'react';
import tasksData from './components/tasksData'
import columnsData from './components/cardData'

export default function App() {
  const [state, setState] = useState({
    tasks: tasksData,
    columns: columnsData,
    columnOrder: columnsData.columnOrder,
  })

  const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);

    const newColumn = {
      ...sourceCol,
      taskIds: newTaskIds,
    };

    return newColumn;
  };

  const onDragEnd = (result) => {
    // console.log('Drag End Event:', result);
    const { destination, source } = result
    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Navbar />
        <div className='main--content'>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

            return (
              <
                Column key={column.id}
                column={column}
                tasks={tasks}
                onDragEnd={onDragEnd}
              />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

