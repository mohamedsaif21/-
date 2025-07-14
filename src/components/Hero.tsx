import React, { useState, useEffect, useMemo } from 'react';
import { Play, ArrowRight, FileText, MessageCircle, TrendingUp, Shield, Users, CheckCircle, Zap, Award } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const [activeDemo, setActiveDemo] = useState('resume');
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const words = useMemo(() => ['Career Co-Pilot', 'Success Partner', 'Growth Engine', 'Interview Coach'], []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo(prev => {
        const demos = ['resume', 'interview', 'growth'];
        const currentIndex = demos.indexOf(prev);
        return demos[(currentIndex + 1) % demos.length];
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= currentWord.length) {
        setTypedText(currentWord.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentWordIndex, words]);

  const demoContent = {
    resume: {
      title: 'AI Resume Builder',
      description: 'ATS-optimized resumes with 92% pass rate',
      features: ['Impact Quantifier™', 'Keyword Optimization', 'Template Gallery'],
      metrics: { score: 92, label: 'ATS Compatibility' },
      color: 'blue'
    },
    interview: {
      title: 'AI Interview Trainer',
      description: 'Mock interviews with real-time feedback',
      features: ['Tone Adjuster®', 'Speech Analysis', 'Performance Metrics'],
      metrics: { score: 85, label: 'Interview Readiness' },
      color: 'purple'
    },
    growth: {
      title: 'Career Dashboard',
      description: 'Personalized growth recommendations',
      features: ['Skill Gap Analyzer', 'Career Roadmap', 'Market Insights'],
      metrics: { score: 78, label: 'Career Growth' },
      color: 'green'
    }
  };

  const trustIndicators = [
    { icon: Users, text: '10,000+ Active Users', color: 'green' },
    { icon: CheckCircle, text: '92% ATS Pass Rate', color: 'blue' },
    { icon: TrendingUp, text: '3x Interview Success', color: 'purple' },
    { icon: Award, text: 'SOC2 Certified', color: 'orange' }
  ];

  return (
    <section className={`pt-28 pb-20 ${darkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-white via-slate-50 to-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Trust Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mb-4">
                <Shield className="w-4 h-4 mr-2" />
                SOC2 Certified • Data Never Sold • IP Protected
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Your AI-Powered
              <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 bg-clip-text text-transparent block mt-2 min-h-[1.2em]">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className={`text-xl md:text-2xl mb-10 leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Build ATS-beating resumes, ace interviews, and unlock career growth—all in one intelligent platform
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-blue-600 hover:via-purple-700 hover:to-indigo-800 transition-all transform hover:scale-105 flex items-center justify-center group shadow-xl">
                Start Free (No CC Required)
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className={`px-8 py-4 font-semibold rounded-xl transition-all flex items-center justify-center group border-2 ${
                darkMode 
                  ? 'border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500' 
                  : 'border-slate-300 text-slate-900 hover:bg-slate-50 hover:border-slate-400'
              }`}>
                <Play className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" />
                Watch Demo (60s)
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                    indicator.color === 'green' ? 'from-green-500 to-green-600' :
                    indicator.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    indicator.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-orange-500 to-orange-600'
                  } flex items-center justify-center mb-2 shadow-lg`}>
                    <indicator.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {indicator.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="relative">
            <div className={`rounded-3xl p-8 shadow-2xl ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
              {/* Demo Tabs */}
              <div className="flex space-x-2 mb-8">
                {Object.entries(demoContent).map(([key, content]) => (
                  <button
                    key={key}
                    onClick={() => setActiveDemo(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeDemo === key
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : darkMode
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {content.title.split(' ')[1]}
                  </button>
                ))}
              </div>

              {/* Active Demo Content */}
              <div className="transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                    activeDemo === 'resume' ? 'from-blue-500 to-blue-600' :
                    activeDemo === 'interview' ? 'from-purple-500 to-purple-600' :
                    'from-green-500 to-green-600'
                  } flex items-center justify-center mr-4 shadow-lg`}>
                    {activeDemo === 'resume' && <FileText className="w-6 h-6 text-white" />}
                    {activeDemo === 'interview' && <MessageCircle className="w-6 h-6 text-white" />}
                    {activeDemo === 'growth' && <TrendingUp className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {demoContent[activeDemo as keyof typeof demoContent].title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {demoContent[activeDemo as keyof typeof demoContent].description}
                    </p>
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-3 mb-8">
                  {demoContent[activeDemo as keyof typeof demoContent].features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${
                        activeDemo === 'resume' ? 'from-blue-500 to-blue-600' :
                        activeDemo === 'interview' ? 'from-purple-500 to-purple-600' :
                        'from-green-500 to-green-600'
                      } flex items-center justify-center mr-3`}>
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Live Metrics Visualization */}
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {demoContent[activeDemo as keyof typeof demoContent].metrics.label}
                    </span>
                    <span className={`text-lg font-bold ${
                      activeDemo === 'resume' ? 'text-blue-500' :
                      activeDemo === 'interview' ? 'text-purple-500' :
                      'text-green-500'
                    }`}>
                      {demoContent[activeDemo as keyof typeof demoContent].metrics.score}%
                    </span>
                  </div>
                  <div className={`w-full bg-slate-200 rounded-full h-3 ${darkMode ? 'bg-slate-600' : ''}`}>
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        activeDemo === 'resume' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                        activeDemo === 'interview' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                        'bg-gradient-to-r from-green-500 to-green-600'
                      }`}
                      style={{ 
                        width: `${demoContent[activeDemo as keyof typeof demoContent].metrics.score}%`
                      }}
                    ></div>
                  </div>
                  
                  {/* Real-time Feedback */}
                  <div className="mt-4 flex items-center text-xs">
                    <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
                      {activeDemo === 'resume' && 'AI analyzing keyword density...'}
                      {activeDemo === 'interview' && 'Processing speech patterns...'}
                      {activeDemo === 'growth' && 'Calculating skill gaps...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            
            {/* Success Indicator */}
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
              darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
            }`}>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live Demo Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;