import React from 'react';

const statusOptions = [
  { label: 'All', value: 'All' },
  { label: 'Approved', value: 'approved' },
  { label: 'Interviewed', value: 'interviewed' },
  { label: 'Offer', value: 'offer' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Waiting Response', value: 'waiting_response' },
];

interface JobFiltersProps {
  selected: string;
  onSelect: (v: string) => void;
}

export function JobFilters({ selected, onSelect }: JobFiltersProps) {
  return (
    <div className="flex gap-2 mb-6">
      {statusOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`px-4 py-1 rounded-md font-semibold text-sm transition border border-transparent ${
            selected === opt.value
              ? 'bg-blue-700 text-white'
              : 'bg-[#232B3B] text-gray-300 hover:border-blue-700'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
} 