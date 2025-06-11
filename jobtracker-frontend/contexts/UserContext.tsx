'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
  const [user, setUser] = useState<User | null>(() => {
    // Try to load user data from localStorage on initialization
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  const fetchUserData = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`https://jobtracker-production.up.railway.app/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userData = response.data.data;
      setUser(userData);
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('User ID:', userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Update localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

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