import Image from 'next/image';
import { FiHome, FiBriefcase, FiCalendar, FiBarChart2, FiFileText, FiUser } from 'react-icons/fi';
import { MdOutlineSmartToy } from "react-icons/md";
import { SiReaddotcv } from "react-icons/si";

import { SidebarItem } from '@/components/layout/SidebarItem';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-[#181F2A] w-56 min-h-screen flex flex-col py-6 px-4">
      <div className='flex justify-center items-center mb-8 gap-3'>
        <Image src="/favicon.png" alt="JobTracker" width={32} height={32} />
        <h2 className="text-xl font-bold text-blue-400">JobTracker</h2>
      </div>
      <nav className="flex flex-col gap-2">
        <SidebarItem icon={<FiHome />} label="Dashboard" href="/" active={pathname === '/'} />
        <SidebarItem icon={<FiBriefcase />} label="Jobs" href="/home" active={pathname === '/home'} />
        <SidebarItem icon={<FiCalendar />} label="Calendar" href="/calendar" active={pathname === '/calendar'} />
        <SidebarItem icon={<FiBarChart2 />} label="Analytics" href="/analitycs" active={pathname === '/analitycs'} />
        <SidebarItem icon={<FiFileText />} label="Documents" href="/documents" active={pathname === '/documents'} />
        <SidebarItem icon={<FiUser />} label="Profile" href="/profile" active={pathname === '/profile'} />
        <SidebarItem icon={<SiReaddotcv />} label="CV Analysis" href="/analisys-cv" active={pathname === '/analisys-cv'} />
      </nav>
    </aside>
  );
} 