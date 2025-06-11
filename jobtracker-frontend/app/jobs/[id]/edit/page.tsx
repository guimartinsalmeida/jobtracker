'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import JobForm from '@/components/jobs/JobForm';
import axios from 'axios';

interface JobFormData {
  job_title: string;
  company_name: string;
  location: string;
  job_type: string;
  application_date: string;
  platform: string;
  phase: string;
  cv_file_url: string;
  cover_letter_url: string;
  job_description: string;
  first_response_days: string;
  feedback: string;
  notes: string;
}

export default function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [job, setJob] = useState<JobFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }

        const response = await axios.get(`http://localhost:3001/api/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const jobData = response.data;
        setJob({
          job_title: jobData.job_title,
          company_name: jobData.company_name,
          location: jobData.location,
          job_type: jobData.job_type,
          application_date: jobData.application_date,
          platform: jobData.platform,
          phase: jobData.phase,
          cv_file_url: jobData.cv_file_url || '',
          cover_letter_url: jobData.cover_letter_url || '',
          job_description: jobData.job_description,
          first_response_days: jobData.first_response_days?.toString() || '',
          feedback: jobData.feedback || '',
          notes: jobData.notes || '',
        });
      } catch (error) {
        console.error('Error fetching job:', error);
        router.push('/home');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id, router]);

  const handleSubmit = async (data: JobFormData | FormData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      await axios.put(`http://localhost:3001/api/jobs/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
        },
      });

      router.push(`/jobs/${id}`);
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#151A23]">
        <Sidebar />
        <main className="flex-1 p-10">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen bg-[#151A23]">
        <Sidebar />
        <main className="flex-1 p-10">
          <div className="flex items-center justify-center h-full">
            <p className="text-white text-xl">Job not found</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#151A23]">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">Edit Job Application</h1>
            <button
              onClick={() => router.push(`/jobs/${id}`)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          </div>
          <JobForm onSubmit={handleSubmit} onCancel={() => router.push(`/jobs/${id}`)} initialData={job} />
        </div>
      </main>
    </div>
  );
} 