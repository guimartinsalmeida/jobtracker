import { FiStar } from 'react-icons/fi';

interface CurrentPlanCardProps {
  onUpgrade: () => void;
}

export function CurrentPlanCard({ onUpgrade }: CurrentPlanCardProps) {
  return (
    <div className="bg-[#232B3B] rounded-xl p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Current Plan</h3>
          <p className="text-gray-400">You are currently on the Premium plan</p>
        </div>
        <button
          onClick={onUpgrade}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          <FiStar /> Upgrade Plan
        </button>
      </div>
    </div>
  );
} 