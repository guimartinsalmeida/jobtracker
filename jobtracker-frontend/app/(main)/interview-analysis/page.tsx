"use client"
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import InterviewAnalysis from '@/components/interview/InterviewAnalysis';

export default function InterviewAnalysisPage() {
  return (
    <div className="flex min-h-screen bg-[#151A23]">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center">
        <InterviewAnalysis />
      </main>
    </div>
  );
}