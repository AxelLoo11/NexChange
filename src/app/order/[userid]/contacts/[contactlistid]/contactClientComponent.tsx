"use client";

import CreateContactModal from '@/components/ContactModal';
import Navigation from '@/components/Navigation';
import { UserContact } from '@/models';
import Link from 'next/link';
import React, { useState } from 'react';

export default function ContactClientComponent({
    contactsFromServer, userId, contactListId
}: {
    contactsFromServer: UserContact[]; userId: string; contactListId: string
}) {
    const [contacts, setContacts] = useState<UserContact[]>(contactsFromServer);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<UserContact | null>(null);

    const handleSetDefault = async (contactId: string) => {
        const updateContact = contacts.find((ct) => ct.contactId === contactId);
        const oridefaultContact = contacts.find((ct) => ct.defaultContact === true);

        if (!updateContact) {
            alert("Error set default");
        }

        console.log(`Set contact ${contactId} as Default ...`);
        console.log(JSON.stringify({ ...updateContact, defaultContact: true }));

        const newdefaultres = await fetch(`/api/user/contact`, {
            method: 'PUT',
            cache: 'no-store',
            credentials: 'include',
            body: JSON.stringify({ ...updateContact, defaultContact: true })
        });
        if (!newdefaultres.ok) {
            alert("Update default contact failed ...");
            return;
        }

        if (oridefaultContact) {
            const oridefaultres = await fetch(`/api/user/contact`, {
                method: 'PUT',
                cache: 'no-store',
                credentials: 'include',
                body: JSON.stringify({ ...oridefaultContact, defaultContact: false })
            });
            if (!oridefaultres.ok) {
                alert("Update default contact failed ... ...");
                return;
            }
        }

        setContacts((prevContacts) =>
            prevContacts.map((contact) =>
                contact.contactId === contactId
                    ? { ...contact, defaultContact: true }
                    : { ...contact, defaultContact: false }
            )
        );
    };

    const handleEdit = (contactId: string) => {
        const contactToEdit = contacts.find((contact) => contact.contactId === contactId);
        if (contactToEdit) {
            setEditingContact(contactToEdit);
            setIsModalOpen(true);
        }
    };

    const handleDelete = async (contactId: string) => {
        const res = await fetch(`/api/user/contact?contactListId=${contactListId}&contactId=${contactId}`, {
            method: 'DELETE',
            cache: 'no-store',
            credentials: 'include',
        });

        if (!res.ok) {
            alert("Delete Contact failed ...");
            return;
        }

        setContacts((prevContacts) =>
            prevContacts.filter((contact) => contact.contactId !== contactId)
        );
    };

    const handleSaveContact = async (updatedContact: UserContact) => {
        const res = await fetch("/api/user/contact", {
            method: 'PUT',
            cache: 'no-store',
            credentials: 'include',
            body: JSON.stringify(updatedContact)
        });

        if (!res.ok) {
            alert("Update contact failed ...");
            return;
        }

        setContacts((prevContacts) =>
            prevContacts.map((contact) =>
                contact.contactId === updatedContact.contactId ? updatedContact : contact
            )
        );
        setIsModalOpen(false);
        setEditingContact(null);
    };

    const handleCreateContact = async (newContact: UserContact) => {
        const body = JSON.stringify({
            contactListId: newContact.contactListId,
            contactName: newContact.contactName,
            contactAddress: newContact.contactAddress,
            postalCode: newContact.postalCode,
            contactNumber: newContact.contactNumber,
            defaultContact: newContact.defaultContact,
        });

        const res = await fetch("/api/user/contact", {
            method: 'POST',
            cache: 'no-store',
            credentials: 'include',
            body: body
        });

        if (!res.ok) {
            alert("Add new contact failed ...");
            return;
        }

        const data = await res.json();

        setContacts((prevContacts) => [...prevContacts, data]);
        setIsModalOpen(false);
    };

    return (
        <div className="bg-gray-100 min-h-[calc(100vh-5rem)] lg:flex w-full">
            <div className='lg:w-40 w-0'>
                <Navigation />
            </div>

            <div className="flex flex-col p-4 bg-gray-50 overflow-auto w-full lg:w-[calc(100vw-10rem)]">
                <Link href={`/order/${userId}`} className='w-full bg-yellow-400 rounded-lg hover:bg-yellow-600 p-4 text-white font-bold'>
                    &#11207; Return
                </Link>
                <h2 className="text-2xl font-bold mb-6">Select Default Contact</h2>

                {contacts.map((contact) => (
                    <div
                        key={contact.contactId}
                        className={`w-full bg-white shadow-md rounded-lg p-4 mb-4 border-2 ${contact.defaultContact ? "border-green-500" : "border-gray-300"
                            }`}
                    >
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-lg font-bold">{contact.contactName}</h3>
                                <p>{contact.contactNumber}</p>
                                <p>{`${contact.contactAddress} - ${contact.postalCode}`}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    id={`SAD-${contact.contactId}`}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleSetDefault(contact.contactId);
                                    }}
                                    className={`px-3 py-2 text-sm ${contact.defaultContact
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-green-500 text-white hover:bg-green-600"
                                        } rounded-md`}
                                    disabled={contact.defaultContact}
                                >
                                    Set As Default
                                </button>
                                <button
                                    id={`EDIT-${contact.contactId}`}
                                    onClick={(event) => {
                                        event.stopPropagation();  // Prevent any parent handlers from triggering
                                        handleEdit(contact.contactId);
                                    }}
                                    className="px-3 py-2 bg-yellow-500 text-white hover:bg-yellow-600 rounded-md"
                                >
                                    Edit
                                </button>
                                <button
                                    id={`DEL-${contact.contactId}`}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleDelete(contact.contactId);
                                    }}
                                    className="px-3 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                >
                    Create New Contact
                </button>

                {isModalOpen && (
                    <CreateContactModal
                        onCreate={editingContact ? handleSaveContact : handleCreateContact}
                        onClose={() => {
                            setIsModalOpen(false);
                            setEditingContact(null);
                        }}
                        contact={editingContact || undefined} // Pass the contact if editing
                        contactListId={contactListId}
                    />
                )}
            </div>
        </div>

    );
}
