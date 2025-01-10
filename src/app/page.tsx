'use client';
import { useState, useEffect } from 'react';
import ApiKeyForm from '@/components/ApiKeyForm';
import ApiKeyTable from '@/components/ApiKeyTable';
import Sidebar from '@/components/Sidebar';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
}

export default function Dashboard() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const REQUEST_LIMIT = 1000;
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  const fetchRequestCount = async () => {
    try {
      const response = await fetch('/api/requests/count');
      const data = await response.json();
      setRequestCount(data.count);
    } catch (error) {
      console.error('Error fetching request count:', error);
    }
  };

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/keys');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApiKeys(data);
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };

  useEffect(() => {
    fetchRequestCount();
    fetchApiKeys();
  }, []);

  const handleCreateKey = async (formData: { name: string }) => {
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create API key');

      const newKey = await response.json();
      setApiKeys(prevKeys => [...prevKeys, newKey]);
      setIsFormVisible(false);
      
      // Show success message with the new API key
      alert(`API Key created successfully! Your key is: ${newKey.key}`);
    } catch (error) {
      console.error('Error creating API key:', error);
      alert('Failed to create API key');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">API Keys Dashboard</h1>
            
            <div className="flex items-center gap-6">
              {/* Request Counter */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <div className="text-sm text-gray-600 dark:text-gray-300">API Requests</div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{requestCount}</span>
                  <span className="text-sm text-gray-500">/ {REQUEST_LIMIT}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
                  <div 
                    className={`h-full rounded-full ${
                      requestCount > REQUEST_LIMIT * 0.9 ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min((requestCount / REQUEST_LIMIT) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setIsFormVisible(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Create New API Key
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {isFormVisible && (
            <ApiKeyForm 
              onClose={() => setIsFormVisible(false)} 
              onSubmit={handleCreateKey}
            />
          )}
          
          <div className="mt-6">
            <ApiKeyTable 
              apiKeys={apiKeys} 
              onKeyDeleted={fetchApiKeys}
            />
          </div>
        </main>
      </div>
    </div>
  );
}