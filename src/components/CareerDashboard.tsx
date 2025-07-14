import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Target, Award, Clock, Users, Zap, Brain, Eye, ArrowUp, ArrowDown } from 'lucide-react';

interface CareerDashboardProps {
  darkMode: boolean;
}

const CareerDashboard: React.FC<CareerDashboardProps> = ({ darkMode }) => {
  const [selectedMetric, setSelectedMetric] = useState('ats');
  const [animatedValues, setAnimatedValues] = useState({ ats: 0, interview: 0, skills: 0, market: 0 });

  const metrics = [
    { 
      id: 'ats', 
      label: 'ATS Score', 
      value: 92, 
      color: 'green', 
      icon: Target,
      trend: '+8%',
      description: 'Resume optimization score'
    },
    { 
      id: 'interview', 
      label: 'Interview Readiness', 
      value: 78, 
      color: 'blue', 
      icon: Users,
      trend: '+12%',
      description: 'Communication & preparation level'
    },
    { 
      id: 'skills', 
      label: 'Skill Development', 
      value: 85, 
      color: 'purple', 
      icon: TrendingUp,
      trend: '+5%',
      description: 'Technical & soft skills progress'
    },
    { 
      id: 'market', 
      label: 'Market Position', 
      value: 73, 
      color: 'orange', 
      icon: Award,
      trend: '+15%',
      description: 'Competitive standing in field'
    }
  ];

  const skills = [
    { name: 'JavaScript', level: 90, trend: 'up', demand: 'High', salary: '$95k' },
    { name: 'React', level: 85, trend: 'up', demand: 'Very High', salary: '$105k' },
    { name: 'Python', level: 70, trend: 'neutral', demand: 'High', salary: '$88k' },
    { name: 'Cloud Computing', level: 60, trend: 'down', demand: 'Critical', salary: '$120k' },
    { name: 'Machine Learning', level: 45, trend: 'up', demand: 'Growing', salary: '$130k' }
  ];

  const competitorData = [
    { metric: 'Resume Quality', yourScore: 92, average: 65, percentile: 85 },
    { metric: 'Interview Skills', yourScore: 78, average: 60, percentile: 75 },
    { metric: 'Network Strength', yourScore: 68, average: 55, percentile: 70 }
  ];

  const recentActivity = [
    { action: 'Resume updated', time: '2 hours ago', impact: '+3 ATS points' },
    { action: 'Mock interview completed', time: '1 day ago', impact: '+5% readiness' },
    { action: 'Skill assessment taken', time: '3 days ago', impact: 'JavaScript +10%' },
    { action: 'Job application sent', time: '5 days ago', impact: '95% match rate' }
  ];

  useEffect(() => {
    const animateValues = () => {
      metrics.forEach(metric => {
        let current = 0;
        const increment = metric.value / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= metric.value) {
            current = metric.value;
            clearInterval(timer);
          }
          setAnimatedValues(prev => ({ ...prev, [metric.id]: Math.round(current) }));
        }, 20);
      });
    };
    
    animateValues();
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'from-green-500 to-green-600',
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="dashboard" className={`py-24 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Your Career Command Center
          </h2>
          <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Track your progress, identify opportunities, and stay ahead of the competition with real-time insights
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Metrics Overview */}
          <div className={`lg:col-span-2 p-8 rounded-3xl shadow-xl ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Performance Metrics
              </h3>
              <div className="flex items-center space-x-2">
                <Clock className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Updated 5 min ago
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {metrics.map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`p-6 rounded-2xl text-center transition-all transform hover:scale-105 ${
                    selectedMetric === metric.id
                      ? `bg-gradient-to-r ${getColorClasses(metric.color)} text-white shadow-xl`
                      : darkMode 
                        ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-1">
                    {animatedValues[metric.id as keyof typeof animatedValues]}%
                  </div>
                  <div className="text-sm mb-2">{metric.label}</div>
                  <div className={`text-xs flex items-center justify-center ${
                    selectedMetric === metric.id ? 'text-white/80' : 'text-green-500'
                  }`}>
                    <ArrowUp className="w-3 h-3 mr-1" />
                    {metric.trend}
                  </div>
                </button>
              ))}
            </div>

            {/* Progress Chart Visualization */}
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
              <h4 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                7-Day Progress Trend
              </h4>
              <div className="flex items-end justify-between h-40">
                {[65, 72, 78, 85, 80, 88, 92].map((value, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="relative w-full max-w-8 mx-2">
                      <div 
                        className={`w-full bg-gradient-to-t ${getColorClasses(metrics.find(m => m.id === selectedMetric)?.color || 'blue')} rounded-t-lg transition-all duration-1000 delay-${index * 100}`}
                        style={{ height: `${(value / 100) * 120}px` }}
                      ></div>
                      <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {value}%
                      </div>
                    </div>
                    <span className={`text-xs mt-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Heatmap */}
          <div className={`p-8 rounded-3xl shadow-xl ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
            <h3 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Skill Development
            </h3>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {skill.name}
                      </span>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                          {skill.demand} demand • {skill.salary}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-sm font-bold mr-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {skill.level}%
                      </span>
                      <div className={`w-4 h-4 rounded-full ${
                        skill.trend === 'up' 
                          ? 'bg-green-500' 
                          : skill.trend === 'down' 
                            ? 'bg-red-500' 
                            : 'bg-yellow-500'
                      }`}>
                        {skill.trend === 'up' && <ArrowUp className="w-3 h-3 text-white m-0.5" />}
                        {skill.trend === 'down' && <ArrowDown className="w-3 h-3 text-white m-0.5" />}
                      </div>
                    </div>
                  </div>
                  <div className={`w-full bg-slate-200 rounded-full h-3 ${darkMode ? 'bg-slate-600' : ''}`}>
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 delay-${index * 200} ${
                        skill.level >= 80 
                          ? 'bg-gradient-to-r from-green-500 to-green-600'
                          : skill.level >= 60 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                            : 'bg-gradient-to-r from-orange-500 to-orange-600'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-8 p-6 rounded-2xl ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
              <h4 className={`text-sm font-bold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <Brain className="w-4 h-4 mr-2" />
                AI Recommendations
              </h4>
              <ul className={`text-xs space-y-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                <li className="flex items-start">
                  <Zap className="w-3 h-3 mr-2 mt-0.5 text-yellow-500" />
                  Focus on Cloud Computing certification (+$25k salary potential)
                </li>
                <li className="flex items-start">
                  <Zap className="w-3 h-3 mr-2 mt-0.5 text-blue-500" />
                  Complete Machine Learning course (High market demand)
                </li>
                <li className="flex items-start">
                  <Zap className="w-3 h-3 mr-2 mt-0.5 text-green-500" />
                  Practice system design interviews (3 upcoming opportunities)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Competition Comparison & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Competition Comparison */}
          <div className={`p-8 rounded-3xl shadow-xl ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
            <h3 className={`text-2xl font-bold mb-8 flex items-center ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              <Eye className="w-6 h-6 mr-3" />
              Where You Stand vs. Competitors
            </h3>
            
            <div className="space-y-8">
              {competitorData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {item.metric}
                    </span>
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      Top {100 - item.percentile}%
                    </span>
                  </div>
                  
                  <div className="relative">
                    <div className={`w-full bg-slate-200 rounded-full h-4 ${darkMode ? 'bg-slate-600' : ''}`}>
                      {/* Average line */}
                      <div 
                        className="absolute top-0 w-1 h-4 bg-red-400 rounded"
                        style={{ left: `${item.average}%` }}
                      ></div>
                      {/* Your score */}
                      <div 
                        className="h-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000"
                        style={{ width: `${item.yourScore}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between mt-2 text-xs">
                      <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
                        You: {item.yourScore}%
                      </span>
                      <span className="text-red-400">
                        Avg: {item.average}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`p-8 rounded-3xl shadow-xl ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
            <h3 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Recent Activity
            </h3>
            
            <div className="space-y-6">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mt-2 mr-4 flex-shrink-0`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {activity.action}
                      </p>
                      <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                        {activity.time}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Impact: <span className="text-green-500 font-medium">{activity.impact}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
              darkMode 
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}>
              View Full Activity Log
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerDashboard;