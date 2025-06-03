'use client';

import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

let isRegistered = false;

export default function LineChart({ data, options }: any) {
  useEffect(() => {
    if (!isRegistered) {
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      isRegistered = true;
    }
  }, []);

  return <Line data={data} options={options} />;
}
