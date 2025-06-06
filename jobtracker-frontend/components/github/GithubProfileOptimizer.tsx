"use client"
import React, { useState } from 'react';

const dummyProfile = {
  score: 72,
  repos: 28,
  stars: 156,
  followers: 89,
  contributions: 324,
  insights: [
    {
      color: 'green',
      title: 'Boa consistência de commits',
      desc: 'Você mantém uma boa frequência de commits ao longo do ano',
    },
    {
      color: 'yellow',
      title: 'README em repositórios',
      desc: '60% dos seus repositórios não têm README detalhado',
    },
    {
      color: 'blue',
      title: 'Diversificar linguagens',
      desc: 'Considere contribuir em projetos com outras tecnologias',
    },
  ],
};

const GithubProfileOptimizer: React.FC = () => {
  const [username, setUsername] = useState('johndoe');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleAnalyze = () => {
    setShowAnalysis(true);
  };

  return (
    <div className="min-h-screen w-[98%] bg-[#151A23] flex flex-col items-center py-10 px-4">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-white mb-2">GitHub Profile Optimizer</h1>
        <p className="text-gray-400 mb-6">Otimize seu perfil GitHub para atrair recrutadores</p>
        {/* Input de username e botão */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 w-full max-w-2xl">
          <input
            type="text"
            className="flex-1 bg-[#232B3B] text-white px-4 py-3 rounded-lg outline-none border-none"
            placeholder="Digite seu usuário do GitHub"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            onClick={handleAnalyze}
          >
            Analisar Perfil
          </button>
        </div>
        {/* Cards de análise */}
        {showAnalysis && (
          <div className="flex flex-col md:flex-row gap-8 mb-10 w-full">
            {/* Profile Score */}
            <div className="flex-1 bg-[#1A2232] rounded-2xl p-8 shadow-lg flex flex-col items-center justify-center min-h-[200px]">
              <div className="text-lg text-gray-400 mb-2">Profile Score</div>
              <div className="relative flex items-center justify-center mb-2">
                <svg className="w-24 h-24" viewBox="0 0 36 36">
                  <path
                    className="text-gray-700"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    className="text-yellow-400"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeDasharray="${dummyProfile.score}, 100"
                  />
                </svg>
                <span className="absolute text-3xl font-bold text-yellow-400">{dummyProfile.score}</span>
              </div>
              <div className="text-gray-400 text-sm">Bom, mas pode melhorar</div>
            </div>
            {/* Métricas Atuais */}
            <div className="flex-1 bg-[#1A2232] rounded-2xl p-8 shadow-lg min-h-[200px] flex flex-col justify-center">
              <div className="text-lg text-gray-400 mb-2">Métricas Atuais</div>
              <div className="flex flex-col gap-2 text-white text-lg">
                <div className="flex justify-between"><span>Repositórios:</span> <span>{dummyProfile.repos}</span></div>
                <div className="flex justify-between"><span>Stars recebidas:</span> <span className="text-yellow-400">{dummyProfile.stars}</span></div>
                <div className="flex justify-between"><span>Seguidores:</span> <span>{dummyProfile.followers}</span></div>
                <div className="flex justify-between"><span>Contribuições (ano):</span> <span className="text-green-400">{dummyProfile.contributions}</span></div>
              </div>
            </div>
            {/* AI Insights */}
            <div className="flex-1 bg-[#1A2232] rounded-2xl p-8 shadow-lg min-h-[200px] flex flex-col gap-4">
              <div className="text-lg text-gray-400 mb-2">AI Insights</div>
              {dummyProfile.insights.map((insight, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-4 text-sm font-medium border-l-4 ${
                    insight.color === 'green'
                      ? 'border-green-500 bg-green-900/20 text-green-200'
                      : insight.color === 'yellow'
                      ? 'border-yellow-500 bg-yellow-900/20 text-yellow-200'
                      : 'border-blue-500 bg-blue-900/20 text-blue-200'
                  }`}
                >
                  <div className="font-bold mb-1">{insight.title}</div>
                  <div>{insight.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Análise dos Principais Repositórios */}
        {showAnalysis && (
          <div className="bg-[#1A2232] rounded-2xl p-8 shadow-lg w-full mt-4">
            <h2 className="text-2xl font-bold text-white mb-2">Análise dos Principais Repositórios</h2>
            <p className="text-gray-400 mb-4">Como melhorar seus repositórios mais importantes</p>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-[#232B3B] rounded-xl p-6">
                <div className="text-white font-semibold mb-1">reponame-1</div>
                <div className="text-gray-400 text-sm mb-2">README ausente, poucas issues abertas</div>
                <div className="text-yellow-400 text-xs">Sugestão: Adicione um README detalhado e incentive contribuições</div>
              </div>
              <div className="flex-1 bg-[#232B3B] rounded-xl p-6">
                <div className="text-white font-semibold mb-1">reponame-2</div>
                <div className="text-gray-400 text-sm mb-2">Pouca documentação de código</div>
                <div className="text-yellow-400 text-xs">Sugestão: Comente funções principais e adicione exemplos de uso</div>
              </div>
              <div className="flex-1 bg-[#232B3B] rounded-xl p-6">
                <div className="text-white font-semibold mb-1">reponame-3</div>
                <div className="text-gray-400 text-sm mb-2">Pouca diversidade de tecnologias</div>
                <div className="text-blue-400 text-xs">Sugestão: Experimente usar outras stacks ou linguagens</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubProfileOptimizer; 