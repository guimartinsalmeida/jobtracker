"use client"
import GithubProfileOptimizer from '@/components/github/GithubProfileOptimizer';
import { Sidebar } from '@/components/layout/Sidebar';

export default function GithubProfileOptimizerPage() {
  return (
    <div className="flex min-h-screen bg-[#151A23]">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center">
        <GithubProfileOptimizer />
      </main>
    </div>
  );
} 