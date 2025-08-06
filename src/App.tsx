import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { DocumentUpload } from './components/upload/DocumentUpload';
import { AnalysisResults } from './components/analysis/AnalysisResults';
import { useStore } from './store/useStore';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isDarkMode } = useStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <DocumentUpload />;
      case 'documents':
        return <AnalysisResults />;
      case 'analytics':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Analytics
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed analytics dashboard coming soon...
            </p>
          </div>
        );
      case 'workspaces':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Team Workspaces
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Collaborative workspace features coming soon...
            </p>
          </div>
        );
      case 'history':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Analysis History
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Historical analysis tracking coming soon...
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Settings
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Configuration options coming soon...
            </p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
