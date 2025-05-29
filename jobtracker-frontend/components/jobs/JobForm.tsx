import { useState } from 'react';
import { FaInfoCircle, FaClipboardList, FaFileAlt, FaRegStickyNote } from 'react-icons/fa';

interface JobFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function JobForm({ onSubmit, onCancel }: JobFormProps) {
  const [form, setForm] = useState({
    job_title: '',
    company_name: '',
    location: '',
    job_type: '',
    application_date: '',
    platform: '',
    phase: '',
    cv_file_url: '',
    cover_letter_url: '',
    job_description: '',
    first_response_days: '',
    feedback: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 w-full max-w-5xl text-white mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-8 w-full">
        <div className="flex-1 space-y-6">
          {/* Basic Information */}
          <div className="bg-[#181C23] bg-opacity-90 rounded-2xl p-6 shadow-xl border border-[#23283A] hover:border-blue-500 transition">
            <div className="flex items-center gap-2 mb-4">
              <FaInfoCircle className="text-blue-400 text-xl" />
              <h2 className="text-xl font-bold tracking-tight">Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Job Title <span className="text-red-400">*</span></label>
                <input name="job_title" value={form.job_title} onChange={handleChange} required placeholder="e.g. Frontend Developer" className="w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Company Name <span className="text-red-400">*</span></label>
                <input name="company_name" value={form.company_name} onChange={handleChange} required placeholder="e.g. Acme Corp" className="w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Location <span className="text-red-400">*</span></label>
                <input name="location" value={form.location} onChange={handleChange} required placeholder="e.g. Remote, São Paulo" className="w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Job Type <span className="text-red-400">*</span></label>
                <select name="job_type" value={form.job_type} onChange={handleChange} required className="w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Select job type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>
          </div>
          {/* Application Details */}
          <div className="bg-[#181C23] bg-opacity-90 rounded-2xl p-6 shadow-xl border border-[#23283A] hover:border-blue-500 transition">
            <div className="flex items-center gap-2 mb-4">
              <FaClipboardList className="text-blue-400 text-xl" />
              <h2 className="text-xl font-bold tracking-tight">Application Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Application Date <span className="text-red-400">*</span></label>
                <input type="date" name="application_date" value={form.application_date} onChange={handleChange} required className="w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Application Platform <span className="text-red-400">*</span></label>
                <input name="platform" value={form.platform} onChange={handleChange} required placeholder="e.g. LinkedIn, Gupy" className="w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Current Phase <span className="text-red-400">*</span></label>
                <select name="phase" value={form.phase} onChange={handleChange} required className="w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Select current phase</option>
                  <option value="Pending">Pending</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Days to First Response</label>
                <input type="number" name="first_response_days" value={form.first_response_days} onChange={handleChange} placeholder="e.g. 5" className="w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-6">
          {/* Documents */}
          <div className="bg-[#181C23] bg-opacity-90 rounded-2xl p-6 shadow-xl border border-[#23283A] hover:border-blue-500 transition">
            <div className="flex items-center gap-2 mb-4">
              <FaFileAlt className="text-blue-400 text-xl" />
              <h2 className="text-xl font-bold tracking-tight">Documents</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block mb-1 text-sm font-medium">Resume/CV URL <span className="text-red-400">*</span></label>
                <input name="cv_file_url" value={form.cv_file_url} onChange={handleChange} required placeholder="URL to your resume" className="w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <button type="button" className="w-full flex items-center justify-center gap-2 p-2 rounded bg-gray-700 hover:bg-gray-800 text-sm font-medium"><span>Upload</span></button>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Cover Letter URL</label>
                <input name="cover_letter_url" value={form.cover_letter_url} onChange={handleChange} placeholder="URL to your cover letter" className="w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <button type="button" className="w-full flex items-center justify-center gap-2 p-2 rounded bg-gray-700 hover:bg-gray-800 text-sm font-medium"><span>Upload</span></button>
              </div>
            </div>
          </div>
          {/* Additional Details */}
          <div className="bg-[#181C23] bg-opacity-90 rounded-2xl p-6 shadow-xl border border-[#23283A] hover:border-blue-500 transition">
            <div className="flex items-center gap-2 mb-4">
              <FaRegStickyNote className="text-blue-400 text-xl" />
              <h2 className="text-xl font-bold tracking-tight">Additional Details</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Job Description <span className="text-red-400">*</span></label>
                <textarea name="job_description" value={form.job_description} onChange={handleChange} required placeholder="Copy and paste the job description here..." className="w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Feedback Received</label>
                <textarea name="feedback" value={form.feedback} onChange={handleChange} placeholder="Any feedback from interviews or application..." className="w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none min-h-[60px]" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Personal Notes</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Your own notes about this application..." className="w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none min-h-[60px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 font-semibold transition"
        >
          Save
        </button>
      </div>
    </form>
  );
} 