import { create } from 'zustand';
import { Document, AnalysisResult, User, Workspace } from '../types';

interface AppState {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // User
  user: User | null;
  setUser: (user: User | null) => void;

  // Documents
  documents: Document[];
  addDocument: (document: Document) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  removeDocument: (id: string) => void;

  // Analysis Results
  analysisResults: AnalysisResult[];
  addAnalysisResult: (result: AnalysisResult) => void;
  getAnalysisResult: (documentId: string) => AnalysisResult | undefined;

  // Workspaces
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  addWorkspace: (workspace: Workspace) => void;

  // UI State
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  selectedDocument: Document | null;
  setSelectedDocument: (document: Document | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Theme
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // User
  user: {
    id: '1',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@university.edu',
    role: 'educator',
    institution: 'Stanford University'
  },
  setUser: (user) => set({ user }),

  // Documents
  documents: [],
  addDocument: (document) => set((state) => ({ 
    documents: [...state.documents, document] 
  })),
  updateDocument: (id, updates) => set((state) => ({
    documents: state.documents.map(doc => 
      doc.id === id ? { ...doc, ...updates } : doc
    )
  })),
  removeDocument: (id) => set((state) => ({
    documents: state.documents.filter(doc => doc.id !== id)
  })),

  // Analysis Results
  analysisResults: [],
  addAnalysisResult: (result) => set((state) => ({
    analysisResults: [...state.analysisResults, result]
  })),
  getAnalysisResult: (documentId) => {
    const state = get();
    return state.analysisResults.find(result => result.documentId === documentId);
  },

  // Workspaces
  workspaces: [
    {
      id: '1',
      name: 'Computer Science Department',
      description: 'Shared workspace for CS faculty and TAs',
      members: [],
      documents: [],
      createdAt: new Date()
    }
  ],
  currentWorkspace: null,
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  addWorkspace: (workspace) => set((state) => ({
    workspaces: [...state.workspaces, workspace]
  })),

  // UI State
  isAnalyzing: false,
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  selectedDocument: null,
  setSelectedDocument: (document) => set({ selectedDocument: document }),
}));