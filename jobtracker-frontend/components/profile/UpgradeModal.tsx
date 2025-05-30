import { FiX, FiCheck } from 'react-icons/fi';
import { StripeButtonGold, StripeButtonPremium, StripeButtonPlatinum } from '@/components/stripe';

interface UpgradeModalProps {
  onClose: () => void;
}

export function UpgradeModal({ onClose }: UpgradeModalProps) {
  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] backdrop-blur-sm"
      onClick={onClose}
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
            onClick={onClose}
            className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-700 rounded-full"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gold Plan */}
          <div className="bg-[#1A1F2C] rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Gold</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">$15</span>
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

          {/* Premium Plan */}
          <div className="bg-[#1A1F2C] rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#176f16] text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Premium</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">$25</span>
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

          {/* Platinum Plan */}
          <div className="bg-[#1A1F2C] rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Platinum</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">$40</span>
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
          <p className="mt-1">Need a custom plan? <a href="#" className="text-blue-500 hover:text-blue-400">Contact us</a></p>
        </div>
      </div>
    </div>
  );
} 