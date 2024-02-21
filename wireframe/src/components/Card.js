import { useState, useEffect, useRef } from "react";

export default function Card({ id, deleteCallback }) {
    const [text, changeText] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);
    
    
    function setText(value) {
        changeText(value)
        console.log("Text geändert", value)
    }

    return(
        <div className="grid grid-flow-col border rounded-md px-4 py-2">
            <textarea 
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="leere Karte"
                ref={inputRef}
                onChange={
                    e => setText(e.target.value)
                }></textarea >
                <button
                    className="block text-sm font-medium leading-6 text-gray-900 px-2 py-2 text-center"
                    onClick={() => { deleteCallback(id) }}
                >löschen</button>
        </div>
    );
}