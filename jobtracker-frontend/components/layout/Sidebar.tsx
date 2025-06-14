'use client';
import Image from 'next/image';
import { FiHome, FiBriefcase, FiCalendar, FiBarChart2, FiFileText, FiUser } from 'react-icons/fi';
import { RiAiGenerate2 } from "react-icons/ri";

import { SidebarItem } from '@/components/layout/SidebarItem';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen bg-[#181F2A] w-56 flex flex-col py-6 px-4 border-r border-gray-700/50 shadow-lg">
      <div className='flex justify-center items-center mb-8 gap-3'>
        <Image src="/favicon.png" alt="JobTracker" width={32} height={32} />
        <h2 className="text-xl font-bold text-blue-400">JobTracker</h2>
      </div>
      <nav className="flex flex-col gap-2 overflow-y-auto">
        <SidebarItem icon={<FiHome />} label="Dashboard" href="/" active={pathname === '/'} />
        <SidebarItem icon={<FiBriefcase />} label="Jobs" href="/home" active={pathname === '/home'} />
        <SidebarItem icon={<FiCalendar />} label="Calendar" href="/calendar" active={pathname === '/calendar'} />
        <SidebarItem icon={<FiBarChart2 />} label="Analytics" href="/analitycs" active={pathname === '/analitycs'} />
        <SidebarItem icon={<FiFileText />} label="Documents" href="/documents" active={pathname === '/documents'} />
        <SidebarItem icon={<FiUser />} label="Profile" href="/profile" active={pathname === '/profile'} />
        <SidebarItem icon={<RiAiGenerate2 />} label="CV Analysis" href="/analisys-cv" active={pathname === '/analisys-cv'} />
        <SidebarItem icon={<RiAiGenerate2 />} label="Interview Analysis" href="/interview-analysis" active={pathname === '/interview-analysis'} />
        <SidebarItem icon={<RiAiGenerate2 />} label="Interview Prep" href="/interview-preparation" active={pathname === '/interview-preparation'} />
      </nav>
    </aside>
  );
} 