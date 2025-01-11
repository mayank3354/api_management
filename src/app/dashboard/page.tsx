'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function Overview() {
  const [stats, setStats] = useState({
    totalRequests: 0,
    activeKeys: 0,
    successRate: 0,
    errorRate: 0,
    averageLatency: 0,
    recentErrors: [],
    dailyStats: [],
    topEndpoints: []
  });

  const [timeRange, setTimeRange] = useState('24h');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const response = await fetch(`/api/stats?timeRange=${timeRange}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">API Overview</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-white dark:bg-gray-800 border rounded-md px-3 py-2"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Requests</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalRequests.toLocaleString()}</p>
          <div className="mt-2 text-sm text-green-500">↑ 12% from last period</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Success Rate</h3>
          <p className="text-3xl font-bold mt-2">{stats.successRate}%</p>
          <div className="mt-2 text-sm text-green-500">↑ 2% from last period</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Average Latency</h3>
          <p className="text-3xl font-bold mt-2">{stats.averageLatency}ms</p>
          <div className="mt-2 text-sm text-red-500">↑ 5ms from last period</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active API Keys</h3>
          <p className="text-3xl font-bold mt-2">{stats.activeKeys}</p>
          <div className="mt-2 text-sm text-gray-500">No change</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Request Volume</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Response Times</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="latency" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Errors & Top Endpoints */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Errors</h2>
          <div className="space-y-4">
            {stats.recentErrors.map((error, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                <div className="font-medium">{error.message}</div>
                <div className="text-sm text-gray-500">
                  {error.endpoint} • {error.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Top Endpoints</h2>
          <div className="space-y-4">
            {stats.topEndpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{endpoint.path}</div>
                  <div className="text-sm text-gray-500">{endpoint.method}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{endpoint.requests.toLocaleString()} requests</div>
                  <div className="text-sm text-gray-500">{endpoint.avgLatency}ms avg</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 