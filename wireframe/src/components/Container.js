import { useState } from "react";
import Board from './Board';

export default function Container() {
    const [boards, newBoard] = useState([]);

    //Board anlegen
    function addBoard() {
        newBoard([
            ...boards,
            {
                id: boards.length,
                dis: "lololol"
            }
        ])
        console.log('neues Board angelegt');
    }

    return (
        <div className="grid grid-cols-1">
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <button
                            className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                            onClick={addBoard}>
                            neues Board
                        </button>
                    </div>
                </div>
            </nav>
            <ul role="list" className="divide-y divide-gray-100">
                {boards.map((board, index) => {
                    return (
                        <li className="flex justify-between gap-x-6 py-5" key={board.id}>
                            <Board id={index} />
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}