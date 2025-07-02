import { useState, useEffect, useRef } from 'react';
import { FaFileAlt, FaUpload } from 'react-icons/fa';
import CVSelector from './CVSelector';

export interface JobFormData {
  job_title: string;
  company_name: string;
  job_type: string;
  platform: string;
  status: string;
  cv_file_url: string;
}

interface CV {
  id: number;
  file_url: string;
  original_filename: string;
  created_at: string;
}

interface FormErrors {
  [key: string]: string;
}

interface JobFormProps {
  onSubmit: (data: JobFormData | FormData) => void;
  onCancel: () => void;
  initialData?: JobFormData;
  isSubmitting?: boolean;
}

export default function JobForm({ onSubmit, onCancel, initialData, isSubmitting = false }: JobFormProps) {
  const [form, setForm] = useState<JobFormData>({
    job_title: '',
    company_name: '',
    job_type: '',
    platform: '',
    status: 'applied',
    cv_file_url: '',
  });

  const [selectedCV, setSelectedCV] = useState<CV | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.job_title.trim()) {
      newErrors.job_title = 'Job title is required';
    }
    if (!form.company_name.trim()) {
      newErrors.company_name = 'Company name is required';
    }
    if (!form.job_type) {
      newErrors.job_type = 'Job type is required';
    }
    if (!form.platform.trim()) {
      newErrors.platform = 'Platform is required';
    }
    if (!selectedCV && !uploadedFile) {
      newErrors.cv_file_url = 'CV/Resume is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Create FormData if we have a file to upload
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('cv_file', uploadedFile);
      formData.append('job_title', form.job_title);
      formData.append('company_name', form.company_name);
      formData.append('job_type', form.job_type);
      formData.append('platform', form.platform);
      formData.append('status', form.status);
      onSubmit(formData);
    } else if (selectedCV) {
      // Use selected CV
      const formWithCV = {
        ...form,
        cv_file_url: selectedCV.file_url
      };
      onSubmit(formWithCV);
    } else {
      onSubmit(form);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  const handleCVSelect = (cv: CV | null) => {
    setSelectedCV(cv);
    setUploadedFile(null);
    if (errors.cv_file_url) {
      setErrors(prev => ({ ...prev, cv_file_url: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setSelectedCV(null);
      if (errors.cv_file_url) {
        setErrors(prev => ({ ...prev, cv_file_url: '' }));
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const renderError = (fieldName: string) => {
    return errors[fieldName] ? (
      <p className="text-red-400 text-sm mt-1">{errors[fieldName]}</p>
    ) : null;
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      className="space-y-8 w-full text-white mx-auto"
    >
      <div className="bg-[#181C23] bg-opacity-90 rounded-2xl p-6 shadow-xl border border-[#23283A] hover:border-blue-500 transition">
        <div className="flex items-center gap-2 mb-4">
          <FaFileAlt className="text-blue-400 text-xl" />
          <h2 className="text-xl font-bold tracking-tight">Add New Job</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Job Title <span className="text-red-400">*</span></label>
            <input 
              name="job_title" 
              value={form.job_title} 
              onChange={handleChange} 
              required 
              placeholder="e.g. Frontend Developer" 
              className={`w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none ${errors.job_title ? 'border border-red-400' : ''}`}
            />
            {renderError('job_title')}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Company Name <span className="text-red-400">*</span></label>
            <input 
              name="company_name" 
              value={form.company_name} 
              onChange={handleChange} 
              required 
              placeholder="e.g. Google" 
              className={`w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none ${errors.company_name ? 'border border-red-400' : ''}`}
            />
            {renderError('company_name')}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Job Type <span className="text-red-400">*</span></label>
            <select 
              name="job_type" 
              value={form.job_type} 
              onChange={handleChange} 
              required 
              className={`w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none ${errors.job_type ? 'border border-red-400' : ''}`}
            >
              <option value="">Select job type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
            {renderError('job_type')}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Platform <span className="text-red-400">*</span></label>
            <input 
              name="platform" 
              value={form.platform} 
              onChange={handleChange} 
              required 
              placeholder="e.g. LinkedIn" 
              className={`w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none ${errors.platform ? 'border border-red-400' : ''}`}
            />
            {renderError('platform')}
          </div>

          <div>
            <CVSelector
              onSelectCV={handleCVSelect}
              selectedCV={selectedCV}
              disabled={isSubmitting}
            />
            {renderError('cv_file_url')}
            
            <div className="mt-2">
              <button
                type="button"
                onClick={handleUploadClick}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-[#2A3140] hover:bg-[#323A4A] rounded transition disabled:opacity-50"
              >
                <FaUpload className="text-blue-400" />
                Upload new CV
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            
            {uploadedFile && (
              <div className="mt-2 p-2 bg-[#1A1F2A] rounded border border-[#2A3140]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaFileAlt className="text-blue-400 text-sm" />
                    <span className="text-sm">{uploadedFile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            'Save'
          )}
        </button>
      </div>
    </form>
  );
} 