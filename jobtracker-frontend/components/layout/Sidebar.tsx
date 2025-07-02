'use client';
import Image from 'next/image';
import {  FiBriefcase, FiBarChart2, FiUser } from 'react-icons/fi';
import { RiAiGenerate2 } from "react-icons/ri";

import { SidebarItem } from '@/components/layout/SidebarItem';
import { usePathname, useRouter } from 'next/navigation';
import { UserCVs } from './UserCVs';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <aside className="fixed top-0 left-0 h-screen bg-[#181F2A] w-56 flex flex-col py-6 px-4 border-r border-gray-700/50 shadow-lg">
      <div className='flex justify-center items-center mb-8 gap-3'>
        <button className='flex items-center gap-2' onClick={() => router.push('/home')}>
        <Image src="/favicon.png" alt="JobTracker" width={32} height={32} />
        <h2 className="text-xl font-bold text-blue-400">JobTracker</h2>
        </button>
        
      </div>
      <nav className="flex flex-col gap-2 overflow-y-auto flex-1">
        <SidebarItem icon={<FiBriefcase />} label="Jobs" href="/home" active={pathname === '/home'} />
        <SidebarItem icon={<FiBarChart2 />} label="Analytics" href="/analitycs" active={pathname === '/analitycs'} />
        <SidebarItem icon={<RiAiGenerate2 />} label="CV Analysis" href="/analisys-cv" active={pathname === '/analisys-cv'} />
        <SidebarItem icon={<RiAiGenerate2 />} label="Interview Analysis" href="/interview-analysis" active={pathname === '/interview-analysis'} />
        <SidebarItem icon={<RiAiGenerate2 />} label="Interview Prep" href="/interview-preparation" active={pathname === '/interview-preparation'} />
        <SidebarItem icon={<FiUser />} label="Profile" href="/profile" active={pathname === '/profile'} />
      </nav>
      
      <div className="mt-6 border-t border-gray-700/50 pt-4">
        <UserCVs />
      </div>
    </aside>
  );
} 