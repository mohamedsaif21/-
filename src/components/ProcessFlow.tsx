import React, { useState } from 'react';
import { User, FileText, Target, MessageCircle, BarChart3, CheckCircle, Clock } from 'lucide-react';

interface ProcessFlowProps {
  darkMode: boolean;
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ darkMode }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: User,
      title: 'Profile Input',
      description: 'Tell us about your experience and career goals',
      tooltip: 'AI analyzes your background and career aspirations',
      details: 'Smart profile builder extracts key information from your LinkedIn or manual input',
      time: '2 min',
      features: ['LinkedIn Integration', 'Smart Data Extraction', 'Goal Setting']
    },
    {
      icon: FileText,
      title: 'AI Document Builder',
      description: 'Generate optimized resumes and cover letters',
      tooltip: 'Impact Quantifier™ enhances your achievements',
      details: 'AI transforms your experience into compelling, ATS-optimized documents',
      time: '5 min',
      features: ['Impact Quantifier™', 'ATS Optimization', 'Template Gallery']
    },
    {
      icon: Target,
      title: 'Job Matcher',
      description: 'Find positions that match your profile',
      tooltip: 'ATS compatibility scoring for each application',
      details: 'Intelligent matching algorithm finds relevant opportunities',
      time: 'Ongoing',
      features: ['Smart Matching', 'Compatibility Scoring', 'Application Tracking']
    },
    {
      icon: MessageCircle,
      title: 'Interview Trainer',
      description: 'Practice with AI-powered mock interviews',
      tooltip: 'Tone Adjuster® improves your communication',
      details: 'Comprehensive interview preparation with real-time feedback',
      time: '15 min',
      features: ['Tone Adjuster®', 'Speech Analysis', 'Performance Metrics']
    },
    {
      icon: BarChart3,
      title: 'Career Dashboard',
      description: 'Track progress and unlock growth opportunities',
      tooltip: 'Skill Gap Analyzer identifies development areas',
      details: 'Comprehensive analytics and personalized career roadmap',
      time: 'Continuous',
      features: ['Skill Gap Analyzer', 'Progress Tracking', 'Growth Recommendations']
    }
  ];

  return (
    <section className={`py-24 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Your Journey to Career Success
          </h2>
          <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            From profile to promotion—follow our proven pathway with AI guidance at every step
          </p>
        </div>

        {/* Desktop Flow */}
        <div className="hidden lg:block mb-16">
          <div className="flex items-center justify-between mb-12">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="group relative cursor-pointer"
                  onMouseEnter={() => setActiveStep(index)}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-110'
                      : darkMode 
                        ? 'bg-slate-700 hover:bg-slate-600' 
                        : 'bg-white hover:bg-slate-50 border-2 border-slate-200'
                  }`}>
                    <step.icon className={`w-10 h-10 ${
                      activeStep === index ? 'text-white' : darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`} />
                  </div>
                  
                  {/* Step Number */}
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeStep === index
                      ? 'bg-white text-blue-600'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  
                  {/* Tooltip */}
                  <div className={`absolute -top-24 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    darkMode ? 'bg-slate-700 text-white' : 'bg-slate-800 text-white'
                  }`}>
                    {step.tooltip}
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                      darkMode ? 'border-t-slate-700' : 'border-t-slate-800'
                    }`}></div>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-1 rounded-full transition-all duration-500 ${
                      activeStep > index 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                        : darkMode ? 'bg-slate-700' : 'bg-slate-200'
                    }`}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Active Step Details */}
          <div className={`p-8 rounded-3xl shadow-xl transition-all duration-500 ${
            darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'
          }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                    {React.createElement(steps[activeStep].icon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {steps[activeStep].title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 text-blue-500 mr-1" />
                      <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {steps[activeStep].time}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className={`text-lg mb-6 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {steps[activeStep].details}
                </p>

                <div className="space-y-3">
                  {steps[activeStep].features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      {React.createElement(steps[activeStep].icon, { className: "w-8 h-8" })}
                    </div>
                    <p className="text-sm font-medium">Interactive Demo</p>
                    <p className="text-xs opacity-80">Click to explore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className={`p-6 rounded-2xl shadow-lg transition-all ${
              darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'
            }`}>
              <div className="flex items-start">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0 relative">
                  <step.icon className="w-8 h-8 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold text-blue-600">
                    {index + 1}
                  </div>
                </div>
                
                <div className="ml-6 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {step.title}
                    </h3>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-blue-500 mr-1" />
                      <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {step.time}
                      </span>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {step.details}
                  </p>

                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;