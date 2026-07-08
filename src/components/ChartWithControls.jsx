import React, { useRef } from 'react'

export default function ChartWithControls({ children, filename = 'chart' }) {
  const chartRef = useRef(null)

  const handleExport = () => {
    try {
      const chart = chartRef.current
      // react-chartjs-2 exposes the chart instance at chartRef.current
      const base64 = chart?.toBase64Image ? chart.toBase64Image() : null
      if (!base64) return alert('Export not available')
      const link = document.createElement('a')
      link.href = base64
      link.download = `${filename}.png`
      link.click()
    } catch (e) {
      console.error(e)
      alert('Failed to export chart')
    }
  }

  const handlePrint = () => {
    const el = chartRef.current?.canvas ? chartRef.current.canvas : null
    if (!el) return alert('Print not available')
    const w = window.open('')
    w.document.write('<html><head><title>Chart</title></head><body>')
    w.document.write(`<img src="${el.toDataURL()}"/>`)
    w.document.write('</body></html>')
    w.document.close()
    w.print()
    w.close()
  }

  // Clone child and attach ref prop to the chart component
  const childWithRef = React.isValidElement(children) ? React.cloneElement(children, { ref: (r) => (chartRef.current = r && r.chart ? r.chart : r) }) : children

  return (
    <div>
      <div className="flex justify-end gap-2 mb-2">
        <button onClick={handleExport} className="text-sm px-3 py-1 bg-gray-100 rounded">Export PNG</button>
        <button onClick={handlePrint} className="text-sm px-3 py-1 bg-gray-100 rounded">Print</button>
      </div>
      {childWithRef}
    </div>
  )
}
