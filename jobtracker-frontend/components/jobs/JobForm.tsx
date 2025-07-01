import { useState, useRef, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa';

export interface JobFormData {
  job_title: string;
  company_name: string;
  job_type: string;
  platform: string;
  status: string;
  cv_file_url: string;
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
   
    if (!form.cv_file_url && !selectedFile) {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setForm(prev => ({ ...prev, cv_file_url: file.name }));
        setErrors(prev => ({ ...prev, cv_file_url: '' }));
      } else {
        setErrors(prev => ({ ...prev, cv_file_url: 'Please select a PDF file' }));
      }
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (selectedFile) {
      const formData = new FormData();
      formData.append('cv_file', selectedFile);
      
      Object.keys(form).forEach(key => {
        if (key !== 'cv_file_url') {
          formData.append(key, form[key as keyof typeof form]);
        }
      });

      onSubmit(formData);
    } else {
      onSubmit(form);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
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
            <label className="block mb-1 text-sm font-medium">Resume/CV <span className="text-red-400">*</span></label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div>
                <input 
                  type="text" 
                  value={form.cv_file_url} 
                  readOnly 
                  placeholder="Select a PDF file" 
                  className={`w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none ${errors.cv_file_url ? 'border border-red-400' : ''}`}
                />
                {renderError('cv_file_url')}
              </div>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
                <button 
                  type="button" 
                  onClick={handleFileClick}
                  className="w-full flex items-center justify-center gap-2 p-2 rounded bg-gray-700 hover:bg-gray-800 text-sm font-medium"
                >
                  <span>Upload PDF</span>
                </button>
              </div>
            </div>
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