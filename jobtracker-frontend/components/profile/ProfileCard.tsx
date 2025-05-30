import { FiUser, FiMail, FiCalendar } from 'react-icons/fi';

interface ProfileCardProps {
  name?: string;
  email?: string;
}

export function ProfileCard({ name, email }: ProfileCardProps) {
  return (
    <div className="bg-[#232B3B] rounded-xl p-8 mb-8">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center">
          <FiUser className="w-12 h-12 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{name}</h2>
          <p className="text-gray-400">{email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center gap-3 text-gray-300">
          <FiMail className="w-5 h-5" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <FiCalendar className="w-5 h-5" />
          <span>Member since 23/04/1999</span>
        </div>
      </div>
    </div>
  );
} 