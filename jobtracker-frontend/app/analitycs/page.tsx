'use client';
import { Sidebar } from '@/components/layout/Sidebar';
import { FiPlus } from 'react-icons/fi';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import 'chart.js/auto';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const summaryCards = [
  {
    label: 'Total Applications',
    value: 24,
    icon: <FiPlus className="text-blue-400" />,
    change: '+12%',
    changeColor: 'text-green-400',
    sub: 'vs last month',
    bg: 'bg-[#181F2A]'
  },
  {
    label: 'Interviews Scheduled',
    value: 8,
    icon: <FiPlus className="text-purple-400" />,
    change: '+33%',
    changeColor: 'text-green-400',
    sub: 'vs last month',
    bg: 'bg-[#181F2A]'
  },
  {
    label: 'Offers Received',
    value: 2,
    icon: <FiPlus className="text-green-400" />,
    change: '+100%',
    changeColor: 'text-green-400',
    sub: 'vs last month',
    bg: 'bg-[#181F2A]'
  },
  {
    label: 'Rejections',
    value: 7,
    icon: <FiPlus className="text-red-400" />,
    change: '-16%',
    changeColor: 'text-red-400',
    sub: 'vs last month',
    bg: 'bg-[#181F2A]'
  },
];

const doughnutData = {
  labels: ['Initial Screen', 'Tech Interview', 'Manager Talk', 'Waiting Offer', 'Rejected'],
  datasets: [
    {
      data: [6, 8, 3, 2, 5],
      backgroundColor: [
        '#3B82F6', // blue
        '#8B5CF6', // purple
        '#F59E42', // orange
        '#22D3EE', // cyan
        '#EF4444', // red
      ],
      borderWidth: 0,
    },
  ],
};

const doughnutOptions = {
  cutout: '70%',
  plugins: {
    legend: {
      display: false,
    },
  },
};

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Applications',
      data: [3, 7, 6, 10, 13],
      fill: false,
      borderColor: '#3B82F6',
      tension: 0.4,
      pointBackgroundColor: '#3B82F6',
      pointBorderColor: '#fff',
      pointRadius: 5,
    },
  ],
};

const lineOptions = {
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#A3A3A3' },
    },
    y: {
      grid: { color: '#232B3B' },
      ticks: { color: '#A3A3A3', stepSize: 2 },
      beginAtZero: true,
    },
  },
};

const recentApplications = [
  {
    title: 'Backend Engineer',
    company: 'Spotify',
    stage: 'Tech Interview',
    stageColor: 'bg-purple-600',
    daysAgo: '3 days ago',
  },
  {
    title: 'Frontend Developer',
    company: 'Google',
    stage: 'Initial Screen',
    stageColor: 'bg-blue-600',
    daysAgo: '5 days ago',
  },
];

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-[#151A23]">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back, Alex! <span className="inline-block">👋</span></h1>
        <p className="text-gray-400 mb-8">Here is an overview of your job search progress</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryCards.map((card, idx) => (
            <div key={idx} className={`rounded-xl p-6 ${card.bg} flex flex-col gap-2 shadow-md`}>
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                {card.icon}
                {card.label}
              </div>
              <div className="text-3xl font-bold text-white">{card.value}</div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${card.changeColor}`}>{card.change}</span>
                <span className="text-xs text-gray-400">{card.sub}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl bg-[#181F2A] p-6 shadow-md">
            <h2 className="text-white font-semibold mb-4">Applications by Stage</h2>
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 mb-4">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {doughnutData.labels.map((label, idx) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: doughnutData.datasets[0].backgroundColor[idx] }}></span>
                    <span className="text-gray-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-[#181F2A] p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Applications Over Time</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#232B3B] text-gray-400">Weekly</button>
                <button className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-700 text-white">Monthly</button>
              </div>
            </div>
            <div className="h-56">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-[#181F2A] p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Recent Applications</h2>
            <a href="#" className="text-blue-400 text-sm font-semibold hover:underline">View all</a>
          </div>
          <div className="flex flex-col gap-4">
            {recentApplications.map((app, idx) => (
              <div key={idx} className="flex items-center justify-between bg-[#232B3B] rounded-lg px-4 py-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg">
                    {app.title[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{app.title}</div>
                    <div className="text-gray-400 text-sm">{app.company}</div>
                  </div>
                  <span className={`ml-4 px-2 py-1 rounded text-xs font-semibold ${app.stageColor} text-white`}>{app.stage}</span>
                </div>
                <div className="text-gray-400 text-xs">{app.daysAgo}</div>
              </div>
            ))}
          </div>
          <button className="fixed bottom-10 right-10 bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-full shadow-lg transition flex items-center justify-center">
            <FiPlus size={24} />
          </button>
        </div>
      </main>
    </div>
  );
} 