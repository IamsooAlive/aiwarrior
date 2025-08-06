import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Eye, Download, Share } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { useStore } from '../../store/useStore';

export const AnalysisResults: React.FC = () => {
  const { documents, getAnalysisResult } = useStore();
  
  // Mock analysis results for demonstration
  const mockResults = documents.filter(doc => doc.status === 'completed').map(doc => ({
    id: Math.random().toString(36).substr(2, 9),
    documentId: doc.id,
    plagiarismScore: Math.floor(Math.random() * 30),
    aiScore: Math.floor(Math.random() * 80),
    overallRisk: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
    confidence: 85 + Math.floor(Math.random() * 15),
    detectedSources: [
      {
        id: '1',
        url: 'https://example.com/source1',
        title: 'Academic Paper on AI Ethics',
        similarity: 15,
        matchedText: 'Sample matched text...',
        sourceText: 'Original source text...'
      }
    ],
    aiModels: [
      {
        model: 'GPT-4 Detector',
        confidence: 92,
        prediction: 'ai' as const,
        reasoning: 'High repetitive patterns and unnatural flow detected'
      },
      {
        model: 'Linguistic Analysis',
        confidence: 78,
        prediction: 'human' as const,
        reasoning: 'Natural variation in sentence structure'
      }
    ],
    highlights: [],
    createdAt: new Date(),
    document: doc
  }));

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return AlertTriangle;
      case 'medium': return AlertTriangle;
      case 'low': return CheckCircle;
      default: return CheckCircle;
    }
  };

  if (mockResults.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Analysis Results Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Upload and analyze documents to see detailed results here.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {mockResults.map((result, index) => {
        const RiskIcon = getRiskIcon(result.overallRisk);
        
        return (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {result.document.name}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <Badge variant={getRiskColor(result.overallRisk) as any}>
                      <RiskIcon className="w-3 h-3 mr-1" />
                      {result.overallRisk.toUpperCase()} RISK
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Confidence: {result.confidence}%
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" icon={Eye}>
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm" icon={Download}>
                    Export
                  </Button>
                  <Button variant="ghost" size="sm" icon={Share}>
                    Share
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Plagiarism Detection
                  </h4>
                  <ProgressBar
                    value={result.plagiarismScore}
                    color={result.plagiarismScore > 20 ? 'danger' : result.plagiarismScore > 10 ? 'warning' : 'success'}
                    showLabel
                    label={`${result.plagiarismScore}% Similar Content Found`}
                  />
                  {result.detectedSources.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Detected Sources:
                      </p>
                      {result.detectedSources.map((source) => (
                        <div key={source.id} className="text-sm">
                          <a 
                            href={source.url} 
                            className="text-primary-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {source.title}
                          </a>
                          <span className="text-gray-500 ml-2">
                            ({source.similarity}% match)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    AI Content Detection
                  </h4>
                  <ProgressBar
                    value={result.aiScore}
                    color={result.aiScore > 60 ? 'danger' : result.aiScore > 30 ? 'warning' : 'success'}
                    showLabel
                    label={`${result.aiScore}% AI-Generated Probability`}
                  />
                  <div className="mt-3 space-y-2">
                    {result.aiModels.map((model, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          {model.model}:
                        </span>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={model.prediction === 'ai' ? 'warning' : 'success'}
                            size="sm"
                          >
                            {model.prediction === 'ai' ? 'AI' : 'Human'}
                          </Badge>
                          <span className="text-gray-500">
                            {model.confidence}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Analysis Summary
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This document shows {result.overallRisk} risk indicators. 
                  {result.plagiarismScore > 15 && ' Potential plagiarism detected from academic sources.'}
                  {result.aiScore > 50 && ' High probability of AI-generated content.'}
                  {result.overallRisk === 'low' && ' Content appears to be original and human-written.'}
                </p>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};