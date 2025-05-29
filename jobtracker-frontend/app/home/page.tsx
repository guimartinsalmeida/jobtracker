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

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Google',
    location: 'San Francisco, CA (Remote)',
    type: 'Full-time',
    appliedDate: 'May 15, 2023',
    status: 'Pending',
    response: 'No response (8 days)',
  },
  {
    id: 2,
    title: 'UX Designer',
    company: 'Microsoft',
    location: 'Seattle, WA',
    type: 'Full-time',
    appliedDate: 'May 10, 2023',
    status: 'Interview',
    response: 'First response: 3 days',
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'Amazon',
    location: 'New York, NY',
    type: 'Full-time',
    appliedDate: 'April 28, 2023',
    status: 'Offer',
    response: 'First response: 5 days',
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'Apple',
    location: 'Cupertino, CA',
    type: 'Full-time',
    appliedDate: 'April 20, 2023',
    status: 'Rejected',
    response: 'First response: 10 days',
  },
];

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  appliedDate: string;
  status: 'Pending' | 'Interview' | 'Offer' | 'Rejected';
  response: string;
};

export default function HomePage() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const jobs: Job[] = mockJobs; // Troque para [] para testar o empty state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  const filteredJobs =
    selectedStatus === 'All'
      ? jobs
      : jobs.filter((job) => job.status === selectedStatus);

  const handleAddJobClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleJobFormSubmit = async (data: Record<string, string>) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/jobs', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsModalOpen(false);
      // Aqui você pode atualizar a lista de jobs futuramente
    } catch {
      alert('Erro ao criar job. Tente novamente.');
    }
  };

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
              <JobCard key={job.id} job={job} />
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