import React from 'react'

export const SkeletonCard = () => (
  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 animate-pulse">
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-2" />
    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
  </div>
)

export const SkeletonChart = ({ height = 260 }) => (
  <div style={{ height }} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 animate-pulse" />
)

export const SkeletonTable = ({ rows = 5, cols = 5 }) => (
  <div className="space-y-2">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-2">
        {Array.from({ length: cols }).map((_, j) => (
          <div key={j} className="flex-1 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
        ))}
      </div>
    ))}
  </div>
)

export default { SkeletonCard, SkeletonChart, SkeletonTable }
