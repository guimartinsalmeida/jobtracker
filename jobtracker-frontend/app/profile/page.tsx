'use client';
import { useRouter } from 'next/navigation';
import { FiUser, FiLogOut, FiStar, FiMail, FiCalendar, FiX, FiCheck } from 'react-icons/fi';
import { Sidebar } from '@/components/layout/Sidebar';
import { useUser } from '@/contexts/UserContext';
import { useState, useEffect } from 'react';
import { StripeButtonGold, StripeButtonPremium, StripeButtonPlatinum } from '@/components/stripe';

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

      {/* Upgrade Plans Modal */}
      {showUpgradeModal && (
        <div 
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-[#232B3B] rounded-2xl p-8 max-w-6xl w-full mx-4 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h2>
                <p className="text-gray-400">Select the perfect plan for your needs</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-700 rounded-full"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Premium Plan */}
              <div className="bg-[#1A1F2C] rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Gold</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">$29</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-gray-300">
                    <FiCheck className="text-green-500 flex-shrink-0" />
                    <span>Unlimited job applications</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <FiCheck className="text-green-500 flex-shrink-0" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <FiCheck className="text-green-500 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <StripeButtonGold />
              </div>

              {/* Business Plan */}
              <div className="bg-[#1A1F2C] rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#176f16] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Premium</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">$79</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-gray-300">
                    <FiCheck className="text-green-500 flex-shrink-0" />
                    <span>Everything in Premium</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <FiCheck className="text-green-500 flex-shrink-0" />
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <FiCheck className="text-green-500 flex-shrink-0" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <StripeButtonPremium />
              </div>

              {/* Enterprise Plan */}
              <div className="bg-[#1A1F2C] rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Platinum</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">$199</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-gray-300">
                    <FiCheck className="text-green-500 flex-shrink-0" />
                    <span>Everything in Business</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <FiCheck className="text-green-500 flex-shrink-0" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <FiCheck className="text-green-500 flex-shrink-0" />
                    <span>Custom features</span>
                  </li>
                </ul>
                <StripeButtonPlatinum />
              </div>
            </div>

            <div className="mt-8 text-center text-gray-400 text-sm">
              <p>All plans include a 14-day free trial. No credit card required.</p>
              <p className="mt-1">Need a custom plan? <a href="#" className="text-blue-500 hover:text-blue-400">Contact us</a></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 