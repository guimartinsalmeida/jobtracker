import React, { useState } from 'react';

export default function InterviewPreparation() {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  return (
    <div className=" min-h-screen w-[98%] py-10 px-4">
      <h1 className="text-3xl font-bold text-white mb-2">Interview Preparation</h1>
      <p className="text-gray-400 mb-6">Get AI-generated interview questions and practice answers tailored to your role</p>
      <div className="bg-[#161922] bg-opacity-95 rounded-3xl p-10 shadow-2xl border border-[#23283A]">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
          Job Information
        </h2>
        <p className="text-gray-400 text-base mb-7">Provide details about the position to generate relevant questions</p>
        <form className="space-y-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-xs font-medium text-gray-300 tracking-wide">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g., Senior Frontend Developer"
                className="w-full p-3 rounded-xl bg-[#23283A] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none border border-[#23283A] transition"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-xs font-medium text-gray-300 tracking-wide">Company</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="e.g., Google, Microsoft, Startup Inc."
                className="w-full p-3 rounded-xl bg-[#23283A] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none border border-[#23283A] transition"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-xs font-medium text-gray-300 tracking-wide">Job Description (Optional)</label>
            <textarea
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              placeholder="Paste the job description for more personalized questions..."
              className="w-full p-3 rounded-xl bg-[#23283A] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none border border-[#23283A] min-h-[90px] transition"
            />
          </div>
          <button
            type="button"
            className="w-full mt-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-lg transition flex items-center justify-center gap-2"
          >
            <span className="material-icons align-middle">chat</span>
            Generate Interview Questions
          </button>
        </form>
      </div>
    </div>
  );
} 