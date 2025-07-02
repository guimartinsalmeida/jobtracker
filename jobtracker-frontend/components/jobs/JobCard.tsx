'use client';

import { useState, useEffect, useRef } from 'react';

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

interface JobCardProps {
  job: Job;
  isLoading?: boolean;
  onStatusUpdate?: (jobId: number, newStatus: string) => void;
  onDelete?: (jobId: number) => void;
}

export function JobCard({ job, isLoading = false, onStatusUpdate, onDelete }: JobCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const statusOptions = [
    { value: 'applied', label: 'Applied', color: 'bg-blue-500 text-white' },
    { value: 'interviewed', label: 'Interviewed', color: 'bg-purple-500 text-white' },
    { value: 'waiting_response', label: 'Waiting Response', color: 'bg-yellow-500 text-black' },
    { value: 'approved', label: 'Approved', color: 'bg-green-500 text-white' },
    { value: 'offer', label: 'Offer', color: 'bg-emerald-500 text-white' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-500 text-white' },
  ];

  const currentStatus = statusOptions.find(option => option.value === job.status) || statusOptions[0];

  const handleStatusUpdate = async (newStatus: string) => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    setIsDropdownOpen(false);

    try {
      const response = await fetch(`http://localhost:3001/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Call the callback to update the parent component
        if (onStatusUpdate) {
          onStatusUpdate(job.id, newStatus);
        }
      } else {
        console.error('Failed to update job status');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    setShowDeleteModal(false);

    try {
      const response = await fetch(`http://localhost:3001/api/jobs/${job.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Call the callback to update the parent component
        if (onDelete) {
          onDelete(job.id);
        }
      } else {
        console.error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  if (isLoading) {
    return (
      <div className="bg-[#232B3B] rounded-xl p-5 flex flex-col gap-2 shadow-md min-w-[300px] animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-5 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="h-6 bg-gray-700 rounded-full w-20"></div>
        </div>
        <div className="space-y-2 mt-2">
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="bg-[#232B3B] rounded-xl p-5 flex flex-col gap-2 shadow-md min-w-[300px] cursor-pointer 
        transform transition-all duration-300 ease-in-out hover:bg-[#2c3650] hover:scale-[1.02] hover:shadow-lg
        animate-fadeIn"
        role="button"
        tabIndex={0}
        aria-label={`View details for ${job.title} position at ${job.company}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white transition-colors duration-300">{job.title}</h3>
            <span className="text-gray-400 font-medium">{job.company}</span>
          </div>
          
          {/* Actions Container */}
          <div className="flex items-center gap-2">
            {/* Delete Button */}
            <button
              onClick={openDeleteModal}
              disabled={isDeleting}
              className={`p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 
              transition-all duration-300 hover:scale-110
              ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label="Delete job"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
            
            {/* Status Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                disabled={isUpdating}
                className={`px-3 py-1 rounded-full text-xs font-bold ${currentStatus.color} 
                transition-all duration-300 hover:scale-110 animate-pulse-subtle flex items-center gap-1
                ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                aria-label={`Current status: ${currentStatus.label}. Click to change.`}
              >
                {isUpdating ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {currentStatus.label}
                    <svg 
                      className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div 
                  className="absolute right-0 top-full mt-1 bg-[#2c3650] rounded-lg shadow-lg border border-gray-600 z-10 min-w-[180px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleStatusUpdate(option.value)}
                      className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-[#3a4560] transition-colors duration-200
                        ${option.value === job.status ? 'bg-[#3a4560]' : ''}
                        first:rounded-t-lg last:rounded-b-lg`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${option.color.replace('bg-', 'bg-').replace(' text-', '')}`}></div>
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-gray-400 text-sm flex flex-col gap-1 mt-2">
          <span className="transition-colors duration-300 hover:text-gray-300" aria-label={`Location: ${job.location}`}>
            📍 {job.location} 
          </span>
          <span className="transition-colors duration-300 hover:text-gray-300" aria-label={`Job type: ${job.type}`}>
            💼 {job.type}
          </span>
          <span className="transition-colors duration-300 hover:text-gray-300" aria-label={`Platform: ${job.platform}`}>
            🌐 {job.platform}
          </span>
          <span className="transition-colors duration-300 hover:text-gray-300" aria-label={`Applied on ${job.appliedDate}`}>
            📅 Applied on {job.appliedDate}
          </span>
          <span className="transition-colors duration-300 hover:text-gray-300" aria-label={`Response time: ${job.response}`}>
            🕒 {job.response}
          </span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#232B3B] rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-600">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-red-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Delete Job</h3>
                <p className="text-gray-400 text-sm">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="bg-[#1a1f2a] rounded-lg p-4 mb-6 border border-gray-600">
              <p className="text-white font-medium">{job.title}</p>
              <p className="text-gray-400 text-sm">{job.company}</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete Job'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 