import React from 'react';


export default function CVAnalysis() {
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
            />
            <button className="bg-blue-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition font-semibold">
              <span className="text-lg">🤖</span> Analyze with AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 