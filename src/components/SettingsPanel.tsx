import React from 'react';
import { X } from 'lucide-react';
import { GenerationConfig } from '../types';

interface SettingsPanelProps {
  isOpen: boolean;
  generationConfig: GenerationConfig;
  setGenerationConfig: (config: GenerationConfig) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  isOpen, 
  generationConfig, 
  setGenerationConfig 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setGenerationConfig({
      ...generationConfig,
      [name]: parseFloat(value)
    });
  };

  return (
    <div 
      className={`fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] bg-white border-l border-gray-200 shadow-lg p-6 transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } overflow-y-auto`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Generation Settings</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <label htmlFor="temperature" className="block text-sm text-gray-700 mb-1">
                  Temperature: {generationConfig.temperature.toFixed(1)}
                </label>
                <span className="text-xs text-gray-500">
                  {generationConfig.temperature === 0 
                    ? 'More focused'
                    : generationConfig.temperature >= 1 
                      ? 'More creative' 
                      : 'Balanced'}
                </span>
              </div>
              <input
                type="range"
                id="temperature"
                name="temperature"
                min="0"
                max="1"
                step="0.1"
                value={generationConfig.temperature}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <label htmlFor="topP" className="block text-sm text-gray-700 mb-1">
                  Top P: {generationConfig.topP.toFixed(2)}
                </label>
                <span className="text-xs text-gray-500">
                  {generationConfig.topP <= 0.5 
                    ? 'More precise'
                    : generationConfig.topP >= 0.9 
                      ? 'More varied' 
                      : 'Balanced'}
                </span>
              </div>
              <input
                type="range"
                id="topP"
                name="topP"
                min="0"
                max="1"
                step="0.05"
                value={generationConfig.topP}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <label htmlFor="topK" className="block text-sm text-gray-700 mb-1">
                  Top K: {generationConfig.topK}
                </label>
              </div>
              <input
                type="range"
                id="topK"
                name="topK"
                min="1"
                max="40"
                step="1"
                value={generationConfig.topK}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <label htmlFor="maxOutputTokens" className="block text-sm text-gray-700 mb-1">
                  Max Tokens: {generationConfig.maxOutputTokens}
                </label>
              </div>
              <input
                type="range"
                id="maxOutputTokens"
                name="maxOutputTokens"
                min="50"
                max="8192"
                step="50"
                value={generationConfig.maxOutputTokens}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">About Settings</h3>
          <div className="space-y-3 text-xs text-gray-600">
            <p>
              <strong>Temperature</strong>: Controls the randomness of the output. 
              Higher values produce more creative results.
            </p>
            <p>
              <strong>Top P</strong>: Controls diversity by considering the most likely tokens. 
              Lower values make output more focused.
            </p>
            <p>
              <strong>Top K</strong>: Limits token selection to the top K most likely tokens.
            </p>
            <p>
              <strong>Max Tokens</strong>: Maximum number of tokens in the generated response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;