import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, TrendingUp, Users, Clock } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { RecentActivity } from './RecentActivity';
import { AnalyticsChart } from './AnalyticsChart';
import { useStore } from '../../store/useStore';

export const Dashboard: React.FC = () => {
  const { documents, user } = useStore();
  
  const completedDocs = documents.filter(doc => doc.status === 'completed').length;
  const pendingDocs = documents.filter(doc => doc.status === 'analyzing' || doc.status === 'pending').length;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your content analysis today.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Documents Analyzed"
          value={completedDocs}
          change="+12% from last week"
          changeType="positive"
          icon={FileText}
          color="primary"
        />
        <StatsCard
          title="AI Content Detected"
          value="23%"
          change="+5% from last week"
          changeType="negative"
          icon={AlertTriangle}
          color="warning"
        />
        <StatsCard
          title="Clean Documents"
          value={Math.max(0, completedDocs - Math.floor(completedDocs * 0.23))}
          change="+8% from last week"
          changeType="positive"
          icon={CheckCircle}
          color="success"
        />
        <StatsCard
          title="Processing Queue"
          value={pendingDocs}
          change="2 min avg wait time"
          changeType="neutral"
          icon={Clock}
          color="primary"
        />
      </div>

      <AnalyticsChart />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-6 text-white"
          >
            <h3 className="text-lg font-semibold mb-2">Detection Accuracy</h3>
            <div className="text-3xl font-bold mb-2">97.3%</div>
            <p className="text-primary-100 text-sm">
              Our AI models maintain industry-leading accuracy rates
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Team Usage</h3>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Faculty</span>
                <span className="font-medium text-gray-900 dark:text-white">12 active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">TAs</span>
                <span className="font-medium text-gray-900 dark:text-white">8 active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Students</span>
                <span className="font-medium text-gray-900 dark:text-white">245 submissions</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};