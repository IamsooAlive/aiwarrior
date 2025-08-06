import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  Upload,
  History,
  Shield,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'upload', label: 'Upload Document', icon: Upload },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'workspaces', label: 'Workspaces', icon: Users },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full"
    >
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-6 h-6 text-primary-600" />
            <span className="font-semibold text-gray-900 dark:text-white">Detection Suite</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Analysis</span>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-r-2 border-primary-600'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
};