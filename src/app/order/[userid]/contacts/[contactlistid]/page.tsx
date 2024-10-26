import React from 'react';
import ContactClientComponent from './contactClientComponent';
import { cookies } from 'next/headers';
import { fetchUserContacts } from '@/lib';

export default async function UserContactsListPage({ params }: { params: { userid: string; contactlistid: string } }) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || "";
  const tokenType = cookieStore.get('tokenType')?.value || "";
  const authHeader: string = `${tokenType}${token}`;

  const contacts = await fetchUserContacts(params.userid, authHeader);
  return (
    <>
      <ContactClientComponent contactsFromServer={contacts.userContacts} userId={params.userid} contactListId={params.contactlistid} />
    </>
  );
}
