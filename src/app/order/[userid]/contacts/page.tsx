"use client";

import CreateContactModal from '@/components/ContactModal';
import Navigation from '@/components/Navigation';
import { UserContact } from '@/models';
import React, { useEffect, useState } from 'react';

export default function UserContactsListPage({ params }: { params: { userid: string } }) {
  const [contacts, setContacts] = useState<UserContact[]>([]); // should be fetched from api ...
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<UserContact | null>(null);

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted
    async function fetchData() {
      try {
        const res = await fetch(`/api/user/contact?userid=${params.userid}`, {
          method: 'GET',
          cache: 'no-store',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch user contacts');
        }

        const data = await res.json();

        // Only update state if the component is still mounted
        if (isMounted) {
          setContacts(data);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }

    fetchData();

    // Cleanup function to set the mounted flag to false
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSetDefault = (contactId: string) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.contactId === contactId
          ? { ...contact, isDefault: true }
          : { ...contact, isDefault: false }
      )
    );
  };

  const handleEdit = (contactId: string) => {
    // fetch api ...
    const contactToEdit = contacts.find((contact) => contact.contactId === contactId);
    if (contactToEdit) {
      setEditingContact(contactToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (contactId: string) => {
    // fetch api ...
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.contactId !== contactId)
    );
  };

  const handleSaveContact = (updatedContact: UserContact) => {
    // fetch api ...
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.contactId === updatedContact.contactId ? updatedContact : contact
      )
    );
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleCreateContact = (newContact: UserContact) => {
    // fetch api ...
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-5rem)] lg:flex w-full">
      <div className='lg:w-40 w-0'>
        <Navigation />
      </div>

      <div className="flex flex-col p-4 bg-gray-50 overflow-auto w-full lg:w-[calc(100vw-10rem)]">
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
                  onClick={() => handleSetDefault(contact.contactId)}
                  className={`px-3 py-2 text-sm ${contact.defaultContact
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                    } rounded-md`}
                  disabled={contact.defaultContact}
                >
                  Set As Default
                </button>
                <button
                  onClick={() => handleEdit(contact.contactId)}
                  className="px-3 py-2 bg-yellow-500 text-white hover:bg-yellow-600 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact.contactId)}
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
          />
        )}
      </div>
    </div>

  );
}
