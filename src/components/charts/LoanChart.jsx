import React, { forwardRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const defaultData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Loans Disbursed (₦)',
      data: [500000, 650000, 700000, 850000, 900000, 750000, 820000],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
    },
  ],
}

const options = {
  responsive: true,
  plugins: { legend: { display: false } },
}

const LoanChart = forwardRef(({ labels, values }, ref) => {
  const data = labels && values ? { labels, datasets: [{ ...defaultData.datasets[0], data: values }] } : defaultData
  return <Bar ref={ref} data={data} options={options} />
})

export default LoanChart
