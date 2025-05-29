import { useRouter } from 'next/navigation';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
}

export function SidebarItem({ icon, label, active = false, href }: SidebarItemProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-gray-300 hover:bg-[#232B3B] transition ${active ? 'bg-blue-700 text-white' : ''}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
} 