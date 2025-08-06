import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ActivityItem {
  id: string;
  type: 'analysis' | 'upload' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'warning';
}

export const RecentActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'analysis',
      title: 'Research Paper Analysis Complete',
      description: 'AI detection: 15% | Plagiarism: 3%',
      timestamp: '2 minutes ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'alert',
      title: 'High AI Content Detected',
      description: 'Student submission flagged for review',
      timestamp: '15 minutes ago',
      status: 'warning'
    },
    {
      id: '3',
      type: 'upload',
      title: 'Batch Upload Processing',
      description: '12 documents being analyzed',
      timestamp: '1 hour ago',
      status: 'pending'
    },
    {
      id: '4',
      type: 'analysis',
      title: 'Thesis Chapter Review',
      description: 'Clean analysis - no issues found',
      timestamp: '3 hours ago',
      status: 'completed'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'analysis': return CheckCircle;
      case 'upload': return FileText;
      case 'alert': return AlertTriangle;
      default: return Clock;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge variant="success">Completed</Badge>;
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      case 'warning': return <Badge variant="danger">Alert</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getIcon(activity.type);
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex-shrink-0">
                <Icon className="w-5 h-5 text-gray-400 mt-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {activity.title}
                  </p>
                  {getStatusBadge(activity.status)}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {activity.timestamp}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};