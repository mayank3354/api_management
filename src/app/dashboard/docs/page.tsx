export default function Documentation() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">API Documentation</h1>
      
      <div className="space-y-8">
        {/* Authentication Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            To authenticate requests, include your API key in the headers of your HTTP requests:
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md font-mono text-sm">
            Authorization: Bearer YOUR_API_KEY
          </div>
        </section>

        {/* Endpoints Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Endpoints</h2>
          
          {/* Example Endpoint */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Get User</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">GET</span>
              <code className="text-sm">/api/v1/users/:id</code>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Retrieve user information by ID.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <pre className="text-sm">
{`// Example Response
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-03-01T12:00:00Z"
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Error Handling Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Error Handling</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The API uses conventional HTTP response codes to indicate the success or failure of requests.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>200: Success</li>
            <li>400: Bad Request</li>
            <li>401: Unauthorized</li>
            <li>404: Not Found</li>
            <li>500: Internal Server Error</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 