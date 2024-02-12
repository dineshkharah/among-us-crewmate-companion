import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Column = ({ column, colors, onDragEnd, inputValues, setInputValues }) => {
  return (

    <>
      <div className="card h-100">
        <div className="card-body">
          <p className="fw-bold mb-4">{column.title}</p>
          <div  className='column-content'>
          <div><Droppable droppableId={column.id} >
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className='card--container'
              >
                {colors.map((color, index) => (
                  <Draggable
                    key={color.id}
                    draggableId={`${color.id}`}
                    index={index}
                  >
                    {(draggbleProvided, draggableSnapshot) => (
                      <div
                        ref={draggbleProvided.innerRef}
                        {...draggbleProvided.draggableProps}
                        {...draggbleProvided.dragHandleProps}
                        className='card--content alert alert-cs-note shadow'
                      >
                        <img src={color.image} alt='' className='card--content--img' />

                        <input
                          type='text'
                          placeholder={`Player ${color.id}`}
                          // Retrieve user input from local storage
                          value={inputValues[`playerInput-${color.id}`] || ''}
                          onChange={(e) => {
                            // Update input values state immediately on typing
                            setInputValues((prevInputValues) => ({
                              ...prevInputValues,
                              [`playerInput-${color.id}`]: e.target.value,
                            }));

                            // Save to local storage immediately
                            const newInputValues = {
                              ...inputValues,
                              [`playerInput-${color.id}`]: e.target.value,
                            };
                            localStorage.setItem('inputValues', JSON.stringify(newInputValues));
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable></div>
          </div>
        </div>
      </div>


      {/* <div className='card' id='scroll-hidden'>
        <div className='card--header'>
          <span className='card--title'>{column.title}</span>
        </div>

        <div className='card-content--container' id='style-3'>
          <Droppable droppableId={column.id} >
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className='card--container'
              >
                {colors.map((color, index) => (
                  <Draggable
                    key={color.id}
                    draggableId={`${color.id}`}
                    index={index}
                  >
                    {(draggbleProvided, draggableSnapshot) => (
                      <div
                        ref={draggbleProvided.innerRef}
                        {...draggbleProvided.draggableProps}
                        {...draggbleProvided.dragHandleProps}
                        className='card--content '
                      >
                        <img src={color.image} alt='' className='card--content--img' />

                        <input
                          type='text'
                          placeholder={`Player ${color.id}`}
                          // Retrieve user input from local storage
                          value={inputValues[`playerInput-${color.id}`] || ''}
                          onChange={(e) => {
                            // Update input values state immediately on typing
                            setInputValues((prevInputValues) => ({
                              ...prevInputValues,
                              [`playerInput-${color.id}`]: e.target.value,
                            }));

                            // Save to local storage immediately
                            const newInputValues = {
                              ...inputValues,
                              [`playerInput-${color.id}`]: e.target.value,
                            };
                            localStorage.setItem('inputValues', JSON.stringify(newInputValues));
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div> */}
    </>
  );
};

export default Column;