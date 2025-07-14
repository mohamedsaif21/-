import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription: 'free' | 'professional' | 'executive';
}

interface ResumeContent {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    graduationDate: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
}

interface Resume {
  id: string;
  title: string;
  template: string;
  content: ResumeContent;
  atsScore: number;
  lastModified: Date;
  isPublic: boolean;
}

interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  appliedDate: Date;
  matchScore: number;
}

interface InterviewSession {
  id: string;
  jobTitle: string;
  duration: number;
  score: number;
  feedback: string[];
  completedAt: Date;
}

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Resume state
  resumes: Resume[];
  activeResume: Resume | null;
  
  // Job applications
  applications: JobApplication[];
  
  // Interview sessions
  interviewSessions: InterviewSession[];
  
  // UI state
  darkMode: boolean;
  sidebarOpen: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  addResume: (resume: Resume) => void;
  updateResume: (id: string, updates: Partial<Resume>) => void;
  deleteResume: (id: string) => void;
  setActiveResume: (resume: Resume | null) => void;
  addApplication: (application: JobApplication) => void;
  updateApplication: (id: string, updates: Partial<JobApplication>) => void;
  addInterviewSession: (session: InterviewSession) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      resumes: [],
      activeResume: null,
      applications: [],
      interviewSessions: [],
      darkMode: false,
      sidebarOpen: true,
      
      // Actions
      setUser: (user) => set({ user }),
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      
      addResume: (resume) => set((state) => ({
        resumes: [...state.resumes, resume]
      })),
      
      updateResume: (id, updates) => set((state) => ({
        resumes: state.resumes.map(resume => 
          resume.id === id ? { ...resume, ...updates } : resume
        )
      })),
      
      deleteResume: (id) => set((state) => ({
        resumes: state.resumes.filter(resume => resume.id !== id),
        activeResume: state.activeResume?.id === id ? null : state.activeResume
      })),
      
      setActiveResume: (resume) => set({ activeResume: resume }),
      
      addApplication: (application) => set((state) => ({
        applications: [...state.applications, application]
      })),
      
      updateApplication: (id, updates) => set((state) => ({
        applications: state.applications.map(app => 
          app.id === id ? { ...app, ...updates } : app
        )
      })),
      
      addInterviewSession: (session) => set((state) => ({
        interviewSessions: [...state.interviewSessions, session]
      })),
      
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }))
    }),
    {
      name: 'resucraft-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        resumes: state.resumes,
        applications: state.applications,
        interviewSessions: state.interviewSessions,
        darkMode: state.darkMode
      })
    }
  )
);