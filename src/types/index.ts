export interface Document {
  id: string;
  name: string;
  content: string;
  uploadedAt: Date;
  status: 'pending' | 'analyzing' | 'completed' | 'error';
  size: number;
  type: string;
}

export interface AnalysisResult {
  id: string;
  documentId: string;
  plagiarismScore: number;
  aiScore: number;
  overallRisk: 'low' | 'medium' | 'high';
  confidence: number;
  detectedSources: DetectedSource[];
  aiModels: AIModelResult[];
  highlights: ContentHighlight[];
  createdAt: Date;
}

export interface DetectedSource {
  id: string;
  url: string;
  title: string;
  similarity: number;
  matchedText: string;
  sourceText: string;
}

export interface AIModelResult {
  model: string;
  confidence: number;
  prediction: 'human' | 'ai';
  reasoning: string;
}

export interface ContentHighlight {
  id: string;
  start: number;
  end: number;
  type: 'plagiarism' | 'ai-generated' | 'suspicious';
  confidence: number;
  source?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'educator' | 'student' | 'researcher';
  institution?: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  members: User[];
  documents: Document[];
  createdAt: Date;
}