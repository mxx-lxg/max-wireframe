import { useState } from "react";
import List from './List';

export default function Board(props) {
    const [lists, newList] = useState([]);

    //neue Liste anlegen
    function addList(index) {
        const preList = lists.slice(0, index + 1);
        const postList = lists.slice(index + 1, lists.length);

        newList([
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
    function deleteList(id) {
        const targetIndex = lists.findIndex(index => index.id === id);

        console.log("lösche Liste", id);

        const preList = lists.slice(0, targetIndex);
        const postList = lists.slice(targetIndex + 1, lists.length);

        newList([
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
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Board #{props.id}</h1>
            <div className="grid grid-flow-col auto-cols-auto">
                <button
                    className="bg-gray-100 text-gray-900 px-1 py-1 text-sm font-medium"
                    onClick={() => { addList(0) }}>
                    ➕
                </button>

                {lists.map((list, index) => {
                    return (
                        <div key={list.id} className="grid grid-flow-col auto-cols-auto">
                            <div className="border px-3 py-2">
                                <List
                                    id={list.id}
                                    deleteCallback={deleteList}
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
            </div>
        </div>
    );
}