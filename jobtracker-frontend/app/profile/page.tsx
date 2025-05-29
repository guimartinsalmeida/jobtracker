'use client';
import { useRouter } from 'next/navigation';
import { FiUser, FiLogOut, FiStar, FiMail, FiCalendar } from 'react-icons/fi';
import { Sidebar } from '@/components/layout/Sidebar';
import { useUser } from '@/contexts/UserContext';


export default function ProfilePage() {
  const router = useRouter();
  const { user } = useUser();




  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  const handleUpgrade = () => {
    // TODO: Implement upgrade flow
    console.log('Upgrade clicked');
  };

 

 


  return (
    <div className="flex min-h-screen bg-[#151A23]">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-8">Profile Settings</h1>
          
          {/* Profile Card */}
          <div className="bg-[#232B3B] rounded-xl p-8 mb-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center">
                <FiUser className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{user?.name}</h2>
                <p className="text-gray-400">{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 text-gray-300">
                <FiMail className="w-5 h-5" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FiCalendar className="w-5 h-5" />
                <span>Member since 23/04/1999</span>
              </div>
            </div>
          </div>

          {/* Current Plan Card */}
          <div className="bg-[#232B3B] rounded-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Current Plan</h3>
                <p className="text-gray-400">You are currently on the Premium plan</p>
              </div>
              <button
                onClick={handleUpgrade}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-semibold transition"
              >
                <FiStar /> Upgrade Plan
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </main>
    </div>
  );
} 