import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable({id}) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });
    const classes = isOver ? 'border-2 rounded-md border-lime-400 bg-lime-100' : 'border-2 rounded-md border-lime-400';


    return (
        <div ref={setNodeRef} className={classes}>
            {id}
        </div>
    );
}