"use client"; // Required for client-side context

import { UserProfile } from '@/models';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextProps {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load user from cookies on initial render
  useEffect(() => {
    const userCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('userData='))
      ?.split('=')[1];

    if (userCookie) {
      setUser(JSON.parse(decodeURIComponent(userCookie))); // Decode and parse the cookie value
    }
  }, []);

  useEffect(() => {
    // Update cookie whenever the user state changes
    if (user) {
      const userData = encodeURIComponent(JSON.stringify(user)); // Encode to prevent issues with special characters
      document.cookie = `userData=${userData}; path=/; max-age=${60 * 60 * 24}`; // 1-day expiration
    } else {
      document.cookie = `userData=; path=/; max-age=0`; // Clear cookie if user is null
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
