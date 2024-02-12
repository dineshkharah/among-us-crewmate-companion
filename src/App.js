import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import Column from './components/Column';
import Navbar from './components/Navbar';
import colorsData from './components/colorsData';
import columnsData from './components/cardData';

export default function App() {
  const storedState = JSON.parse(localStorage.getItem('appState'));
  
  // Use stored state if available, otherwise use the initial state
  const [state, setState] = useState(
    storedState || {
      colors: colorsData,
      columns: columnsData,
      columnOrder: columnsData.columnOrder,
    }
  );

  // Separate state for input values
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    // Initialize input values from local storage
    const storedInputValues = JSON.parse(localStorage.getItem('inputValues')) || {};
    setInputValues(storedInputValues);
  }, []);

  const saveToLocalStorage = (newState, newInputValues) => {
    localStorage.setItem('appState', JSON.stringify(newState));
    localStorage.setItem('inputValues', JSON.stringify(newInputValues));
    setState(newState);
    setInputValues(newInputValues);
  };

  const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newColorIds = Array.from(sourceCol.ColorIds);
    const [removed] = newColorIds.splice(startIndex, 1);
    newColorIds.splice(endIndex, 0, removed);
    const newColumn = {
      ...sourceCol,
      ColorIds: newColorIds,
    };

    // Save the changes to local storage
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };

    saveToLocalStorage(newState, inputValues);
    return newColumn;
  };

  // const onDragEnd = (result) => {
  //   const { destination, source } = result;

  //   if (!destination) return;

  //   const sourceCol = state.columns[source.droppableId];
  //   const destinationCol = state.columns[destination.droppableId];

  //   let newColumn; // Explicitly define newColumn

  //   if (sourceCol.id === destinationCol.id) {
  //     newColumn = reorderColumnList(
  //       sourceCol,
  //       source.index,
  //       destination.index
  //     );

  //     const newState = {
  //       ...state,
  //       columns: {
  //         ...state.columns,
  //         [newColumn.id]: newColumn,
  //       },
  //     };

  //     saveToLocalStorage(newState, inputValues);
  //     return;
  //   }

  //   const startColorIds = Array.from(sourceCol.ColorIds);
  //   const [removed] = startColorIds.splice(source.index, 1);
  //   const newStartCol = {
  //     ...sourceCol,
  //     ColorIds: startColorIds,
  //   };

  //   const endColorIds = Array.from(destinationCol.ColorIds);
  //   endColorIds.splice(destination.index, 0, removed);
  //   const newEndCol = {
  //     ...destinationCol,
  //     ColorIds: endColorIds,
  //   };

  //   const newState = {
  //     ...state,
  //     columns: {
  //       ...state.columns,
  //       [newStartCol.id]: newStartCol,
  //       [newEndCol.id]: newEndCol,
  //     },
  //   };

  //   saveToLocalStorage(newState, inputValues);
  // };
  const onDragEnd = (result) => {
    const { destination, source } = result;
  
    if (!destination) return;
  
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];
  
    if (sourceCol.id === destinationCol.id) {
      // If dragging within the same column
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );
      const reorderedColors = Array.from(sourceCol.ColorIds);
      reorderedColors.splice(source.index, 1);
      reorderedColors.splice(destination.index, 0, sourceCol.ColorIds[source.index]);
  
      // const newColumn = {
      //   ...sourceCol,
      //   ColorIds: reorderedColors,
      // };
  
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
  
      saveToLocalStorage(newState, inputValues);
      return;
    }
  
    // If dragging between different columns
    const startColorIds = Array.from(sourceCol.ColorIds);
    const [removed] = startColorIds.splice(source.index, 1);
  
    const newStartCol = {
      ...sourceCol,
      ColorIds: startColorIds,
    };
  
    const endColorIds = Array.from(destinationCol.ColorIds);
    endColorIds.splice(destination.index, 0, removed);
  
    const newEndCol = {
      ...destinationCol,
      ColorIds: endColorIds,
    };
  
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };
  
    saveToLocalStorage(newState, inputValues);
  };


   // Function to reset positions while retaining typed content
   const resetPositionsRetainContent = () => {
    const resetState = {
      ...state,
      columns: {
        ...columnsData,
      },
    };
    setState(resetState);
    saveToLocalStorage(resetState, inputValues);
  };

  // Function to reset positions and clear typed content
  const resetPositionsClearContent = () => {
    const resetState = {
      colors: colorsData,
      columns: columnsData,
      columnOrder: columnsData.columnOrder,
    };
    setState(resetState);
    setInputValues({}); // Clear typed content
    localStorage.removeItem('inputValues'); // Remove from local storage
  };
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      
      <div>
        <Navbar />
        <div className='buttons-container'>
          <button className='button' onClick={resetPositionsRetainContent}>New game</button>
          <button className='button delete' onClick={resetPositionsClearContent}>Reset game</button>
        </div>
        <div className='main--content'>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const colors = column.ColorIds.map(
              (ColorId) => state.colors[ColorId]
            );

            return (
              <Column
                key={column.id}
                column={column}
                colors={colors}
                onDragEnd={onDragEnd}
                inputValues={inputValues}
                setInputValues={setInputValues}
              />
            );
          })}
        </div>
        
      </div>
    </DragDropContext>
  );
}
