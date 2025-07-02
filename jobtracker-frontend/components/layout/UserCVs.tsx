'use client';
import { useState, useEffect } from 'react';
import { FaFileAlt, FaEye, FaDownload } from 'react-icons/fa';
import axios from 'axios';

interface CV {
  id: number;
  file_url: string;
  original_filename: string;
  created_at: string;
}

export function UserCVs() {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
        setCvs(response.data.slice(0, 5)); // Mostrar apenas os 5 mais recentes
      } catch (error) {
        console.error('Error fetching CVs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCVs();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getFileName = (fileUrl: string, originalFilename: string) => {
    return originalFilename || fileUrl.split('/').pop()?.replace('.pdf', '') || 'CV';
  };

  const handleViewCV = (cv: CV) => {
    window.open(cv.file_url, '_blank');
  };

  const handleDownloadCV = (cv: CV) => {
    const link = document.createElement('a');
    link.href = cv.file_url;
    link.download = getFileName(cv.file_url, cv.original_filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (cvs.length === 0 && !isLoading) {
    return null; // Não mostrar se não há CVs
  }

  return (
    <div className="w-full">
      <div 
        className="cursor-pointer hover:bg-[#232B3B] transition-colors rounded-lg p-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-white text-sm font-medium flex items-center gap-2">
            <FaFileAlt className="text-blue-400" />
            Meus CVs ({cvs.length})
          </h3>
          <div className={`transform transition-transform text-xs ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-2">
          {isLoading ? (
            <div className="p-2 text-center text-gray-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mx-auto"></div>
              <p className="mt-1 text-xs">Carregando...</p>
            </div>
          ) : (
            <div className="max-h-48 overflow-y-auto space-y-1">
              {cvs.map((cv) => (
                <div key={cv.id} className="p-2 bg-[#1A1F2A] rounded border border-gray-700/30 hover:bg-[#232B3B] transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-1">
                        <FaFileAlt className="text-blue-400 text-xs flex-shrink-0" />
                        <p className="text-white text-xs font-medium truncate">
                          {getFileName(cv.file_url, cv.original_filename)}
                        </p>
                      </div>
                      <p className="text-gray-400 text-xs">
                        {formatDate(cv.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-1">
                      <button
                        onClick={() => handleViewCV(cv)}
                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                        title="Visualizar CV"
                      >
                        <FaEye className="text-xs" />
                      </button>
                      <button
                        onClick={() => handleDownloadCV(cv)}
                        className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                        title="Baixar CV"
                      >
                        <FaDownload className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {cvs.length > 0 && (
            <div className="mt-2 p-2 bg-[#1A1F2A] rounded border border-gray-700/30">
              <p className="text-gray-400 text-xs text-center">
                {cvs.length} CVs recentes
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 