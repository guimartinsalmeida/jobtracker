import React, { useState } from 'react';

interface AnalysisResult {
  optimizedCV: string;
  timestamp: string;
  jobDescription: string;
}

export default function CVAnalysis() {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);

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

  return (
    <div className="min-h-screen w-[90%] bg-[#131A24] flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">CV Optimizer with AI</h1>
          <p className="text-gray-400 text-lg">Paste your CV and JD to receive a customized CV optimized for the job.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* CV Input */}
          <div className="flex-1 bg-[#1A2232] rounded-xl p-6 shadow-lg flex flex-col border border-[#2A3344] hover:border-blue-500/50 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">📄</span> Your CV
            </h2>
            <textarea
              className="bg-[#232B3B] text-gray-200 rounded-lg p-4 h-56 resize-none mb-4 border border-[#2A3344] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
              placeholder="Paste your CV content here..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
            />
          </div>

          {/* JD Input */}
          <div className="flex-1 bg-[#1A2232] rounded-xl p-6 shadow-lg flex flex-col border border-[#2A3344] hover:border-blue-500/50 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">📋</span> Job Description
            </h2>
            <textarea
              className="bg-[#232B3B] text-gray-200 rounded-lg p-4 h-56 resize-none mb-4 border border-[#2A3344] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <button
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-3 flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={analyzeCV}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Optimizing...
                </>
              ) : (
                <>
                  <span className="text-xl">🤖</span> Optimize CV
                </>
              )}
            </button>
          </div>
        </div>

        {/* Analysis History */}
        {analysisHistory.length > 0 && (
          <div className="mt-8 bg-[#1A2232] rounded-xl p-6 shadow-lg border border-[#2A3344]">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
              <span className="text-blue-400">📚</span> Analysis History
            </h2>
            <div className="space-y-4">
              {analysisHistory.map((analysis, index) => (
                <div
                  key={index}
                  className="bg-[#232B3B] rounded-lg p-4 border border-[#2A3344] hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => loadPreviousAnalysis(analysis)}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-gray-200">
                      <p className="font-medium">Analysis from {new Date(analysis.timestamp).toLocaleString()}</p>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">{analysis.jobDescription}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(analysis.optimizedCV);
                        alert('CV copied to clipboard!');
                      }}
                      className="bg-[#2A3344] hover:bg-[#3A4354] text-gray-200 px-3 py-1 rounded-lg flex items-center gap-2 transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optimized CV Result */}
        {analysisResult && (
          <div className="mt-8 bg-[#1A2232] rounded-xl p-6 shadow-lg border border-[#2A3344] animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">✨</span> Optimized CV
              </h2>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(analysisResult.optimizedCV);
                  alert('CV copied to clipboard!');
                }}
                className="bg-[#232B3B] hover:bg-[#2A3344] text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                Copy
              </button>
            </div>
            <div className="bg-[#232B3B] rounded-lg p-6 border border-[#2A3344] hover:border-blue-500/50 transition-all duration-300">
              <pre className="text-gray-200 whitespace-pre-wrap font-sans leading-relaxed">{analysisResult.optimizedCV}</pre>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg font-medium flex items-center gap-2 animate-shake">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
