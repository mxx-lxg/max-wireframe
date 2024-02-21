import { useState, useEffect, useRef } from "react";
import Card from './Card';

export default function List({ id, deleteCallback }) {
    const [title, changeTitle] = useState("");
    const [cards, newCard] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    function setTitle(value) {
        changeTitle(value)
        console.log("title Titel geändert", title)
    }


    //neue Karte anlegen
    function addCard(index) {
        const pre = cards.slice(0, index + 1);
        const post = cards.slice(index + 1, cards.length);

        newCard([
            ...pre,
            {
                id: generateId(),
                dis: "neue Karte"
            },
            ...post
        ])

        console.log('neue Karte angelegt', cards);
    }

    //Karte löschen
    function deleteCard(id) {
        const targetIndex = cards.findIndex(index => index.id === id);

        console.log("lösche Karte", id);

        const pre = cards.slice(0, targetIndex);
        const post = cards.slice(targetIndex + 1, cards.length);

        newCard([
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
        <div className="grid grid-cols-1">
            <div className="grid grid-cols-2">
                <p>id: {id}</p>
                <button
                    className="bg-gray-900 text-white rounded-md px-1 py-1 text-sm font-medium"
                    onClick={() => { deleteCallback(id) }}
                >Liste löschen</button>
            </div>
            <div className="border-b py-2">
                <input
                    className="outline border rounded-md px-3 py-2 text-sm font-medium"
                    type="text"
                    defaultValue="neue Liste"
                    ref={inputRef}
                    maxLength="150"
                    onChange={
                        e => setTitle(e.target.value)
                    }></input>
            </div>
                <button
                    className="bg-gray-200 text-gray-900 rounded-md px-1 py-1 my-2 text-sm font-medium"
                    onClick={() => { addCard(0) }}
                >neue Karte</button>

            {cards.map((card, index) => {
                return (
                    <div key={card.id} className="grid grid-cols-1">
                        <Card
                            id={card.id}
                            deleteCallback={deleteCard} />
                        <button
                            className="bg-gray-200 text-gray-900 rounded-md px-1 py-1 my-2 text-sm font-medium"
                            onClick={() => { addCard(index) }}
                        >neue Karte</button>
                    </div>
                )
            })}
        </div>
    );
}