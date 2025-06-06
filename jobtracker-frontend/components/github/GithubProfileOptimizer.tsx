"use client"
import React, { useState } from 'react';
import { FaGithub } from "react-icons/fa";

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
  const [username, setUsername] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleAnalyze = () => {
    setShowAnalysis(true);
  };

  return (
    <div className="min-h-screen w-[98%] bg-[#151A23] flex flex-col items-center py-10 px-4">
      {/* Plano de Otimização */}
     
      <div className="w-full">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-white mb-2">
          <FaGithub className="text-4xl text-white" />
          GitHub Profile Optimizer
        </h1>
        <p className="text-gray-400 mb-6">Otimize seu perfil GitHub para atrair recrutadores</p>
        {/* Input de username e botão */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 w-full">
          <div className="relative flex-1">
            <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
            <input
              type="text"
              className="flex-1 bg-[#232B3B] text-white pl-10 w-full pr-4 py-3 rounded-lg outline-none border-none"
              placeholder="Digite seu usuário do GitHub"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            onClick={handleAnalyze}
          >
            Analisar Perfil
          </button>
        </div>
        {/* Cards de análise */}
        {showAnalysis && (
<div>
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
            <div className="bg-[#1A2232] rounded-2xl p-8 shadow-lg w-full mb-10 mt-4">
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

</div>
          
        )}
        {/* Análise dos Principais Repositórios */}
        {showAnalysis && (
<div className="w-full mb-10">
        <div className="bg-[#202736] rounded-2xl p-6 md:p-10 shadow-lg mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Plano de Otimização</h2>
          <p className="text-gray-400 mb-6">Ações recomendadas para melhorar seu perfil</p>

          {/* Seções do Plano */}
          <div className="flex flex-col gap-6">
            {/* Profile Optimization */}
            <div className="bg-[#232B3B] rounded-xl p-6 relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">Profile Optimization</h3>
                <span className="bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full">High Priority</span>
              </div>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Adicionar bio profissional com suas especialidades</li>
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Incluir link para portfolio/website</li>
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Adicionar localização e disponibilidade para trabalho</li>
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Usar foto profissional como avatar</li>
              </ul>
            </div>
            {/* Repository Quality */}
            <div className="bg-[#232B3B] rounded-xl p-6 relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">Repository Quality</h3>
                <span className="bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full">High Priority</span>
              </div>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Criar READMEs detalhados para top 5 repositórios</li>
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Adicionar badges de build status e coverage</li>
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Incluir demos/screenshots dos projetos</li>
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Organizar código com estrutura clara</li>
              </ul>
            </div>
            {/* Showcase Projects */}
            <div className="bg-[#232B3B] rounded-xl p-6 relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">Showcase Projects</h3>
                <span className="bg-yellow-700 text-yellow-200 text-xs font-semibold px-3 py-1 rounded-full">Medium Priority</span>
              </div>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Pin 6 repositórios que demonstram suas skills</li>
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Criar um projeto full-stack completo</li>
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Contribuir para projetos open source populares</li>
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Adicionar documentação técnica detalhada</li>
              </ul>
            </div>
            {/* Community Engagement */}
            <div className="bg-[#232B3B] rounded-xl p-6 relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">Community Engagement</h3>
                <span className="bg-yellow-700 text-yellow-200 text-xs font-semibold px-3 py-1 rounded-full">Medium Priority</span>
              </div>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Participar de discussões em issues e PRs</li>
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Ajudar a revisar PRs de outros</li>
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Compartilhar conhecimento em fóruns</li>
                <li className="flex items-center gap-2 text-gray-200"><input type="checkbox" className="accent-purple-600" disabled />Participar de eventos ou hackathons</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
        )}
      </div>
    </div>
  );
};

export default GithubProfileOptimizer; 