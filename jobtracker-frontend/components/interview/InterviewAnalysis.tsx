import React, { useRef, useState } from 'react';

const analysisItems = [
  {
    color: 'bg-blue-600',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" /></svg>
    ),
    title: 'Body Language',
    desc: 'Eye contact, posture, gestures, and facial expressions',
  },
  {
    color: 'bg-green-500',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
    ),
    title: 'Communication Skills',
    desc: 'Speaking pace, clarity, and verbal confidence',
  },
  {
    color: 'bg-purple-600',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2 2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
    ),
    title: 'Content Analysis',
    desc: 'Answer structure, examples used, and key messages',
  },
  {
    color: 'bg-orange-500',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v4h-1m-4 0h1v-4h1m-4 0h1v4h1" /></svg>
    ),
    title: 'Overall Performance',
    desc: 'Comprehensive scoring and improvement suggestions',
  },
];

const InterviewAnalysis: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [showAnalyze, setShowAnalyze] = useState(false);
  const [showDummyAnalysis, setShowDummyAnalysis] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setShowAnalyze(true);
      setShowDummyAnalysis(false);
    }
  };

  const handleAnalyze = () => {
    setShowDummyAnalysis(true);
  };

  // Dummy analysis UI igual à imagem
  const DummyAnalysisResult = () => (
    <div className="w-full flex flex-col gap-8 mt-10">
      {/* Interview Performance Analysis Card */}
      <div className="bg-[#1A2232] rounded-2xl p-8 shadow-lg w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Interview Performance Analysis</h2>
        <div className="flex flex-col md:flex-row gap-8 mb-6">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">78%</div>
            <div className="text-gray-300">Overall Score</div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-green-400 mb-1">85%</div>
            <div className="text-gray-300">Communication</div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">72%</div>
            <div className="text-gray-300">Confidence</div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-orange-400 mb-1">80%</div>
            <div className="text-gray-300">Body Language</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="text-green-400 font-bold mb-2">Strengths</div>
            <ul className="text-gray-200 text-sm list-disc ml-5 space-y-1">
              <li>Clear articulation and good voice projection</li>
              <li>Maintains good eye contact with camera</li>
              <li>Answers are well-structured and concise</li>
              <li>Shows enthusiasm and passion for the role</li>
            </ul>
          </div>
          <div className="flex-1">
            <div className="text-orange-400 font-bold mb-2">Areas for Improvement</div>
            <ul className="text-orange-200 text-sm list-disc ml-5 space-y-1">
              <li>Reduce use of filler words (&apos;um&apos;, &apos;uh&apos;)</li>
              <li>Improve posture - sit up straighter</li>
              <li>Use more hand gestures to emphasize points</li>
              <li>Pause more between thoughts</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Key Moments & Recommendations */}
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Key Moments */}
        <div className="flex-1 bg-[#1A2232] rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-2">Key Moments</h3>
          <p className="text-gray-400 mb-4">Important moments identified in your interview</p>
          <div className="space-y-3">
            <div className="bg-[#232B3B] rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">2:15</div>
                <div className="text-gray-300 text-sm">Excellent example of leadership experience</div>
              </div>
              <span className="bg-green-700 text-green-200 text-xs px-3 py-1 rounded font-semibold">strength</span>
            </div>
            <div className="bg-[#232B3B] rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">5:30</div>
                <div className="text-gray-300 text-sm">Missed opportunity to mention specific achievements</div>
              </div>
              <span className="bg-orange-700 text-orange-200 text-xs px-3 py-1 rounded font-semibold">improvement</span>
            </div>
            <div className="bg-[#232B3B] rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">8:45</div>
                <div className="text-gray-300 text-sm">Great question about company culture</div>
              </div>
              <span className="bg-green-700 text-green-200 text-xs px-3 py-1 rounded font-semibold">strength</span>
            </div>
          </div>
        </div>
        {/* Recommendations */}
        <div className="flex-1 bg-[#1A2232] rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-2">Recommendations</h3>
          <p className="text-gray-400 mb-4">Personalized suggestions for improvement</p>
          <div className="flex flex-col gap-3">
            <div className="bg-[#232B3B] rounded-lg px-4 py-3 text-gray-200 font-medium">Practice the STAR method for behavioral questions</div>
            <div className="bg-[#232B3B] rounded-lg px-4 py-3 text-gray-200 font-medium">Record yourself more often to improve body language</div>
            <div className="bg-[#232B3B] rounded-lg px-4 py-3 text-gray-200 font-medium">Prepare 2-3 specific examples for each skill mentioned</div>
            <div className="bg-[#232B3B] rounded-lg px-4 py-3 text-gray-200 font-medium">Research the company&apos;s recent news and achievements</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-[98%] bg-[#151A23] flex flex-col items-center py-10 px-4">
      <div className='w-full relative'>
        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 bg-[#151A23]/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-bounce mb-4">
              <svg className="w-16 h-16 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Coming Soon!</h2>
            <p className="text-gray-300 text-lg max-w-md mx-auto">
              We&apos;re working hard to bring you AI-powered interview analysis. Stay tuned for this exciting feature!
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Interview Analysis</h1>
        <p className="text-gray-400 mb-6">Upload your interview video to get AI-powered feedback and improvement suggestions</p>
        <div className="w-full  flex flex-col md:flex-row gap-8">
          {/* Upload Card */}
          <div className="flex-1 bg-[#1A2232] rounded-2xl p-8 shadow-lg flex flex-col items-center justify-center min-h-[380px]">
            <h2 className="text-2xl font-bold text-white mb-2">Upload Interview Video</h2>
            <p className="text-gray-400 mb-6 text-center">Upload a recording of your practice interview or real interview</p>
            <div className="w-full flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-8 mb-6 bg-[#232B3B]">
              <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6.75A2.25 2.25 0 0013.5 4.5h-3A2.25 2.25 0 008.25 6.75v3.75m7.5 0v6.75A2.25 2.25 0 0113.5 19.5h-3A2.25 2.25 0 018.25 17.25V10.5m7.5 0H19.5a2.25 2.25 0 012.25 2.25v3a2.25 2.25 0 01-2.25 2.25h-1.5m-13.5 0H4.5A2.25 2.25 0 012.25 15.75v-3A2.25 2.25 0 014.5 10.5h1.5" /></svg>
              <p className="text-gray-400 mb-4">Drag and drop your video file here or click to browse</p>
              <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button
                className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer opacity-80 hover:opacity-100 transition"
                onClick={handleChooseFile}
              >
                Choose Video File
              </button>
              {videoFile && (
                <div className="mt-4 text-green-400 text-sm text-center">Selected: {videoFile.name}</div>
              )}
              {showAnalyze && (
                <button
                  className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition"
                  onClick={handleAnalyze}
                >
                  Analyze Interview
                </button>
              )}
            </div>
          </div>
          {/* Analysis Card */}
          <div className="flex-1 bg-[#1A2232] rounded-2xl p-8 shadow-lg min-h-[380px] flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-2">What We Analyze</h2>
            <p className="text-gray-400 mb-6">Our AI examines multiple aspects of your interview performance</p>
            <div className="flex flex-col gap-5">
              {analysisItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full ${item.color} shrink-0`}>{item.icon}</div>
                  <div>
                    <div className="text-white font-semibold text-lg">{item.title}</div>
                    <div className="text-gray-400 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Dummy analysis UI abaixo dos cards, só aparece após Analyze Interview */}
        {showDummyAnalysis && <DummyAnalysisResult />}
      </div>
    </div>
  );
};

export default InterviewAnalysis; 