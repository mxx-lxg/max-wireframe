import { useState, useEffect, useRef } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Card(props) {
    const [text, changeText] = useState("");
    const inputRef = useRef();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };



    useEffect(() => {
        inputRef.current.focus();
    }, []);


    function setText(value) {
        changeText(value)
        console.log("Text geändert", value)
    }

    return (
        <div className="grid grid-cols-1">
            <div id={props.id} className="grid grid-flow-col border rounded-md px-4 py-2 bg-white"
                ref={setNodeRef}
                style={style}
                {...attributes}>
                    <p 
                {...listeners}>id: {props.id}</p>
                <textarea
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="leere Karte"
                    ref={inputRef}
                    onChange={
                        e => setText(e.target.value)
                    }></textarea >
                <button
                    className="block text-sm font-medium leading-6 text-gray-900 px-2 py-2 text-center"
                    onClick={() => { props.deleteCallback(props.id) }}
                >löschen</button>
            </div>
            {props.children}
        </div>
    );
}