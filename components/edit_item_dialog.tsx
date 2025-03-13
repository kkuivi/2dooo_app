import React, { ReactNode } from "react";

interface FormDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: Record<string, string>, index: number) => void;
    title: string;
    index: number;
}

const EditItemDialog: React.FC<FormDialogProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    index,
}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        onSubmit(data, index);
        onClose();
    };

    const defaultValue = title;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md">
                {/* Header */}
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-lg font-bold text-black">Edit Item</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                        aria-label="Close dialog"
                    >
                        &times;
                    </button>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 text-black"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder={defaultValue}
                            className="p-2 h-10 mt-1 block w-full border-2 border-solid border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Done
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditItemDialog;
