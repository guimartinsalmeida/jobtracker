type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  appliedDate: string;
  status: 'Pending' | 'Interview' | 'Offer' | 'Rejected';
  response: string;
};

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const statusColors: Record<Job['status'], string> = {
    Pending: 'bg-yellow-500 text-black',
    Interview: 'bg-blue-600 text-white',
    Offer: 'bg-green-500 text-white',
    Rejected: 'bg-red-500 text-white',
  };

  return (
    <div className="bg-[#232B3B] rounded-xl p-5 flex flex-col gap-2 shadow-md min-w-[300px]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{job.title}</h3>
          <span className="text-gray-400 font-medium">{job.company}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[job.status]}`}>{job.status.toUpperCase()}</span>
      </div>
      <div className="text-gray-400 text-sm flex flex-col gap-1 mt-2">
        <span>📍 {job.location}</span>
        <span>💼 {job.type}</span>
        <span>📅 Applied on {job.appliedDate}</span>
        <span>🕒 {job.response}</span>
      </div>
    </div>
  );
} 