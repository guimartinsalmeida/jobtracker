'use client';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { useUser } from '@/contexts/UserContext';
import { useState, useEffect } from 'react';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { CurrentPlanCard } from '@/components/profile/CurrentPlanCard';
import { LogoutButton } from '@/components/profile/LogoutButton';
import { UpgradeModal } from '@/components/profile/UpgradeModal';
import Head from 'next/head';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useUser();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    setIsLoading(false);
  }, [user, router]);

  const handleLogout = () => {
    try {
      logout();
      // Force a page reload to clear any React state
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
  };

  const closeModal = () => {
    setShowUpgradeModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#151A23] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-white text-lg font-medium">Loading your profile...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Profile Settings | JobTracker</title>
      </Head>
      <div className="flex min-h-screen bg-[#151A23]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
              <div className="h-1 flex-1 max-w-[200px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ml-4"></div>
            </div>
            
            <div className="bg-[#1E2536] rounded-2xl p-6 shadow-lg space-y-6 transition-all duration-300 hover:shadow-xl">
              <ProfileCard name={user?.name} email={user?.email} />
              <div className="h-px bg-gray-700 my-6"></div>
              <CurrentPlanCard onUpgrade={handleUpgrade} />
              <div className="h-px bg-gray-700 my-6"></div>
              <LogoutButton onLogout={handleLogout} />
            </div>
          </div>
        </main>
      </div>

      {showUpgradeModal && <UpgradeModal onClose={closeModal} />}
    </>
  );
} 