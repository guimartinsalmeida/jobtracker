"use client"
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import InterviewPreparation from '@/components/interview/InterviewPreparation';

export default function InterviewPreparationPage() {
  return (
    <div className="flex min-h-screen bg-[#151A23]">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center">
        <InterviewPreparation />
      </main>
    </div>
  );
} 