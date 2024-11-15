// components/LogoutButton.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const { setUser } = useUser()

  const handleLogout = async () => {
    // Call the logout API to clear cookies
    await fetch('/api/auth/logout', {
      method: 'GET',
      credentials: 'include', // Include cookies in the request if necessary
    });

    setUser(null);

    // Redirect to the home page
    router.push('/');
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 font-bold w-32">
      Logout
    </button>
  );
};

export default LogoutButton;
