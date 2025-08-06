import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Document } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

export const DocumentUpload: React.FC = () => {
  const { addDocument, documents, updateDocument } = useStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const document: Document = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          content: reader.result as string,
          uploadedAt: new Date(),
          status: 'pending',
          size: file.size,
          type: file.type
        };
        addDocument(document);
        
        // Simulate processing
        setTimeout(() => {
          updateDocument(document.id, { status: 'analyzing' });
          setTimeout(() => {
            updateDocument(document.id, { status: 'completed' });
          }, 3000);
        }, 1000);
      };
      reader.readAsText(file);
    });
  }, [addDocument, updateDocument]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const removeDocument = (id: string) => {
    const { removeDocument } = useStore.getState();
    removeDocument(id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'analyzing': return 'warning';
      case 'error': return 'danger';
      default: return 'primary';
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'pending': return 25;
      case 'analyzing': return 75;
      case 'completed': return 100;
      case 'error': return 0;
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <motion.div
          {...getRootProps()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <input {...getInputProps()} />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {isDragActive ? 'Drop files here' : 'Upload Documents for Analysis'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Drag and drop your files here, or click to browse
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Supports: PDF, DOC, DOCX, TXT (Max 10MB per file)
          </p>
        </motion.div>
      </Card>

      {documents.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Uploaded Documents ({documents.length})
          </h3>
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <FileText className="w-8 h-8 text-primary-600" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {doc.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(doc.size / 1024).toFixed(1)} KB • {doc.uploadedAt.toLocaleString()}
                    </p>
                    <div className="mt-2">
                      <ProgressBar
                        value={getStatusProgress(doc.status)}
                        color={getStatusColor(doc.status) as any}
                        showLabel
                        label={doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {doc.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-success-500" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={X}
                    onClick={() => removeDocument(doc.id)}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};