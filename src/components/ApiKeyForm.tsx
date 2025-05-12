import React, { useState } from 'react';
import { Sparkles, KeyRound, ExternalLink } from 'lucide-react';

interface ApiKeyFormProps {
  onSubmit: (apiKey: string) => void;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-95 border border-gray-200">
        <div className="text-center">
          <div className="flex justify-center">
            <Sparkles className="h-12 w-12 text-blue-700" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to Gemini AI
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your Google AI API key to get started
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="api-key" className="sr-only">
                Google AI API Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="api-key"
                  name="api-key"
                  type="password"
                  autoComplete="off"
                  required
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="text-sm text-center">
            <a
              href="https://ai.google.dev/tutorials/setup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-medium text-blue-600 hover:text-blue-500"
            >
              <span>Get a Google AI API key</span>
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              disabled={!apiKey.trim()}
            >
              Get Started
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyForm;