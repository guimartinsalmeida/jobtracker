import React, { useState } from 'react';

interface AnalysisResult {
  matchScore: number;
  suggestions: string[];
  missingSkills: string[];
  improvements: string[];
}

export default function CVAnalysis() {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const analyzeCV = async () => {
    if (!cvText || !jobDescription) {
      alert('Please provide both CV and job description');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cv: cvText,
          jobDescription: jobDescription,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing CV:', error);
      alert('Failed to analyze CV. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-[90%] bg-[#131A24] flex flex-col items-center py-12 px-4">
      <div className="w-full">
       
        <h1 className="text-3xl font-bold text-white mb-2">CV Analysis</h1>
        <p className="text-gray-400 mb-8">Upload your CV and job description to get AI-powered insights</p>
        <div className="flex flex-col md:flex-row gap-8">
          {/* CV Card */}
          <div className="flex-1 bg-[#1A2232] rounded-xl p-6 shadow-lg flex flex-col">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-1">
              <span className="text-2xl">📄</span> Your CV
            </h2>
            <p className="text-gray-400 text-sm mb-4">Paste your CV content or key sections</p>
            <textarea
              className="bg-[#232B3B] text-gray-200 rounded-lg p-4 h-56 resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Paste your CV content here..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
            />
            <button className="bg-white/10 text-gray-300 border border-white/20 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-white/20 transition mb-2">
              <span className="text-lg">⬆️</span> Upload CV File
            </button>
          </div>
          {/* Job Description Card */}
          <div className="flex-1 bg-[#1A2232] rounded-xl p-6 shadow-lg flex flex-col">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-1">
              <span className="text-2xl">📄</span> Job Description
            </h2>
            <p className="text-gray-400 text-sm mb-4">Paste the job description you're applying for</p>
            <textarea
              className="bg-[#232B3B] text-gray-200 rounded-lg p-4 h-56 resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <button 
              className="bg-blue-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={analyzeCV}
              disabled={isLoading}
            >
              <span className="text-lg">🤖</span> {isLoading ? 'Analyzing...' : 'Analyze with AI'}
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="mt-8 bg-[#1A2232] rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Analysis Results</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Match Score</h3>
              <div className="w-full bg-[#232B3B] rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${analysisResult.matchScore}%` }}
                />
              </div>
              <p className="text-gray-400 mt-2">{analysisResult.matchScore}% match with job requirements</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Missing Skills</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {analysisResult.missingSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Suggested Improvements</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {analysisResult.improvements.map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 