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
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter();
  

  const statusColors: Record<Job['status'], string> = {
    Pending: 'bg-yellow-500 text-black',
    Interview: 'bg-blue-600 text-white',
    Offer: 'bg-green-500 text-white',
    Rejected: 'bg-red-500 text-white',
  };

  return (
    <div
      className="bg-[#232B3B] rounded-xl p-5 flex flex-col gap-2 shadow-md min-w-[300px] cursor-pointer 
      transform transition-all duration-300 ease-in-out hover:bg-[#2c3650] hover:scale-[1.02] hover:shadow-lg
      animate-fadeIn"
      onClick={() => router.push(`/jobs/${job.id}`)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white transition-colors duration-300">{job.title}</h3>
          <span className="text-gray-400 font-medium">{job.company}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[job.status]} transition-all duration-300 hover:scale-110`}>
          {job.status.toUpperCase()}
        </span>
      </div>
      <div className="text-gray-400 text-sm flex flex-col gap-1 mt-2">
        <span className="transition-colors duration-300 hover:text-gray-300">📍 {job.location}</span>
        <span className="transition-colors duration-300 hover:text-gray-300">💼 {job.type}</span>
        <span className="transition-colors duration-300 hover:text-gray-300">📅 Applied on {job.appliedDate}</span>
        <span className="transition-colors duration-300 hover:text-gray-300">🕒 {job.response}</span>
      </div>
    </div>
  );
} 