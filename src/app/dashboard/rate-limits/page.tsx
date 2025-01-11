'use client';
import { useState, useEffect } from 'react';

interface RateLimit {
  id: string;
  endpoint: string;
  limit: number;
  window: string;
  enabled: boolean;
}

export default function RateLimits() {
  const [rateLimits, setRateLimits] = useState<RateLimit[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newLimit, setNewLimit] = useState({
    endpoint: '',
    limit: 1000,
    window: '1h',
    enabled: true
  });

  useEffect(() => {
    fetchRateLimits();
  }, []);

  const fetchRateLimits = async () => {
    try {
      const response = await fetch('/api/rate-limits');
      const data = await response.json();
      setRateLimits(data);
    } catch (error) {
      console.error('Error fetching rate limits:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/rate-limits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLimit),
      });
      
      if (!response.ok) throw new Error('Failed to create rate limit');
      
      fetchRateLimits();
      setIsAddingNew(false);
      setNewLimit({
        endpoint: '',
        limit: 1000,
        window: '1h',
        enabled: true
      });
    } catch (error) {
      console.error('Error creating rate limit:', error);
      alert('Failed to create rate limit');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rate Limits</h1>
        <button
          onClick={() => setIsAddingNew(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add New Rate Limit
        </button>
      </div>

      {isAddingNew && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Rate Limit</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Endpoint</label>
                <input
                  type="text"
                  value={newLimit.endpoint}
                  onChange={(e) => setNewLimit({ ...newLimit, endpoint: e.target.value })}
                  placeholder="/api/*"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Request Limit</label>
                <input
                  type="number"
                  value={newLimit.limit}
                  onChange={(e) => setNewLimit({ ...newLimit, limit: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Time Window</label>
                <select
                  value={newLimit.window}
                  onChange={(e) => setNewLimit({ ...newLimit, window: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="1m">1 minute</option>
                  <option value="5m">5 minutes</option>
                  <option value="15m">15 minutes</option>
                  <option value="1h">1 hour</option>
                  <option value="1d">1 day</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Add Rate Limit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Endpoint
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Limit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Window
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rateLimits.map((limit) => (
              <tr key={limit.id}>
                <td className="px-6 py-4 whitespace-nowrap">{limit.endpoint}</td>
                <td className="px-6 py-4 whitespace-nowrap">{limit.limit}</td>
                <td className="px-6 py-4 whitespace-nowrap">{limit.window}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    limit.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {limit.enabled ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 