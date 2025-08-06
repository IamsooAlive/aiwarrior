import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Moon, Sun, User, Settings, LogOut, Bell } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode, user } = useStore();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Shield className="w-8 h-8 text-primary-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              AI Content Sentinel
            </h1>
          </motion.div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
            Documents
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
            Analytics
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
            Workspaces
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            icon={Bell}
            className="relative"
          >
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={isDarkMode ? Sun : Moon}
            onClick={toggleDarkMode}
          />

          <div className="flex items-center space-x-2 pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.institution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};