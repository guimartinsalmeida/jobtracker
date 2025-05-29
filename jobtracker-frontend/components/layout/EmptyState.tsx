import React from 'react'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
      <span className="text-6xl mb-4">📭</span>
      <p className="text-lg font-semibold">No job applications found</p>
      <p className="text-sm">Start by adding a new job application!</p>
    </div>
  )
}

export default EmptyState
