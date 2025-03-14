import React, { ReactNode } from "react";

export interface TodoItemCardProps {
    index: number;
    title: string;
    onMarkAsDone: (index: number) => void;
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}

const TodoItemCard: React.FC<TodoItemCardProps> = ({
    index,
    title,
    onMarkAsDone,
    onEdit,
    onDelete,
}) => {
    return (
        <div
            className="w-md rounded overflow-hidden shadow-lg bg-white"
            key={index}
        >
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-black text-center">
                    {title}
                </div>
                <div className="flex space-x-2">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => onMarkAsDone(index)}
                    >
                        Mark As Done
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => onEdit(index)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => onDelete(index)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoItemCard;
