import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from '../ui/Card';

const weeklyData = [
  { day: 'Mon', documents: 24, aiDetected: 8, plagiarism: 3 },
  { day: 'Tue', documents: 32, aiDetected: 12, plagiarism: 5 },
  { day: 'Wed', documents: 28, aiDetected: 9, plagiarism: 2 },
  { day: 'Thu', documents: 45, aiDetected: 18, plagiarism: 7 },
  { day: 'Fri', documents: 38, aiDetected: 15, plagiarism: 4 },
  { day: 'Sat', documents: 15, aiDetected: 4, plagiarism: 1 },
  { day: 'Sun', documents: 12, aiDetected: 3, plagiarism: 0 },
];

const detectionTrends = [
  { month: 'Jan', aiContent: 15, plagiarism: 8 },
  { month: 'Feb', aiContent: 22, plagiarism: 12 },
  { month: 'Mar', aiContent: 35, plagiarism: 15 },
  { month: 'Apr', aiContent: 48, plagiarism: 18 },
  { month: 'May', aiContent: 52, plagiarism: 14 },
  { month: 'Jun', aiContent: 61, plagiarism: 16 },
];

export const AnalyticsChart: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Weekly Document Analysis
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="day" 
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="documents" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="aiDetected" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="plagiarism" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Detection Trends (6 Months)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={detectionTrends}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="aiContent" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="plagiarism" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};