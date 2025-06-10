"use client"
import CVAnalysis from '@/components/CVAnalysis';
import { Sidebar } from '@/components/layout/Sidebar';

export default function AnalysisCVPage() {
  return (
    <div className="flex min-h-screen bg-[#151A23]">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center">
        <CVAnalysis />
      </main>
    </div>
  );  
} 