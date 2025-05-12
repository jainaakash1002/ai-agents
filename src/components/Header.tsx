import React from 'react';
import { Settings, Sparkles, LogOut, RefreshCw } from 'lucide-react';
import { AIRole } from '../types';

interface HeaderProps {
  onSettingsClick: () => void;
  onClearApiKey: () => void;
  selectedRole?: AIRole | null;
  onRoleChange?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSettingsClick, 
  onClearApiKey, 
  selectedRole,
  onRoleChange 
}) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Sparkles className="h-8 w-8 text-blue-700" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">
              {selectedRole ? selectedRole.name : 'AI Assistant'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {selectedRole && onRoleChange && (
              <button
                onClick={onRoleChange}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Change Role
              </button>
            )}
            
            <button
              onClick={onSettingsClick}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
            
            <button
              onClick={onClearApiKey}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;