import { useState, useEffect } from 'react';
import { FaFileAlt, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';

interface CV {
  id: number;
  file_url: string;
  original_filename: string;
  created_at: string;
}

interface CVSelectorProps {
  onSelectCV: (cv: CV | null) => void;
  selectedCV: CV | null;
  disabled?: boolean;
}

export default function CVSelector({ onSelectCV, selectedCV, disabled = false }: CVSelectorProps) {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCVs = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/cvs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCvs(response.data);
      } catch (error) {
        console.error('Error fetching CVs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCVs();
  }, []);

  const handleSelectCV = (cv: CV) => {
    onSelectCV(cv);
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    onSelectCV(null);
    setIsOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getFileName = (fileUrl: string, originalFilename: string) => {
    return originalFilename || fileUrl.split('/').pop() || 'CV';
  };

  return (
    <div className="relative">
      <label className="block mb-1 text-sm font-medium">
        CV/Resume <span className="text-red-400">*</span>
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full p-2 rounded bg-[#23283A] focus:ring-2 focus:ring-blue-500 outline-none text-left flex items-center justify-between ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2A3140]'
          }`}
        >
          <div className="flex items-center gap-2">
            <FaFileAlt className="text-blue-400" />
            <span className="truncate">
              {selectedCV 
                ? getFileName(selectedCV.file_url, selectedCV.original_filename)
                : 'Select a CV or upload a new one'
              }
            </span>
          </div>
          <FaChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-[#23283A] border border-[#2A3140] rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-400">
                Loading CVs...
              </div>
            ) : cvs.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No previous CVs found
              </div>
            ) : (
              <>
                <div className="p-2 border-b border-[#2A3140]">
                  <button
                    type="button"
                    onClick={handleClearSelection}
                    className="w-full text-left p-2 hover:bg-[#2A3140] rounded text-blue-400"
                  >
                    + Upload new CV
                  </button>
                </div>
                {cvs.map((cv) => (
                  <button
                    key={cv.id}
                    type="button"
                    onClick={() => handleSelectCV(cv)}
                    className="w-full text-left p-3 hover:bg-[#2A3140] border-b border-[#2A3140] last:border-b-0"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FaFileAlt className="text-blue-400 text-sm" />
                      <span className="font-medium truncate">
                        {getFileName(cv.file_url, cv.original_filename)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Uploaded on {formatDate(cv.created_at)}
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {selectedCV && (
        <div className="mt-2 p-2 bg-[#1A1F2A] rounded border border-[#2A3140]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFileAlt className="text-blue-400 text-sm" />
              <span className="text-sm">
                {getFileName(selectedCV.file_url, selectedCV.original_filename)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 