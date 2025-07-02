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
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Try to load user data from localStorage on initialization
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      // Only load user data if we have a valid token
      if (token && savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('user');
          return null;
        }
      }
      return null;
    }
    return null;
  });

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
      const userData = response.data.data;
      
      // Ensure the user data has an ID
      if (!userData || !userData.id) {
        throw new Error('Invalid user data received');
      }
      
      setUser(userData);
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('User data loaded:', userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // If there's an error fetching user data, clear the token and user data
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        logout();
      } else {
        // For other errors, also clear the data to prevent stale state
        logout();
      }
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

  const logout = () => {
    // Clear all user-related data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData, logout }}>
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