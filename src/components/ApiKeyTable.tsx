'use client';
import { useState } from 'react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
}

interface ApiKeyTableProps {
  apiKeys: ApiKey[];
  onKeyDeleted: () => void;
}

export default function ApiKeyTable({ apiKeys, onKeyDeleted }: ApiKeyTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/keys?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete API key');
      
      onKeyDeleted();
    } catch (error) {
      console.error('Error deleting API key:', error);
      alert('Failed to delete API key');
    } finally {
      setDeletingId(null);
    }
  };

  if (apiKeys.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No API keys found. Create one to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              API Key
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {apiKeys.map((apiKey) => (
            <tr key={apiKey.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {apiKey.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-300">
                {apiKey.key.slice(0, 12)}...
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {new Date(apiKey.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => handleDelete(apiKey.id)}
                  disabled={deletingId === apiKey.id}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
                >
                  {deletingId === apiKey.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 