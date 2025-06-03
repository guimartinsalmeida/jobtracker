'use client';
import DoughnutChart from '@/components/charts/DoughnutChart';
import { Line } from 'react-chartjs-2';


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

export default function Charts() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-48 h-48 mb-4">
        <DoughnutChart data={doughnutData} options={doughnutOptions} />
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
      <div className="h-56">
        <Line data={lineData} options={lineOptions} />
      </div>
    </>
  );
} 