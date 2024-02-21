import { useState, useEffect, useRef } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

//Karten Component
export default function Card(props) {
    //Textinhalt
    const [text, changeText] = useState("");

    //Referenz für Textfeld Fokus
    const inputRef = useRef();

    //DND Hooks
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    //CSS für DND Effetke
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };


    //Beim Anlegen der Karte Textfeld fokusieren
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    //Textänderngen im State speichern
    function setText(value) {
        changeText(value)
        console.log("Text geändert", value)
    }


    return (
        <div className="grid grid-cols-1">
            <div
                id={props.id}
                className="grid grid-flow-col border rounded-md bg-white"
                ref={setNodeRef}
                style={style}
                {...attributes}
            >
                <button
                    {...listeners}
                    className="bg-gray-100 text-gray-900 rounded-md px-3 py-1 text-sm font-medium"
                >
                    ↕️
                </button>
                <textarea
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="leere Karte"
                    ref={inputRef}
                    onChange={
                        e => setText(e.target.value)
                    }
                ></textarea >
                <button
                    className="bg-gray-100 text-gray-900 rounded-md px-1 py-1 text-sm font-medium"
                    onClick={() => { props.deleteCallback(props.id) }}
                >
                    ❌
                </button>
            </div>
            {props.children}
        </div>
    );
}