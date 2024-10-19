"use client";

import { UserContact } from "@/models";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface CreateContactModalProps {
    onCreate: (contact: UserContact) => void;
    onClose: () => void;
    contact?: UserContact; // Optional for editing
}

const CreateContactModal = ({ onCreate, onClose, contact }: CreateContactModalProps) => {
    const [newContact, setNewContact] = useState<UserContact>({
        contactId: uuidv4() as string,
        contactName: "",
        contactNumber: "",
        contactAddress: "",
        postalCode: "",
        defaultContact: false,
    });

    useEffect(() => {
        if (contact) {
            setNewContact(contact);
        }
    }, [contact]);

    const handleSubmit = () => {
        if (!newContact.contactName || !newContact.contactNumber || !newContact.contactAddress || !newContact.postalCode) {
            alert("All fields are required.");
            return;
        }

        onCreate(newContact);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h3 className="text-lg font-bold mb-4">
                    {contact ? "Edit Contact" : "Create New Contact"}
                </h3>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Name</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded-md"
                        value={newContact.contactName}
                        onChange={(e) => setNewContact({ ...newContact, contactName: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Phone Number</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded-md"
                        value={newContact.contactNumber}
                        onChange={(e) => setNewContact({ ...newContact, contactNumber: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Address</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded-md"
                        value={newContact.contactAddress}
                        onChange={(e) => setNewContact({ ...newContact, contactAddress: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Postal Code</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded-md"
                        value={newContact.postalCode}
                        onChange={(e) => setNewContact({ ...newContact, postalCode: e.target.value })}
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                        {contact ? "Save" : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateContactModal;