import { useState, useEffect, useRef } from "react";

export default function List({ id, deleteCallback }) {
    const [title, changeTitle] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    function setTitle(value) {
        changeTitle(value)
        console.log("title Titel geändert", title)
    }

    return (
        <div>
            <p>id: {id}</p>
            <button
                className="bg-gray-900 text-white rounded-md px-1 py-1 text-sm font-medium"
                onClick={() => { deleteCallback(id) }}
            >löschen</button>
            <input
                className="outline rounded-md px-3 py-2 text-sm font-medium"
                type="text"
                defaultValue="neue Liste"
                ref={inputRef}
                maxLength="150"
                onChange={
                    e => setTitle(e.target.value)
                }></input>
        </div>
    );
}