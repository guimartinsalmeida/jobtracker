'use client';
import { useUser } from '@/contexts/UserContext';
import { useEffect, useState } from 'react';

export function UserDebug() {
  const { user } = useUser();
  const [localStorageData, setLocalStorageData] = useState<any>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    setLocalStorageData({
      token: token ? 'Present' : 'Missing',
      user: savedUser ? JSON.parse(savedUser) : 'Missing',
      userState: user
    });
  }, [user]);

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(localStorageData, null, 2)}
      </pre>
    </div>
  );
} 