import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

const Column = ({ column, tasks, onDragEnd }) => {
    return (
        <>
            <div className='card' id='style-3'>
                <div className='card--header'>
                    <span className='card--title'>
                        {column.title}
                    </span>
                </div>

                <Droppable
                    droppableId={column.id}
                >
                    {(droppableProvided, droppableSnapshot) => (
                        <div
                            ref={droppableProvided.innerRef}
                            {...droppableProvided.droppableProps}
                            className='card--container'
                        >
                            {tasks.map((task, index) => (
                                <Draggable
                                    key={task.id}
                                    draggableId={`${task.id}`}
                                    index={index}
                                >
                                    {(draggbleProvided, draggableSnapshot) =>
                                        <div
                                            ref={draggbleProvided.innerRef}
                                            {...draggbleProvided.draggableProps}
                                            {...draggbleProvided.dragHandleProps}
                                            className='card--content '
                                        >
                                            <img src={task.image} alt="" className='card--content--img' />
                                            <input
                                                type="text"
                                                placeholder={`Player ${task.id} `}
                                                {...draggbleProvided.dragHandleProps}
                                            />
                                        </div>
                                    }
                                </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                        </div>

                    )}

                </Droppable>

            </div>
        </>
    )
}

export default Column