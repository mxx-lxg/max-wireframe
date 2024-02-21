import { useState, useEffect, useRef } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

//eigene Components
import Card from './Card';
import Alert from './Alert';

//Listen Component
export default function List(props) {
    //Listentitel
    const [title, changeTitle] = useState("");

    //Karten in der Liste
    const [cards, setCards] = useState([]);

    //States zum Löschen von Karten
    const [alert, setAlert] = useState(false);
    const [deleteSelect, setDeleteSelect] = useState(null);

    //Referenz für Textfeld Fokus
    const inputRef = useRef();

    //DND Hooks
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    //CSS Style für DND Effekte
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    //Beim Anlegen Textfeld fokusieren
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    //Titel im State speichern
    function setTitle(value) {
        changeTitle(value)
    }

    //Karte absetzeb
    function handleDragEnd(event) {
        const { active, over } = event;

        //Karte im Array an neue Position setzen
        if (active.id !== over.id) {
            setCards((cards) => {
                const oldIndex = cards.findIndex(e => e.id === active.id);
                const newIndex = cards.findIndex(e => e.id === over.id);

                console.log("moved", oldIndex, newIndex)
                return arrayMove(cards, oldIndex, newIndex);
            });
        }
    }

    //neue Karte anlegen
    function addCard(index) {
        const pre = cards.slice(0, index + 1);
        const post = cards.slice(index + 1, cards.length);

        setCards([
            ...pre,
            {
                id: generateId(),
                dis: "neue Karte"
            },
            ...post
        ])

        console.log('neue Karte angelegt', cards);
    }

    //löschwarnung anzeigen
    function deleteCardPrompt(id){
        setDeleteSelect(id);
        console.log("showin prompt");
        setAlert(true);
    }

    //Karte löschen
    function deleteCard(id) {
        const targetIndex = cards.findIndex(index => index.id === id);

        console.log("lösche Karte", id);

        const pre = cards.slice(0, targetIndex);
        const post = cards.slice(targetIndex + 1, cards.length);

        setCards([
            ...pre,
            ...post
        ])
    }

    //Listen-ID generieren
    function generateId() {
        const maxId = Math.max(...cards.map(card => card.id), 0);
        return maxId + 1;
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="grid grid-cols-1 bg-white border-b py-2">
            <Alert 
                show={alert} 
                title="Karte wird gelöscht" 
                text="Wollen Sie diese Karte wirklich löschen?" 
            >
                <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={e => {
                        setAlert(false);
                        deleteCard(deleteSelect);
                    }}
                >Löschen</button>
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={e => setAlert(false)}
                >Abbrechen</button>
            </Alert>
            <div
                className="grid grid-flow-col grid-cols-auto">
                <button
                    {...listeners}
                    className="bg-gray-100 text-gray-900 rounded-md px-3 py-1 text-md font-bold"
                >↔️</button>
                <input
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    placeholder="neue Liste"
                    ref={inputRef}
                    maxLength="150"
                    onChange={
                        e => setTitle(e.target.value)
                    }></input>
                <button
                    className="bg-gray-100 text-gray-900 rounded-md px-1 py-1 text-sm font-medium"
                    onClick={() => { props.deleteCallback(props.id) }}
                >❌</button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <button
                    className="bg-gray-100 text-gray-900 rounded-md px-1 py-1 my-2 text-sm font-medium"
                    onClick={() => { addCard(0) }}
                >➕</button>

                <SortableContext
                    items={cards}
                    strategy={verticalListSortingStrategy}
                >
                    {cards.map((card, index) => {
                        return (
                            <Card
                                key={card.id}
                                id={card.id}
                                deleteCallback={deleteCardPrompt}>
                                <button
                                    className="bg-gray-100 text-gray-900 rounded-md px-1 py-1 my-2 text-sm font-medium"
                                    onClick={() => { addCard(index) }}
                                >➕</button>
                            </Card>
                        )
                    })}
                </SortableContext>
            </DndContext>
        </div>
    );
}