import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color = 'primary'
}) => {
  const colors = {
    primary: 'text-primary-600 bg-primary-50 dark:bg-primary-900/20',
    success: 'text-success-600 bg-success-50 dark:bg-success-900/20',
    warning: 'text-warning-600 bg-warning-50 dark:bg-warning-900/20',
    danger: 'text-danger-600 bg-danger-50 dark:bg-danger-900/20'
  };

  const changeColors = {
    positive: 'text-success-600',
    negative: 'text-danger-600',
    neutral: 'text-gray-500'
  };

  return (
    <Card hover className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            {value}
          </motion.p>
          {change && (
            <p className={`text-sm mt-2 ${changeColors[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <motion.div
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`p-3 rounded-lg ${colors[color]}`}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
      </div>
    </Card>
  );
};