import React, { forwardRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const defaultData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Savings (₦)',
      data: [1200000, 1500000, 1800000, 2200000, 2700000, 3200000, 3800000],
      borderColor: 'rgba(138, 43, 226, 1)',
      backgroundColor: 'rgba(138, 43, 226, 0.08)',
      tension: 0.3,
      fill: true,
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
}

const SavingsChart = forwardRef(({ labels, values }, ref) => {
  const data = labels && values ? { labels, datasets: [{ ...defaultData.datasets[0], data: values }] } : defaultData
  return <Line ref={ref} data={data} options={options} />
})

export default SavingsChart
