import { useRouter } from 'next/navigation';

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
  isLoading?: boolean;
}

export function JobCard({ job, isLoading = false }: JobCardProps) {
  const router = useRouter();
  

  const statusColors: Record<Job['status'], string> = {
    Pending: 'bg-yellow-500 text-black',
    Interview: 'bg-blue-600 text-white',
    Offer: 'bg-green-500 text-white',
    Rejected: 'bg-red-500 text-white',
  };

  if (isLoading) {
    return (
      <div className="bg-[#232B3B] rounded-xl p-5 flex flex-col gap-2 shadow-md min-w-[300px] animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-5 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="h-6 bg-gray-700 rounded-full w-20"></div>
        </div>
        <div className="space-y-2 mt-2">
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-[#232B3B] rounded-xl p-5 flex flex-col gap-2 shadow-md min-w-[300px] cursor-pointer 
      transform transition-all duration-300 ease-in-out hover:bg-[#2c3650] hover:scale-[1.02] hover:shadow-lg
      animate-fadeIn"
      onClick={() => router.push(`/jobs/${job.id}`)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${job.title} position at ${job.company}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white transition-colors duration-300">{job.title}</h3>
          <span className="text-gray-400 font-medium">{job.company}</span>
        </div>
        <span 
          className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[job.status]} 
          transition-all duration-300 hover:scale-110 animate-pulse-subtle`}
          aria-label={`Status: ${job.status}`}
        >
          {job.status.toUpperCase()}
        </span>
      </div>
      <div className="text-gray-400 text-sm flex flex-col gap-1 mt-2">
        <span className="transition-colors duration-300 hover:text-gray-300" aria-label={`Location: ${job.location}`}>
          📍 {job.location}
        </span>
        <span className="transition-colors duration-300 hover:text-gray-300" aria-label={`Job type: ${job.type}`}>
          💼 {job.type}
        </span>
        <span className="transition-colors duration-300 hover:text-gray-300" aria-label={`Applied on ${job.appliedDate}`}>
          📅 Applied on {job.appliedDate}
        </span>
        <span className="transition-colors duration-300 hover:text-gray-300" aria-label={`Response time: ${job.response}`}>
          🕒 {job.response}
        </span>
      </div>
    </div>
  );
} 