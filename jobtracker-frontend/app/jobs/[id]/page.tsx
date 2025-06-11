'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';

interface JobDetail {
  id: number;
  user_id: string;
  job_title: string;
  company_name: string;
  cv_file_url: string;
  cover_letter_url: string;
  job_description: string;
  phase: string;
  application_date: string;
  platform: string;
  first_response_days: number;
  feedback: string;
  location: string;
  job_type: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = 'http://localhost:3001';

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [job, setJob] = useState<JobDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch job');
        }

        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
        router.push('/home');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id, router]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      router.push('/home');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#181C23] text-white p-0 md:p-8">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#181C23] text-white p-0 md:p-8">
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl">Job not found</p>
        </div>
      </div>
    );
  }

  // Badge para fase
  const badge = job.phase ? (
    <span className="inline-block bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 capitalize">{job.phase} phase</span>
  ) : null;

  // Link estilizado para plataforma
  const platformLink = job.platform.toLowerCase() === 'linkedin' ? (
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium flex items-center gap-1">
      <svg width="16" height="16" fill="currentColor" className="inline-block"><path d="M12.225 12.225h-1.788V9.428c0-.667-.012-1.527-.93-1.527-.93 0-1.073.726-1.073 1.477v2.847H6.646V6.5h1.715v.784h.024c.239-.453.823-.93 1.693-.93 1.812 0 2.147 1.193 2.147 2.744v3.127zM5.337 5.716a1.04 1.04 0 1 1 0-2.08 1.04 1.04 0 0 1 0 2.08zM6.23 12.225H4.444V6.5H6.23v5.725zM13.225 2H2.771C2.345 2 2 2.345 2 2.771v10.457C2 13.655 2.345 14 2.771 14h10.457c.426 0 .771-.345.771-.771V2.771A.77.77 0 0 0 13.225 2z"/></svg>
      LinkedIn
    </a>
  ) : (
    <span className="text-gray-300">{job.platform}</span>
  );

  // Arquivos
  const files = [
    job.cv_file_url && { name: 'Frontend_CV.pdf', url: `${API_BASE_URL}${job.cv_file_url}` },
    job.cover_letter_url && { name: 'Cover_Letter.docx', url: `${API_BASE_URL}${job.cover_letter_url}` },
  ].filter(Boolean) as { name: string; url: string }[];

  // Timeline exemplo
  const timeline = [
    { label: 'Application Submitted', date: formatDate(job.application_date) },
    { label: 'Initial Screening', date: job.first_response_days ? `${job.first_response_days} days` : '' },
    { label: 'Phase', date: job.phase, status: job.phase },
  ];
  const timelineColors = [
    'bg-blue-400',
    'bg-green-400',
    'bg-yellow-400',
    'bg-gray-500',
  ];

  // Job Description truncation logic
  const DESCRIPTION_LIMIT = 400;
  const isLongDescription = job.job_description.length > DESCRIPTION_LIMIT;
  const descriptionToShow = job.job_description.slice(0, DESCRIPTION_LIMIT) + (isLongDescription ? '...' : '');

  return (
    <div className="min-h-screen bg-[#181C23] text-white p-0 md:p-8">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#232B3B] rounded-lg w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">Delete Job Application</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this job application? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-medium"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-medium flex items-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Botões Edit e Delete no topo */}
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => router.push(`/jobs/${id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow transition-colors duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L7.5 19.79l-4 1 1-4 13.362-13.303z" />
            </svg>
            Edit Job
          </button>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold shadow transition-colors duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Delete Job
          </button>
        </div>
        <button
          className="mb-8 px-6 py-2 bg-[#232B3B] hover:bg-[#232B3B]/80 text-gray-200 rounded-full font-semibold flex items-center gap-2 shadow border border-[#232B3B]"
          onClick={() => router.push('/home')}
        >
          <span className="text-lg">←</span> Back to Applications List
        </button>
        <h1 className="text-3xl md:text-4xl font-bold mb-1 flex items-center gap-3">{job.job_title}</h1>
        <div className="text-lg text-gray-300 mb-2">{job.company_name}</div>
        {badge}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Application Details */}
          <div className="bg-[#232B3B] rounded-2xl p-6 flex-1 min-w-[250px] shadow border border-[#232B3B]">
            <div className="font-semibold text-lg mb-3">Application Details</div>
            <div className="text-gray-300 text-sm flex flex-col gap-2">
              <span><b>Application Date:</b> <span className="text-white font-medium">{formatDate(job.application_date)}</span></span>
              <span><b>Platform:</b> {platformLink}</span>
              <span><b>First Response:</b> <span className="text-white font-medium">{job.first_response_days} days</span></span>
              <span><b>Job Type:</b> <span className="text-white font-medium">{job.job_type}</span></span>
              <span><b>Location:</b> <span className="text-white font-medium">{job.location}</span></span>
            </div>
          </div>
          {/* Files */}
          <div className="bg-[#232B3B] rounded-2xl p-6 flex-1 min-w-[250px] shadow border border-[#232B3B]">
            <div className="font-semibold text-lg mb-6 flex items-center gap-3">
              <span className="text-blue-400 text-3xl">📄</span>
              <span className="text-2xl font-bold">Files</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              {files.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                  <span className="text-5xl mb-2">📂</span>
                  <span>No files uploaded yet</span>
                </div>
              ) : (
                <div className="bg-[#181C23] rounded-xl px-8 py-8 flex flex-col items-center shadow-lg w-full max-w-xs mx-auto">
                  <span className="text-6xl mb-4 text-blue-400">📄</span>
                  <a
                    href={files[0].url}
                    download
                    className="flex items-center gap-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold text-sm shadow transition"
                    title="Download CV"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 10l5 5 5-5"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15V3"/>
                    </svg>
                    Used CV
                  </a>
                  <span className="text-gray-400 text-sm mt-4 text-center">
                    This is the CV used for this job.
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* Timeline */}
          <div className="bg-[#232B3B] rounded-2xl p-6 flex-1 min-w-[250px] shadow border border-[#232B3B]">
            <div className="font-semibold text-lg mb-3">Timeline</div>
            <div className="flex flex-col gap-3 text-sm">
              {timeline.map((item, idx) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${timelineColors[idx] || 'bg-gray-500'}`}></span>
                  <span className="font-medium">{item.label}</span>
                  <span className="ml-auto text-gray-400">{item.date}</span>
                  {item.status && <span className="ml-2 text-xs text-gray-500">{item.status}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Job Description */}
        <div className="bg-[#232B3B] rounded-2xl p-6 mb-6 shadow border border-[#232B3B]">
          <div className="font-semibold text-lg mb-3 flex items-center gap-2">
            <span>📝</span> Job Description
          </div>
          <div className="text-gray-200 text-sm mb-4 whitespace-pre-line">
            {descriptionToShow}
          </div>
          {isLongDescription && (
            <button
              className="text-blue-400 hover:underline text-sm font-semibold mb-2"
              onClick={() => router.push(`/jobs/${id}/edit`)}
            >
              Edit Job Description
            </button>
          )}
        </div>
        {/* Feedback & Notes */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="bg-[#232B3B] rounded-2xl p-6 flex-1 shadow border border-[#232B3B]">
            <div className="font-semibold text-lg mb-2">Feedback</div>
            <div className="text-gray-300 text-sm whitespace-pre-line">{job.feedback}</div>
          </div>
          <div className="bg-[#232B3B] rounded-2xl p-6 flex-1 shadow border border-[#232B3B]">
            <div className="font-semibold text-lg mb-2">Notes</div>
            <div className="text-gray-300 text-sm whitespace-pre-line">{job.notes}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 