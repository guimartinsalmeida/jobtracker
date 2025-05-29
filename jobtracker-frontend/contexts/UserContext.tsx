'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUserData: (userId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const fetchUserData = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`http://localhost:3001/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data.data);
      console.log('User ID:', response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 