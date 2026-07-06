import React, { forwardRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const defaultData = {
  labels: ['Repaid', 'Outstanding'],
  datasets: [
    {
      data: [4300000, 8120000],
      backgroundColor: ['#10B981', '#F97316'],
      hoverOffset: 4,
    },
  ],
}

const RepaymentsChart = forwardRef(({ values, labels }, ref) => {
  const data = values && labels ? { labels, datasets: [{ ...defaultData.datasets[0], data: values }] } : defaultData
  return <Doughnut ref={ref} data={data} />
})

export default RepaymentsChart
