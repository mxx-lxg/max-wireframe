import { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';


import List from './List';
import Alert from './Alert';

export default function Board(props) {
    const [lists, setLists] = useState([]);
    const [alert, setAlert] = useState(false);
    const [deleteSelect, setDeleteSelect] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event) {
        const { active, over } = event;


        if (active.id !== over.id) {
            setLists((lists) => {
                const oldIndex = lists.findIndex(e => e.id === active.id);
                const newIndex = lists.findIndex(e => e.id === over.id);

                console.log("moved", oldIndex, newIndex)
                return arrayMove(lists, oldIndex, newIndex);
            });
        }
    }


    //neue Liste anlegen
    function addList(index) {
        const preList = lists.slice(0, index + 1);
        const postList = lists.slice(index + 1, lists.length);

        setLists([
            ...preList,
            {
                id: generateId(),
                dis: "neue Liste"
            },
            ...postList
        ])

        console.log('neue Liste angelegt', lists);
    }

    //Liste löschen
    function deleteListPrompt(id){
        setDeleteSelect(id);
        console.log("showin prompt");
        setAlert(true);
    }

    function deleteList(id) {
        const targetIndex = lists.findIndex(index => index.id === id);

        console.log("lösche Liste", id);

        const preList = lists.slice(0, targetIndex);
        const postList = lists.slice(targetIndex + 1, lists.length);

        setLists([
            ...preList,
            ...postList
        ])
    }

    //Listen-ID generieren
    function generateId() {
        const maxId = Math.max(...lists.map(list => list.id), 0);
        return maxId + 1;
    }

    return (
        <div>
            <Alert 
                show={alert} 
                title="Liste wird gelöscht" 
                text="Wollen Sie diese Liste wirklich löschen?" 
            >
                <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={e => {
                        setAlert(false);
                        deleteList(deleteSelect);
                    }}
                >Löschen</button>
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={e => setAlert(false)}
                >Abbrechen</button>
            </Alert>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Board #{props.id}</h1>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}>
                <div className="grid grid-flow-col auto-cols-auto">

                    <button
                        className="bg-gray-100 text-gray-900 px-1 py-1 text-sm font-medium"
                        onClick={() => { addList(0) }}>
                        ➕
                    </button>
                    <SortableContext
                        items={lists}
                        strategy={horizontalListSortingStrategy}
                    >
                        {lists.map((list, index) => {
                            return (
                                <div key={list.id} className="grid grid-flow-col auto-cols-auto">
                                    <div className="border px-3 py-2">
                                        <List
                                            id={list.id}
                                            deleteCallback={deleteListPrompt}
                                        />
                                    </div>
                                    <button
                                        className="bg-gray-100 text-gray-900 px-1 py-1 text-sm font-medium"
                                        onClick={() => { addList(index) }}>
                                        ➕
                                    </button>

                                </div>
                            )
                        })}
                    </SortableContext>
                </div>
            </DndContext>


            </div>
    );
}