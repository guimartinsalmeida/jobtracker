'use client';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { useUser } from '@/contexts/UserContext';
import { useState, useEffect } from 'react';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { CurrentPlanCard } from '@/components/profile/CurrentPlanCard';
import { LogoutButton } from '@/components/profile/LogoutButton';
import { UpgradeModal } from '@/components/profile/UpgradeModal';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useUser();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    console.log('Modal state:', showUpgradeModal);
  }, [showUpgradeModal]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  const handleUpgrade = () => {
    console.log('Upgrade button clicked');
    setShowUpgradeModal(true);
  };

  const closeModal = () => {
    console.log('Close button clicked');
    setShowUpgradeModal(false);
  };

  return (
    <>
      <div className="flex min-h-screen bg-[#151A23]">
        <Sidebar />
        <main className="flex-1 p-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-8">Profile Settings</h1>
            
            <ProfileCard name={user?.name} email={user?.email} />
            <CurrentPlanCard onUpgrade={handleUpgrade} />
            <LogoutButton onLogout={handleLogout} />
          </div>
        </main>
      </div>

      {showUpgradeModal && <UpgradeModal onClose={closeModal} />}
    </>
  );
} 