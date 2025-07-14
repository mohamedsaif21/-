// API service layer for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Resume operations
  async getResumes() {
    return this.request('/resumes');
  }

  async createResume(resumeData: any) {
    return this.request('/resumes', {
      method: 'POST',
      body: JSON.stringify(resumeData),
    });
  }

  async updateResume(id: string, updates: any) {
    return this.request(`/resumes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteResume(id: string) {
    return this.request(`/resumes/${id}`, {
      method: 'DELETE',
    });
  }

  // ATS Analysis
  async analyzeATS(resumeContent: string, jobDescription?: string) {
    return this.request('/ai/ats-analysis', {
      method: 'POST',
      body: JSON.stringify({ resumeContent, jobDescription }),
    });
  }

  // Impact Quantifier
  async quantifyImpact(jobDescription: string) {
    return this.request('/ai/impact-quantifier', {
      method: 'POST',
      body: JSON.stringify({ jobDescription }),
    });
  }

  // Tone Adjuster
  async adjustTone(content: string, targetTone: string, companyInfo?: string) {
    return this.request('/ai/tone-adjuster', {
      method: 'POST',
      body: JSON.stringify({ content, targetTone, companyInfo }),
    });
  }

  // Job Matching
  async getJobRecommendations(userProfile: any) {
    return this.request('/jobs/recommendations', {
      method: 'POST',
      body: JSON.stringify(userProfile),
    });
  }

  async searchJobs(query: string, filters: any) {
    return this.request('/jobs/search', {
      method: 'POST',
      body: JSON.stringify({ query, filters }),
    });
  }

  // Interview Training
  async startInterviewSession(jobTitle: string, difficulty: string) {
    return this.request('/interview/start', {
      method: 'POST',
      body: JSON.stringify({ jobTitle, difficulty }),
    });
  }

  async submitInterviewAnswer(sessionId: string, question: string, answer: string) {
    return this.request('/interview/answer', {
      method: 'POST',
      body: JSON.stringify({ sessionId, question, answer }),
    });
  }

  async getInterviewFeedback(sessionId: string) {
    return this.request(`/interview/feedback/${sessionId}`);
  }

  // Career Development
  async getSkillGapAnalysis(userProfile: any, targetRole: string) {
    return this.request('/career/skill-gap', {
      method: 'POST',
      body: JSON.stringify({ userProfile, targetRole }),
    });
  }

  async getCareerPath(currentRole: string, targetRole: string) {
    return this.request('/career/path', {
      method: 'POST',
      body: JSON.stringify({ currentRole, targetRole }),
    });
  }

  async getSalaryInsights(role: string, location: string, experience: number) {
    return this.request('/career/salary', {
      method: 'POST',
      body: JSON.stringify({ role, location, experience }),
    });
  }

  // Analytics
  async getUserAnalytics() {
    return this.request('/analytics/user');
  }

  async getMarketTrends(industry: string) {
    return this.request(`/analytics/market-trends/${industry}`);
  }
}

export const apiService = new ApiService(API_BASE_URL);