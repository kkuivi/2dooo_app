import React, { ReactNode, useCallback, useEffect } from "react";
import { useState } from "react";
import CreateItemDialog from "@/components/create_item_dialog";
import TodoItemCard from "@/components/todo_item";
import EditItemDialog from "@/components/edit_item_dialog";
import { Reorder } from "motion/react";
import { createClient } from "@/utils/supabase/server";
import TodoItem from "@/data/todo_item";

// To do:
// 7. Allow creating accounts

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
        setItems([
            ...items,
            {
                title: formData.title,
                id: null,
                done: null,
                created_at: null,
            },
        ]);
        addNewToDoItemToDB(formData.title);
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

        markItemAsDoneInDB(items[index]).catch(console.error);
    };

    const onEdit = (index: number) => {
        setIndexOfItemToEdit(index);
        setTitleOfItemToEdit(items[index].title);
        setShowEditItemDialog(true);
    };

    const onDelete = (index: number) => {
        const newArray = items.filter((_, i) => i !== index);
        setItems(newArray);

        deleteItemFromDB(items[index]).catch(console.error);
    };

    const addNewToDoItemToDB = async (title: string) => {
        const supabase = await createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const result = await supabase
            .from("ToDoItems")
            .insert({ title: title });
    };

    const getToDoItemsFromDB = useCallback(async () => {
        const supabase = await createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data } = await supabase
            .from("ToDoItems")
            .select()
            .eq("done", false);
        console.log(data);

        if (data) {
            const todoItems: TodoItem[] = [];
            data.map((item) => {
                todoItems.push({
                    title: item.title,
                    id: item.id,
                    done: item.done,
                    created_at: item.created_at,
                });
            });

            setItems(todoItems);
        }
    }, []);

    const markItemAsDoneInDB = async (todoItem: TodoItem) => {
        const supabase = await createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const data = await supabase
            .from("ToDoItems")
            .update({ done: true })
            .eq("id", todoItem.id);
    };

    const deleteItemFromDB = async (todoItem: TodoItem) => {
        const supabase = await createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        console.log(todoItem);
        const response = await supabase
            .from("ToDoItems")
            .delete()
            .eq("id", todoItem.id);
    };

    useEffect(() => {
        getToDoItemsFromDB().catch(console.error);
    }, [getToDoItemsFromDB]);

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
                            <TodoItemCard
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
