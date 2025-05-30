import { FiLogOut } from 'react-icons/fi';

interface LogoutButtonProps {
  onLogout: () => void;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <button
      onClick={onLogout}
      className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold transition"
    >
      <FiLogOut /> Logout
    </button>
  );
} 