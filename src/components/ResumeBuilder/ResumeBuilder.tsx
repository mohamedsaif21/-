import React, { useState, useEffect } from 'react';
import { Download, Eye, Settings, Zap, Target, BarChart3, Save } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { apiService } from '../../services/api';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  graduationDate: string;
}

interface Project {
  name: string;
  description: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
}

interface ATSResult {
  score: number;
  suggestions: string[];
}

interface QuantifyResult {
  quantifiedDescription: string;
}

interface ResumeBuilderProps {
  darkMode: boolean;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ darkMode }) => {
  const { activeResume, updateResume } = useStore();
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  });
  
  const [atsScore, setAtsScore] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');

  const templates = [
    { id: 'modern', name: 'Modern Professional', preview: '/templates/modern.png' },
    { id: 'classic', name: 'Classic Executive', preview: '/templates/classic.png' },
    { id: 'creative', name: 'Creative Designer', preview: '/templates/creative.png' },
    { id: 'tech', name: 'Tech Specialist', preview: '/templates/tech.png' }
  ];

  useEffect(() => {
    if (activeResume) {
      setResumeData(activeResume.content);
      setAtsScore(activeResume.atsScore);
    }
  }, [activeResume]);

  const handleInputChange = (section: string, field: string, value: string) => {
    if (section === '') {
      // Handle direct properties like summary
      setResumeData(prev => ({
        ...prev,
        [field]: value
      }));
    } else if (section === 'personalInfo') {
      // Handle personalInfo specifically
      setResumeData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [field]: value
        }
      }));
    }
  };

  const analyzeATS = async () => {
    setIsAnalyzing(true);
    try {
      const result = await apiService.analyzeATS(JSON.stringify(resumeData)) as ATSResult;
      setAtsScore(result.score);
      setSuggestions(result.suggestions);
      
      if (activeResume) {
        updateResume(activeResume.id, { atsScore: result.score });
      }
    } catch (error) {
      console.error('ATS analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const quantifyImpact = async (experienceIndex: number) => {
    try {
      const experience = resumeData.experience[experienceIndex];
      if (!experience) return;
      
      const result = await apiService.quantifyImpact(experience.description) as QuantifyResult;
      
      const updatedExperience = [...resumeData.experience];
      updatedExperience[experienceIndex] = {
        ...experience,
        description: result.quantifiedDescription
      };
      
      setResumeData(prev => ({
        ...prev,
        experience: updatedExperience
      }));
    } catch (error) {
      console.error('Impact quantification failed:', error);
    }
  };

  const saveResume = async () => {
    if (activeResume) {
      try {
        await apiService.updateResume(activeResume.id, {
          content: resumeData,
          template: selectedTemplate,
          lastModified: new Date()
        });
        updateResume(activeResume.id, {
          content: resumeData,
          template: selectedTemplate,
          lastModified: new Date()
        });
      } catch (error) {
        console.error('Save failed:', error);
      }
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Resume Builder
            </h1>
            <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Create ATS-optimized resumes with AI assistance
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={analyzeATS}
              disabled={isAnalyzing}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center"
            >
              <Target className="w-5 h-5 mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'ATS Check'}
            </button>
            
            <button
              onClick={saveResume}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center ${
                darkMode 
                  ? 'bg-slate-700 text-white hover:bg-slate-600' 
                  : 'bg-white text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Save className="w-5 h-5 mr-2" />
              Save
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Editor Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selection */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Choose Template
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : darkMode
                          ? 'border-slate-600 hover:border-slate-500'
                          : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded mb-2"></div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {template.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Information */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                  className={`p-3 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className={`p-3 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className={`p-3 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                  className={`p-3 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Professional Summary */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Professional Summary
                </h3>
                <button className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-full flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  AI Enhance
                </button>
              </div>
              <textarea
                placeholder="Write a compelling professional summary..."
                value={resumeData.summary}
                onChange={(e) => handleInputChange('', 'summary', e.target.value)}
                rows={4}
                className={`w-full p-3 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            {/* Experience Section */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Work Experience
                </h3>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Add Experience
                </button>
              </div>
              
              {resumeData.experience.map((_, index) => (
                <div key={index} className={`p-4 rounded-lg border mb-4 ${
                  darkMode ? 'border-slate-600 bg-slate-700' : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Job Title"
                      className={`p-3 rounded-lg border ${
                        darkMode 
                          ? 'bg-slate-600 border-slate-500 text-white' 
                          : 'bg-white border-slate-300'
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      className={`p-3 rounded-lg border ${
                        darkMode 
                          ? 'bg-slate-600 border-slate-500 text-white' 
                          : 'bg-white border-slate-300'
                      }`}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      Job Description
                    </label>
                    <button
                      onClick={() => quantifyImpact(index)}
                      className="px-3 py-1 bg-gradient-to-r from-green-500 to-blue-600 text-white text-sm rounded-full flex items-center"
                    >
                      <Target className="w-4 h-4 mr-1" />
                      Quantify Impact™
                    </button>
                  </div>
                  
                  <textarea
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                    className={`w-full p-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-slate-600 border-slate-500 text-white placeholder-slate-400' 
                        : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Preview & Analytics Panel */}
          <div className="space-y-6">
            {/* ATS Score */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  ATS Compatibility
                </h3>
                <BarChart3 className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              </div>
              
              <div className="text-center mb-4">
                <div className={`text-4xl font-bold mb-2 ${
                  atsScore >= 80 ? 'text-green-500' : 
                  atsScore >= 60 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {atsScore}%
                </div>
                <div className={`w-full bg-slate-200 rounded-full h-3 ${darkMode ? 'bg-slate-700' : ''}`}>
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      atsScore >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      atsScore >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${atsScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {atsScore >= 80 ? 'Excellent! Your resume is highly ATS-compatible.' :
                 atsScore >= 60 ? 'Good! Some improvements recommended.' :
                 'Needs improvement for better ATS compatibility.'}
              </div>
            </div>

            {/* AI Suggestions */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                AI Suggestions
              </h3>
              
              <div className="space-y-3">
                {suggestions.length > 0 ? suggestions.map((suggestion, index) => (
                  <div key={index} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                    <div className="flex items-start">
                      <Zap className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {suggestion}
                      </p>
                    </div>
                  </div>
                )) : (
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Run ATS analysis to get personalized suggestions
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button className={`w-full p-3 rounded-lg text-left transition-colors flex items-center ${
                  darkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}>
                  <Eye className="w-5 h-5 mr-3" />
                  Preview Resume
                </button>
                
                <button className={`w-full p-3 rounded-lg text-left transition-colors flex items-center ${
                  darkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}>
                  <Download className="w-5 h-5 mr-3" />
                  Download PDF
                </button>
                
                <button className={`w-full p-3 rounded-lg text-left transition-colors flex items-center ${
                  darkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}>
                  <Settings className="w-5 h-5 mr-3" />
                  Advanced Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;