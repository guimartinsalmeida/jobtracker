'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, logout, fetchUserData } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        // No token found, clear any stale data and redirect
        logout();
        router.push('/auth/login');
        return;
      }

      // If we have a token but no user data, try to fetch it
      if (!user) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            // Try to fetch fresh user data
            await fetchUserData(parsedUser.id);
            setIsLoading(false);
            return;
          } catch (error) {
            console.error('Error fetching user data:', error);
            logout();
            router.push('/auth/login');
            return;
          }
        } else {
          // No saved user data, redirect to login
          logout();
          router.push('/auth/login');
          return;
        }
      }

      // If we have both token and user data, we're good
      if (user && user.id) {
        setIsLoading(false);
        return;
      }

      // If we have user but no ID, something is wrong
      if (user && !user.id) {
        console.error('User object exists but has no ID');
        logout();
        router.push('/auth/login');
        return;
      }

      // If we're still loading and have a token, keep loading
      if (token) {
        return;
      }
    };

    checkAuth();
  }, [user, logout, router, fetchUserData]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#151A23] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-white text-lg font-medium">Verificando autenticação...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 