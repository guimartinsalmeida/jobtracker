import React, { useState } from 'react';

interface AnalysisResult {
  optimizedCV: string;
}

export default function CVAnalysis() {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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

      setAnalysisResult({ optimizedCV: reply });
    } catch (error) {
      console.error(error);
      setError('Failed to analyze CV. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-[90%] bg-[#131A24] flex flex-col items-center py-12 px-4">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-white mb-2">CV Optimizer with AI</h1>
        <p className="text-gray-400 mb-8">Paste your CV and JD to receive a customized CV optimized for the job.</p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* CV Input */}
          <div className="flex-1 bg-[#1A2232] rounded-xl p-6 shadow-lg flex flex-col">
            <h2 className="text-xl font-semibold text-white mb-2">📄 Your CV</h2>
            <textarea
              className="bg-[#232B3B] text-gray-200 rounded-lg p-4 h-56 resize-none mb-4"
              placeholder="Paste your CV content here..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
            />
          </div>

          {/* JD Input */}
          <div className="flex-1 bg-[#1A2232] rounded-xl p-6 shadow-lg flex flex-col">
            <h2 className="text-xl font-semibold text-white mb-2">📄 Job Description</h2>
            <textarea
              className="bg-[#232B3B] text-gray-200 rounded-lg p-4 h-56 resize-none mb-4"
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <button
              className="bg-blue-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={analyzeCV}
              disabled={isLoading}
            >
              🤖 {isLoading ? 'Optimizing...' : 'Optimize CV'}
            </button>
          </div>
        </div>

        {/* Optimized CV Result */}
        {analysisResult && (
          <div className="mt-8 bg-[#1A2232] rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Optimized CV</h2>
            <pre className="text-gray-200 whitespace-pre-wrap">{analysisResult.optimizedCV}</pre>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-500 font-semibold">{error}</div>
        )}
      </div>
    </div>
  );
}
