import React, { ReactNode } from "react";
import { useState } from "react";
import CreateItemDialog from "@/components/create_item_dialog";
import TodoItem from "@/components/todo_item";
import EditItemDialog from "@/components/edit_item_dialog";
import { Reorder } from "motion/react";

// To do:
// 5. Create a database that allows users to retrieve items from the database as well as add items to the database
// 6. Connect frontend to the database
// 7. Allow creating accounts

type TodoItem = {
    title: string;
};

export default function Home() {
    const [items, setItems] = useState<TodoItem[]>([]);
    const [showAddItemDialog, setShowAddItemDialog] = useState<boolean>(false);
    const [showEditItemDialog, setShowEditItemDialog] =
        useState<boolean>(false);
    const [titleOfItemToEdit, setTitleOfItemToEdit] = useState<string>("");
    const [indexOfItemToEdit, setIndexOfItemToEdit] = useState<number>(0);

    const handleAddItemDialogClose = () => {
        setShowAddItemDialog(false);
    };

    const handleEditItemDialogClose = () => {
        setShowEditItemDialog(false);
    };

    const handleAddItemFormSubmit = (formData: Record<string, string>) => {
        setItems([...items, { title: formData.title }]);
    };

    const handleEditItemFormSubmit = (
        formData: Record<string, string>,
        index: number
    ) => {
        const newTitle = formData.title;
        const item = items[index];
        item.title = newTitle;

        const newArray = [...items];
        newArray[index] = item;
        setItems(newArray);
    };

    const onMarkAsDone = (index: number) => {
        const newArray = items.filter((_, i) => i !== index);
        setItems(newArray);
    };

    const onEdit = (index: number) => {
        setIndexOfItemToEdit(index);
        setTitleOfItemToEdit(items[index].title);
        setShowEditItemDialog(true);
    };

    const onDelete = (index: number) => {
        const newArray = items.filter((_, i) => i !== index);
        setItems(newArray);
    };

    return (
        <>
            <h1 className="text-center font-mono text-3xl font-semibold m-12">
                Welcome to 2dooo
            </h1>
            <Reorder.Group
                values={items}
                onReorder={setItems}
                className=" flex flex-col items-center gap-4 mb-8"
            >
                {items.map((item, index) => {
                    return (
                        <Reorder.Item axis="y" value={item} key={index}>
                            <TodoItem
                                index={index}
                                title={item.title}
                                onMarkAsDone={() => onMarkAsDone(index)}
                                onEdit={() => onEdit(index)}
                                onDelete={() => onDelete(index)}
                            />
                        </Reorder.Item>
                    );
                })}
            </Reorder.Group>
            {/* </div> */}
            <div className="flex justify-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowAddItemDialog(true)}
                >
                    Add Item
                </button>
            </div>
            <CreateItemDialog
                isOpen={showAddItemDialog}
                onClose={handleAddItemDialogClose}
                onSubmit={handleAddItemFormSubmit}
                title="Add Item"
            />
            <EditItemDialog
                isOpen={showEditItemDialog}
                onClose={handleEditItemDialogClose}
                onSubmit={handleEditItemFormSubmit}
                title={titleOfItemToEdit}
                index={indexOfItemToEdit}
            />
        </>
    );
}
