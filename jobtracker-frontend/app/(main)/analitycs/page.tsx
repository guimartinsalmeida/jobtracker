'use client';
import { Sidebar } from '@/components/layout/Sidebar';
import { FiPlus, FiTrendingUp, FiDollarSign, FiBriefcase, FiUsers } from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, BarElement } from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, BarElement);

interface AnalyticsData {
  summary: {
    totalApplications: number;
    interviewsScheduled: number;
    offersReceived: number;
    rejections: number;
  };
  byStage: Array<{
    status: string;
    count: string;
  }>;
  overTime: Array<{
    month: string;
    count: string;
  }>;
  recentApplications: Array<{
    title: string;
    company: string;
    status: string;
    created_at: string;
  }>;
  insights: {
    conversionByPlatform: Array<{
      platform: string;
      conversion_rate: string;
    }>;
    successByJobType: Array<{
      job_type: string;
      success_rate: string;
      total_applications: string;
    }>;
    successByJobTitle: Array<{
      job_title: string;
      success_rate: string;
      total_applications: string;
    }>;
    bestPerformingCVs: Array<{
      cv_file_url: string;
      successful_apps: string;
      total_apps: string;
    }>;
  };
}

export default function AnalyticsPage() {
  const { user } = useUser();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('monthly');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user?.id) return;
      
      try {
        setError(null);
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/api/analytics/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAnalytics(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError('Failed to load analytics data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#151A23]">
        <Sidebar />
        <main className="flex-1 p-10">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-[#181F2A] rounded-lg mb-2"></div>
            <div className="h-4 w-96 bg-[#181F2A] rounded-lg mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="rounded-xl p-6 bg-[#181F2A] flex flex-col gap-2 shadow-md">
                  <div className="h-4 w-32 bg-[#232B3B] rounded"></div>
                  <div className="h-8 w-16 bg-[#232B3B] rounded"></div>
                  <div className="h-3 w-24 bg-[#232B3B] rounded"></div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="rounded-xl bg-[#181F2A] p-6 shadow-md">
                <div className="h-6 w-48 bg-[#232B3B] rounded mb-4"></div>
                <div className="flex justify-center">
                  <div className="w-48 h-48 rounded-full bg-[#232B3B] animate-pulse"></div>
                </div>
              </div>
              <div className="rounded-xl bg-[#181F2A] p-6 shadow-md">
                <div className="h-6 w-48 bg-[#232B3B] rounded mb-4"></div>
                <div className="h-56 bg-[#232B3B] rounded"></div>
              </div>
            </div>

            <div className="rounded-xl bg-[#181F2A] p-6 shadow-md">
              <div className="h-6 w-48 bg-[#232B3B] rounded mb-4"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#232B3B] rounded-lg px-4 py-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#181F2A]"></div>
                      <div>
                        <div className="h-4 w-32 bg-[#181F2A] rounded mb-2"></div>
                        <div className="h-3 w-24 bg-[#181F2A] rounded"></div>
                      </div>
                    </div>
                    <div className="h-3 w-16 bg-[#181F2A] rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#151A23]">
        <Sidebar />
        <main className="flex-1 p-10">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex min-h-screen bg-[#151A23]">
        <Sidebar />
        <main className="flex-1 p-10">
          <div className="text-center text-gray-400">
            <h2 className="text-xl mb-4">No Analytics Data Available</h2>
            <p>Start adding job applications to see your analytics.</p>
          </div>
        </main>
      </div>
    );
  }

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'interviewed':
        return 'bg-purple-600';
      case 'offered':
        return 'bg-green-600';
      case 'rejected':
        return 'bg-red-600';
      case 'applied':
        return 'bg-blue-600';
      default:
        return 'bg-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };



  // Calculate conversion rate
  const totalSuccessful = analytics.summary.interviewsScheduled + analytics.summary.offersReceived;
  const conversionRate = analytics.summary.totalApplications > 0 
    ? Math.round((totalSuccessful / analytics.summary.totalApplications) * 100) 
    : 0;

  const summaryCards = [
    {
      label: 'Total Applications',
      value: analytics.summary.totalApplications,
      icon: <FiBriefcase className="text-blue-400" />,
      change: '+12%',
      changeColor: 'text-green-400',
      sub: 'vs last month',
      bg: 'bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30'
    },
    {
      label: 'Interviews Scheduled',
      value: analytics.summary.interviewsScheduled,
      icon: <FiUsers className="text-purple-400" />,
      change: '+33%',
      changeColor: 'text-green-400',
      sub: 'vs last month',
      bg: 'bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30'
    },
    {
      label: 'Offers Received',
      value: analytics.summary.offersReceived,
      icon: <FiDollarSign className="text-green-400" />,
      change: '+100%',
      changeColor: 'text-green-400',
      sub: 'vs last month',
      bg: 'bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30'
    },
    {
      label: 'Conversion Rate',
      value: `${conversionRate}%`,
      icon: <FiTrendingUp className="text-cyan-400" />,
      change: '+5%',
      changeColor: 'text-green-400',
      sub: 'success rate',
      bg: 'bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 border border-cyan-500/30'
    },
  ];

  const doughnutData = {
    labels: analytics.byStage.map(stage => stage.status),
    datasets: [
      {
        data: analytics.byStage.map(stage => parseInt(stage.count)),
        backgroundColor: [
          '#3B82F6', // blue - applied
          '#8B5CF6', // purple - interviewed
          '#10B981', // green - offered
          '#EF4444', // red - rejected
          '#6B7280', // gray - other
        ],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#181F2A',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#232B3B',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: { parsed: number; label: string; dataset: { data: number[] } }) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((context.parsed / total) * 100);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  const lineChartData = {
    labels: analytics.overTime.map(item => new Date(item.month).toLocaleDateString('en-US', { month: 'short' })),
    datasets: [
      {
        label: 'Applications',
        data: analytics.overTime.map(item => parseInt(item.count)),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#181F2A',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#232B3B',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: { parsed: { y: number } }) {
            return `Applications: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#232B3B',
        },
        ticks: {
          color: '#9CA3AF',
          stepSize: 1,
        },
      },
    },
  };

  // Platform conversion data
  const platformData = {
    labels: analytics.insights.conversionByPlatform.map(item => item.platform || 'Unknown'),
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: analytics.insights.conversionByPlatform.map(item => parseFloat(item.conversion_rate) || 0),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: '#8B5CF6',
        borderWidth: 1,
      },
    ],
  };

  const platformOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#181F2A',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#232B3B',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: { parsed: { y: number } }) {
            return `Conversion Rate: ${context.parsed.y.toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#232B3B',
        },
        ticks: {
          color: '#9CA3AF',
          callback: function(this: unknown, tickValue: string | number) {
            return tickValue + '%';
          }
        },
      },
    },
  };

  // Job Type Success Rate data
  const jobTypeData = {
    labels: analytics.insights.successByJobType.map(item => item.job_type || 'Unknown'),
    datasets: [
      {
        label: 'Success Rate (%)',
        data: analytics.insights.successByJobType.map(item => parseFloat(item.success_rate) || 0),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: '#10B981',
        borderWidth: 1,
      },
    ],
  };

  const jobTypeOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#181F2A',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#232B3B',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: { parsed: { x: number }; dataIndex: number }) {
            const jobType = jobTypeData.labels[context.dataIndex];
            const totalApps = analytics.insights.successByJobType[context.dataIndex]?.total_applications || 0;
            return [
              `Job Type: ${jobType}`,
              `Success Rate: ${context.parsed.x.toFixed(1)}%`,
              `Total Applications: ${totalApps}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#232B3B',
        },
        ticks: {
          color: '#9CA3AF',
          callback: function(this: unknown, tickValue: string | number) {
            return tickValue + '%';
          }
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
    },
  };

  // Job Title Success Rate data
  const jobTitleData = {
    labels: analytics.insights.successByJobTitle.map(item => item.job_title || 'Unknown'),
    datasets: [
      {
        label: 'Success Rate (%)',
        data: analytics.insights.successByJobTitle.map(item => parseFloat(item.success_rate) || 0),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3B82F6',
        borderWidth: 1,
      },
    ],
  };

  const jobTitleOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#181F2A',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#232B3B',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: { parsed: { x: number }; dataIndex: number }) {
            const jobTitle = jobTitleData.labels[context.dataIndex];
            const totalApps = analytics.insights.successByJobTitle[context.dataIndex]?.total_applications || 0;
            return [
              `Job Title: ${jobTitle}`,
              `Success Rate: ${context.parsed.x.toFixed(1)}%`,
              `Total Applications: ${totalApps}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#232B3B',
        },
        ticks: {
          color: '#9CA3AF',
          callback: function(this: unknown, tickValue: string | number) {
            return tickValue + '%';
          }
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-[#151A23]">
      <Sidebar />
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back, {user?.name}! <span className="inline-block">👋</span></h1>
        <p className="text-gray-400 mb-8">Here is an overview of your job search progress</p>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryCards.map((card, idx) => (
            <div key={idx} className={`rounded-xl p-6 ${card.bg} flex flex-col gap-2 shadow-lg backdrop-blur-sm`}>
              <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                {card.icon}
                {card.label}
              </div>
              <div className="text-3xl font-bold text-white">{card.value}</div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${card.changeColor}`}>{card.change}</span>
                <span className="text-xs text-gray-400">{card.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Applications by Stage */}
          <div className="rounded-xl bg-[#181F2A] p-6 shadow-md border border-[#232B3B]">
            <h2 className="text-white font-semibold mb-4">Applications by Stage</h2>
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 mb-4">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {doughnutData.labels.map((label, idx) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: doughnutData.datasets[0].backgroundColor[idx] }}></span>
                    <span className="text-gray-300 capitalize">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Applications Over Time */}
          <div className="rounded-xl bg-[#181F2A] p-6 shadow-md border border-[#232B3B]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Applications Over Time</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setTimeRange('weekly')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    timeRange === 'weekly' 
                      ? 'bg-blue-700 text-white' 
                      : 'bg-[#232B3B] text-gray-400 hover:bg-[#2A3441]'
                  }`}
                >
                  Weekly
                </button>
                <button 
                  onClick={() => setTimeRange('monthly')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    timeRange === 'monthly' 
                      ? 'bg-blue-700 text-white' 
                      : 'bg-[#232B3B] text-gray-400 hover:bg-[#2A3441]'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
            <div className="h-56">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Platform Performance */}
          {analytics.insights.conversionByPlatform.length > 0 && (
            <div className="rounded-xl bg-[#181F2A] p-6 shadow-md border border-[#232B3B]">
              <h2 className="text-white font-semibold mb-4">Platform Performance</h2>
              <div className="h-64">
                <Bar data={platformData} options={platformOptions} />
              </div>
            </div>
          )}

          {/* Job Type Success Rate */}
          {analytics.insights.successByJobType.length > 0 && (
            <div className="rounded-xl bg-[#181F2A] p-6 shadow-md border border-[#232B3B]">
              <h2 className="text-white font-semibold mb-4">Success Rate by Job Type</h2>
              <div className="h-64">
                <Bar data={jobTypeData} options={jobTypeOptions} />
              </div>
            </div>
          )}
        </div>

        {/* Success Rate by Job Title */}
        {analytics.insights.successByJobTitle.length > 0 && (
          <div className="rounded-xl bg-[#181F2A] p-6 shadow-md border border-[#232B3B] mb-8">
            <h2 className="text-white font-semibold mb-4">Success Rate by Job Title</h2>
            <div className="h-96">
              <Bar data={jobTitleData} options={jobTitleOptions} />
            </div>
          </div>
        )}

        {/* Insights Summary */}
        {analytics.insights.successByJobType.length > 0 && (
          <div className="rounded-xl bg-[#181F2A] p-6 shadow-md border border-[#232B3B] mb-8">
            <h2 className="text-white font-semibold mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(() => {
                const bestJobType = analytics.insights.successByJobType[0];
                const bestPlatform = analytics.insights.conversionByPlatform.length > 0 
                  ? analytics.insights.conversionByPlatform.reduce((prev, current) => 
                      parseFloat(prev.conversion_rate) > parseFloat(current.conversion_rate) ? prev : current
                    )
                  : null;
                
                return (
                  <>
                    {bestJobType && (
                      <div className="bg-[#232B3B] rounded-lg p-4">
                        <div className="text-green-400 text-sm font-semibold mb-1">Best Performing Job Type</div>
                        <div className="text-white font-bold text-lg">{bestJobType.job_type}</div>
                        <div className="text-gray-400 text-sm">
                          {parseFloat(bestJobType.success_rate).toFixed(1)}% success rate
                        </div>
                        <div className="text-gray-400 text-xs">
                          {bestJobType.total_applications} applications
                        </div>
                      </div>
                    )}
                    
                    {bestPlatform && (
                      <div className="bg-[#232B3B] rounded-lg p-4">
                        <div className="text-blue-400 text-sm font-semibold mb-1">Best Platform</div>
                        <div className="text-white font-bold text-lg">{bestPlatform.platform}</div>
                        <div className="text-gray-400 text-sm">
                          {parseFloat(bestPlatform.conversion_rate).toFixed(1)}% conversion rate
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-[#232B3B] rounded-lg p-4">
                      <div className="text-purple-400 text-sm font-semibold mb-1">Overall Success</div>
                      <div className="text-white font-bold text-lg">{conversionRate}%</div>
                      <div className="text-gray-400 text-sm">
                        conversion rate
                      </div>
                      <div className="text-gray-400 text-xs">
                        {analytics.summary.totalApplications} total applications
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* CV Performance and Recent Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Best Performing CVs */}
          {analytics.insights.bestPerformingCVs.length > 0 && (
            <div className="rounded-xl bg-[#181F2A] p-6 shadow-md border border-[#232B3B]">
              <h2 className="text-white font-semibold mb-4">Best Performing CVs</h2>
              <div className="space-y-3">
                {analytics.insights.bestPerformingCVs
                  .sort((a, b) => {
                    const rateA = parseInt(a.successful_apps) / parseInt(a.total_apps);
                    const rateB = parseInt(b.successful_apps) / parseInt(b.total_apps);
                    return rateB - rateA;
                  })
                  .slice(0, 5)
                  .map((cv, idx) => {
                    const successRate = parseInt(cv.total_apps) > 0 
                      ? Math.round((parseInt(cv.successful_apps) / parseInt(cv.total_apps)) * 100)
                      : 0;
                    const fileName = cv.cv_file_url ? cv.cv_file_url.split('/').pop()?.replace('.pdf', '') || 'CV' : 'CV';
                    
                    return (
                      <div key={idx} className="flex items-center justify-between bg-[#232B3B] rounded-lg px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            {fileName[0]?.toUpperCase() || 'C'}
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">{fileName}</div>
                            <div className="text-gray-400 text-xs">
                              {cv.successful_apps}/{cv.total_apps} successful
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-semibold text-sm">{successRate}%</div>
                          <div className="text-gray-400 text-xs">success rate</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Recent Applications */}
          <div className="rounded-xl bg-[#181F2A] p-6 shadow-md border border-[#232B3B]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Recent Applications</h2>
              <a href="/home" className="text-blue-400 text-sm font-semibold hover:underline transition-colors">View all</a>
            </div>
            <div className="flex flex-col gap-4">
              {analytics.recentApplications.length > 0 ? (
                analytics.recentApplications.map((app, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#232B3B] rounded-lg px-4 py-3 hover:bg-[#2A3441] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg">
                        {app.title[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{app.title}</div>
                        <div className="text-gray-400 text-sm">{app.company}</div>
                      </div>
                      <span className={`ml-4 px-2 py-1 rounded text-xs font-semibold ${getStageColor(app.status)} text-white capitalize`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="text-gray-400 text-xs">{formatDate(app.created_at)}</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <p>No applications yet. Start tracking your job applications!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Job Button */}
        <button 
          onClick={() => window.location.href = '/home'}
          className="fixed bottom-10 right-10 bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center hover:scale-110"
        >
          <FiPlus size={24} />
        </button>
      </main>
    </div>
  );
} 