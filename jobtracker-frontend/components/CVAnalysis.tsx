import React, { useState } from 'react';

interface AnalysisResult {
  optimizedCV: string;
  timestamp: string;
  jobDescription: string;
}

interface CompatibilityAnalysis {
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
}

export default function CVAnalysis() {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);
  const [compatibilityAnalysis, setCompatibilityAnalysis] = useState<CompatibilityAnalysis | null>(null);
  const [showCompatibility, setShowCompatibility] = useState(false);

  // Function to extract keywords from text
  const extractKeywords = (text: string): string[] => {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3); // Filter out short words
    
    // Remove common words
    const commonWords = new Set(['the', 'and', 'that', 'have', 'with', 'this', 'from', 'your', 'will', 'would', 'should', 'could', 'must', 'need', 'want', 'make', 'made', 'making', 'work', 'working', 'worked']);
    return [...new Set(words.filter(word => !commonWords.has(word)))];
  };

  // Function to analyze compatibility
  const analyzeCompatibility = (cv: string, jd: string): CompatibilityAnalysis => {
    const cvKeywords = extractKeywords(cv);
    const jdKeywords = extractKeywords(jd);
    
    const matchedKeywords = jdKeywords.filter(keyword => 
      cvKeywords.some(cvKeyword => cvKeyword.includes(keyword) || keyword.includes(cvKeyword))
    );
    
    const missingKeywords = jdKeywords.filter(keyword => 
      !matchedKeywords.includes(keyword)
    );
    
    const matchPercentage = Math.round((matchedKeywords.length / jdKeywords.length) * 100);
    
    return {
      matchPercentage,
      matchedKeywords,
      missingKeywords
    };
  };

  const analyzeCV = async () => {
    if (!cvText || !jobDescription) {
      alert('Please provide both CV and job description');
      return;
    }
    const apiKey = process.env.NEXT_PUBLIC_AI_API_KEY;
    console.log(apiKey);
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setShowCompatibility(false);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'CVOptimizerApp',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
          messages: [
            {
              role: 'system',
              content: 'You are a professional CV optimization assistant.',
            },
            {
              role: 'user',
              content: `Here is my current CV:\n\n${cvText}\n\nAnd here is the job description:\n\n${jobDescription}\n\nPlease rewrite my CV to better fit the job description. Keep it truthful and professional.`,
            },
          ],
        }),
      });

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;

      if (!reply) throw new Error('No response from AI.');

      const newAnalysis = {
        optimizedCV: reply,
        timestamp: new Date().toISOString(),
        jobDescription: jobDescription
      };

      setAnalysisResult(newAnalysis);
      setAnalysisHistory(prev => [newAnalysis, ...prev]);
      // Calculate compatibility only after analysis
      const analysis = analyzeCompatibility(cvText, jobDescription);
      setCompatibilityAnalysis(analysis);
      setShowCompatibility(true);
    } catch (error) {
      console.error(error);
      setError('Failed to analyze CV. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPreviousAnalysis = (analysis: AnalysisResult) => {
    setAnalysisResult(analysis);
    setJobDescription(analysis.jobDescription);
  };

  const exportAsPDF = async () => {
    if (!analysisResult) return;
    
    try {
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: analysisResult.optimizedCV }),
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `optimized-cv-${new Date().toISOString()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  const exportAsTXT = () => {
    if (!analysisResult) return;
    
    const blob = new Blob([analysisResult.optimizedCV], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optimized-cv-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const exportAsDOCX = async () => {
    if (!analysisResult) return;
    
    try {
      const response = await fetch('/api/export-docx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: analysisResult.optimizedCV }),
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `optimized-cv-${new Date().toISOString()}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting DOCX:', error);
      alert('Failed to export DOCX. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-[90%] bg-[#131A24] flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-fadeIn">
            CV Optimizer with AI
          </h1>
          <p className="text-gray-400 text-lg animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Paste your CV and JD to receive a customized CV optimized for the job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="relative group">
              <label className="block text-white text-sm font-medium mb-2">Your CV</label>
              <textarea
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                className="w-full h-64 p-4 bg-[#1E2536] text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                placeholder="Paste your CV here..."
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <label className="block text-white text-sm font-medium mb-2">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-64 p-4 bg-[#1E2536] text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                placeholder="Paste the job description here..."
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={analyzeCV}
            disabled={isLoading}
            className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-105 ${
              isLoading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analyzing...</span>
              </div>
            ) : (
              'Analyze CV'
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-8 animate-fadeIn">
            {error}
          </div>
        )}

        {showCompatibility && compatibilityAnalysis && (
          <div className="mb-8 p-6 bg-[#1E2536] rounded-lg border border-gray-700 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-4">Compatibility Analysis</h3>
            <div className="flex items-center mb-4">
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                  style={{ width: `${compatibilityAnalysis.matchPercentage}%` }}
                />
              </div>
              <span className="ml-4 text-white font-bold">{compatibilityAnalysis.matchPercentage}% Match</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-green-400 font-medium mb-2">Matched Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {compatibilityAnalysis.matchedKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-red-400 font-medium mb-2">Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {compatibilityAnalysis.missingKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {analysisResult && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#1E2536] p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Optimized CV</h3>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-gray-300">{analysisResult.optimizedCV}</pre>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={exportAsPDF}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Export as PDF
              </button>
              <button
                onClick={exportAsTXT}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Export as TXT
              </button>
              <button
                onClick={exportAsDOCX}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                Export as DOCX
              </button>
            </div>
          </div>
        )}

        {analysisHistory.length > 0 && (
          <div className="mt-12 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-4">Analysis History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysisHistory.map((analysis, index) => (
                <div
                  key={index}
                  onClick={() => loadPreviousAnalysis(analysis)}
                  className="bg-[#1E2536] p-4 rounded-lg border border-gray-700 cursor-pointer hover:border-blue-500 transition-all duration-300"
                >
                  <p className="text-gray-400 text-sm mb-2">
                    {new Date(analysis.timestamp).toLocaleString()}
                  </p>
                  <p className="text-white line-clamp-2">{analysis.jobDescription}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
