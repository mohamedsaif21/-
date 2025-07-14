import React, { useState } from 'react';
import { FileText, MessageCircle, TrendingUp, Target, BarChart3, Award, Zap, Brain, Sparkles, Users, Clock, CheckCircle } from 'lucide-react';

interface ValuePillarsProps {
  darkMode: boolean;
}

const ValuePillars: React.FC<ValuePillarsProps> = ({ darkMode }) => {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  const pillars = [
    {
      icon: FileText,
      title: 'Craft',
      subtitle: 'AI-optimized resumes & cover letters that pass ATS',
      description: 'Transform your experience into compelling narratives that get noticed by both ATS systems and hiring managers with our advanced AI technology.',
      features: [
        { 
          icon: Target, 
          name: 'Impact Quantifier™', 
          description: 'AI converts tasks into measurable achievements',
          demo: 'Managed team → Led 12-person team, increasing productivity by 35%'
        },
        { 
          icon: BarChart3, 
          name: 'ATS Compatibility Checker', 
          description: '90%+ compatibility with job descriptions',
          demo: 'Real-time scoring: 92% match for Software Engineer role'
        },
        { 
          icon: Award, 
          name: 'Tone Adjuster®', 
          description: 'Match communication style to company culture',
          demo: 'Startup tone: "Disrupted market trends" → Corporate: "Analyzed market data"'
        }
      ],
      color: 'blue',
      stats: { primary: '92%', secondary: 'ATS Pass Rate', tertiary: '+35% response rate' },
      gradient: 'from-blue-500 to-blue-600',
      technologies: ['NLP Processing', 'Keyword Analysis', 'Grammar AI', 'Template Engine']
    },
    {
      icon: MessageCircle,
      title: 'Prepare',
      subtitle: 'Mock interviews with AI feedback on answers, tone, and presence',
      description: 'Practice with our AI interviewer and receive detailed feedback on content, delivery, and communication style to ace any interview.',
      features: [
        { 
          icon: Users, 
          name: 'AI Interview Bot', 
          description: 'Realistic mock interviews with industry-specific questions',
          demo: 'Behavioral, technical, and situational questions tailored to your role'
        },
        { 
          icon: BarChart3, 
          name: 'Speech Analysis Engine', 
          description: 'Voice tone, pace, and confidence scoring',
          demo: 'Confidence: 78% | Pace: Optimal | Tone: Professional'
        },
        { 
          icon: Target, 
          name: 'Performance Analytics', 
          description: 'Detailed improvement recommendations',
          demo: 'Suggestion: Use more specific examples in STAR format responses'
        }
      ],
      color: 'purple',
      stats: { primary: '3x', secondary: 'Interview Success', tertiary: '85% confidence boost' },
      gradient: 'from-purple-500 to-purple-600',
      technologies: ['Speech-to-Text', 'Sentiment Analysis', 'ML Feedback', 'Video Processing']
    },
    {
      icon: TrendingUp,
      title: 'Grow',
      subtitle: 'Personalized career paths with skill development plans',
      description: 'Navigate your career journey with AI-powered insights, personalized development roadmaps, and market intelligence.',
      features: [
        { 
          icon: Brain, 
          name: 'Skill Gap Analyzer', 
          description: 'Identify opportunities for career advancement',
          demo: 'Missing: Cloud Computing (+$25k salary potential)'
        },
        { 
          icon: BarChart3, 
          name: 'Career Roadmap Generator', 
          description: 'Personalized paths to your dream role',
          demo: 'Junior Dev → Senior Dev → Tech Lead (18-month plan)'
        },
        { 
          icon: Award, 
          name: 'Market Intelligence', 
          description: 'Real-time salary and demand insights',
          demo: 'React Developer: $95k avg, 23% demand increase'
        }
      ],
      color: 'green',
      stats: { primary: '85%', secondary: 'Career Growth', tertiary: '+$15k avg salary increase' },
      gradient: 'from-green-500 to-green-600',
      technologies: ['Market Analysis', 'Skill Mapping', 'Salary Intelligence', 'Learning Paths']
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="features" className={`py-24 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Complete Career Operating System
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Three Pillars of Career Success
          </h2>
          <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Transform your career with AI-powered tools that work together seamlessly to guide you from application to advancement
          </p>
        </div>

        {/* Main Pillars Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredPillar(index)}
              onMouseLeave={() => setHoveredPillar(null)}
              className={`relative p-8 rounded-3xl shadow-xl transition-all duration-500 cursor-pointer ${
                hoveredPillar === index ? 'scale-105 shadow-2xl' : ''
              } ${darkMode ? 'bg-slate-700 border border-slate-600' : 'bg-white border border-slate-200'}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${getColorClasses(pillar.color)} flex items-center justify-center shadow-lg`}>
                  <pillar.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {pillar.stats.primary}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {pillar.stats.secondary}
                  </div>
                </div>
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {pillar.title}
              </h3>
              
              <p className={`text-lg mb-6 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {pillar.subtitle}
              </p>

              <p className={`text-sm mb-8 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {pillar.description}
              </p>

              {/* Key Features */}
              <div className="space-y-4 mb-8">
                {pillar.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="group">
                    <div className="flex items-start">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getColorClasses(pillar.color)} flex items-center justify-center mr-3 transition-transform group-hover:scale-110 flex-shrink-0`}>
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            {feature.name}
                          </span>
                          {feature.name.includes('™') && (
                            <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full">
                              Patent Pending
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mb-2 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                          {feature.description}
                        </p>
                        <div className={`text-xs p-2 rounded-lg ${darkMode ? 'bg-slate-600' : 'bg-slate-100'}`}>
                          <span className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Example: {feature.demo}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technology Stack */}
              <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-slate-600' : 'bg-slate-100'}`}>
                <h4 className={`text-xs font-semibold mb-3 flex items-center ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Zap className="w-3 h-3 mr-1" />
                  Powered By
                </h4>
                <div className="flex flex-wrap gap-1">
                  {pillar.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className={`px-2 py-1 text-xs rounded-md ${darkMode ? 'bg-slate-700 text-slate-400' : 'bg-white text-slate-600'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className={`text-center p-3 rounded-xl mb-6 ${darkMode ? 'bg-slate-600' : 'bg-slate-100'}`}>
                <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  User Impact: {pillar.stats.tertiary}
                </div>
              </div>

              {/* CTA Button */}
              <button className={`w-full py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                hoveredPillar === index
                  ? `bg-gradient-to-r ${getColorClasses(pillar.color)} text-white shadow-lg`
                  : darkMode
                    ? 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}>
                Explore {pillar.title}
              </button>

              {/* Hover Effect Overlay */}
              {hoveredPillar === index && (
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${getColorClasses(pillar.color)} opacity-5 pointer-events-none`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Integration Showcase */}
        <div className={`p-8 rounded-3xl ${darkMode ? 'bg-slate-700 border border-slate-600' : 'bg-white border border-slate-200'} shadow-xl`}>
          <div className="text-center mb-8">
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Seamlessly Connected Workflow
            </h3>
            <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Your progress in one area enhances your performance in all others
            </p>
          </div>

          <div className="flex items-center justify-center space-x-8 mb-8">
            {pillars.map((pillar, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getColorClasses(pillar.color)} flex items-center justify-center mb-2`}>
                    <pillar.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {pillar.title}
                  </span>
                </div>
                {index < pillars.length - 1 && (
                  <div className="flex items-center">
                    <Zap className={`w-6 h-6 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Workflow Examples */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-600' : 'bg-slate-50'}`}>
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                <span className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Resume → Interview
                </span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Keywords from your optimized resume automatically populate interview prep questions
              </p>
            </div>
            
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-600' : 'bg-slate-50'}`}>
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 text-purple-500 mr-2" />
                <span className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Interview → Growth
                </span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Interview feedback identifies skill gaps and suggests learning paths
              </p>
            </div>
            
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-600' : 'bg-slate-50'}`}>
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 text-green-500 mr-2" />
                <span className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Growth → Resume
                </span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                New skills and achievements automatically update your resume templates
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePillars;