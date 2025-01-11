'use client';
import { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    apiRateLimit: 1000,
    webhookUrl: '',
    darkMode: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle settings update
    alert('Settings updated successfully!');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          
          {/* Notifications Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="font-medium">Email Notifications</label>
              <p className="text-sm text-gray-500">Receive email alerts for important events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* API Rate Limit */}
          <div className="mb-4">
            <label className="block font-medium mb-2">API Rate Limit</label>
            <input
              type="number"
              value={settings.apiRateLimit}
              onChange={(e) => setSettings({ ...settings, apiRateLimit: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-md dark:bg-gray-700"
            />
          </div>

          {/* Webhook URL */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Webhook URL</label>
            <input
              type="url"
              value={settings.webhookUrl}
              onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
              placeholder="https://your-domain.com/webhook"
              className="w-full p-2 border rounded-md dark:bg-gray-700"
            />
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Dark Mode</label>
              <p className="text-sm text-gray-500">Toggle dark mode theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
} 