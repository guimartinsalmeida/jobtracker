'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';
import { Sidebar } from '@/components/layout/Sidebar';
import { JobCard } from '@/components/jobs/JobCard';
import EmptyState from '@/components/layout/EmptyState';
import { JobFilters } from '@/components/filters/JobFilters';
import Modal from '@/components/ui/Modal';
import JobForm from '@/components/jobs/JobForm';
import axios from 'axios';
import { useUser } from '@/contexts/UserContext';
import { JobFormData } from '@/components/jobs/JobForm';

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  platform: string;
  appliedDate: string;
  status: string;
  response: string;
};

type ApiJob = {
  id: number;
  job_title: string;
  company_name: string;
  location: string;
  job_type: string;
  platform: string;
  application_date: string;
  status: string;
  first_response_days: number | null;
};

export default function HomePage() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, fetchUserData } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    const initializeData = async () => {
      try {
        // If we don't have user data, try to fetch it
        if (!user) {
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            await fetchUserData(parsedUser.id);
          } else {
            router.push('/auth/login');
            return;
          }
        }

        const response = await axios.get(`http://localhost:3001/api/jobs/user/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!Array.isArray(response.data)) {
          console.error('API response is not an array:', response.data);
          return;
        }

        const transformedJobs = response.data.map((job: ApiJob) => ({
          id: job.id,
          title: job.job_title,
          company: job.company_name,
          location: job.location,
          type: job.job_type,
          platform: job.platform,
          appliedDate: new Date(job.application_date).toLocaleDateString(),
          status: job.status,
          response: job.first_response_days ? `First response: ${job.first_response_days} days` : 'No response yet',
        }));
        
        setJobs(transformedJobs);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (axios.isAxiosError(error)) {
          console.error('Axios error details:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
          });
        }
        alert('Error loading data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [router, user, fetchUserData]);

  const filteredJobs =
    selectedStatus === 'All'
      ? jobs
      : jobs.filter((job) => job.status === selectedStatus);

  const handleAddJobClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleJobFormSubmit = async (data: JobFormData | FormData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/jobs', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsModalOpen(false);
      // Refresh the jobs list
      window.location.reload();
    } catch {
      alert('Erro ao criar job. Tente novamente.');
    }
  };

  const handleStatusUpdate = (jobId: number, newStatus: string) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#151A23]">
        <Sidebar />
        <main className="flex-1 p-10">
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="h-8 w-64 bg-[#181F2A] rounded-lg mb-2"></div>
                <div className="h-4 w-96 bg-[#181F2A] rounded-lg"></div>
              </div>
              <div className="h-10 w-32 bg-[#181F2A] rounded-lg"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="rounded-xl bg-[#181F2A] p-6 shadow-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#232B3B]"></div>
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-[#232B3B] rounded mb-2"></div>
                      <div className="h-3 w-24 bg-[#232B3B] rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-[#232B3B] rounded"></div>
                    <div className="h-4 w-3/4 bg-[#232B3B] rounded"></div>
                    <div className="h-4 w-1/2 bg-[#232B3B] rounded"></div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <div className="h-6 w-20 bg-[#232B3B] rounded"></div>
                    <div className="h-6 w-20 bg-[#232B3B] rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#151A23]">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Job Applications</h1>
          <button
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-semibold transition"
            onClick={handleAddJobClick}
          >
            <FiPlus /> Add Job
          </button>
        </div>
        <JobFilters selected={selectedStatus} onSelect={setSelectedStatus} />
        {filteredJobs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onStatusUpdate={handleStatusUpdate} />
            ))}
          </div>
        )}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4 text-white">Add New Job Application</h2>
          <JobForm onSubmit={handleJobFormSubmit} onCancel={handleCloseModal} />
        </Modal>
      </main>
    </div>
  );
}