import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun, User, Bell, Search } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications] = useState(3);

  const navigationItems = [
    { label: 'Resume Builder', href: '/resume-builder', description: 'AI-powered resume creation' },
    { label: 'Career Paths', href: '/', description: 'Personalized career guidance' },
    { label: 'Interview Prep', href: '/interview-trainer', description: 'AI mock interviews' },
    { label: 'Job Matcher', href: '/job-matcher', description: 'Intelligent job matching' },
    { label: 'Dashboard', href: '/dashboard', description: 'Track your progress' },
    { label: 'Skill Development', href: '/', description: 'Continuous learning' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      darkMode ? 'bg-slate-900/95 backdrop-blur-md border-slate-800' : 'bg-white/95 backdrop-blur-md border-slate-200'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 gap-4">
          {/* Brand */}
          <div className="flex items-center min-w-0">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">RC</span>
              </div>
              <div className="ml-3 min-w-0">
                <div className={`text-xl font-bold truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  ResuCraft AI
                </div>
                <div className="text-xs text-blue-500 font-medium">Career Co-Pilot</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item, index) => (
              <div key={index} className="group relative">
                <Link 
                  to={item.href} 
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center ${
                    darkMode 
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-800 text-white'
                }`}>
                  {item.description}
                  <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent ${
                    darkMode ? 'border-b-slate-800' : 'border-b-slate-800'
                  }`}></div>
                </div>
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <button className={`hidden md:flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
              darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}>
              <Search size={18} />
            </button>

            {/* Notifications */}
            <button className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
              darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}>
              <Bell size={18} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {notifications}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* User Menu */}
            <div className="relative group">
              <button className={`hidden md:flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}>
                <User size={16} className="mr-2" />
                Account
              </button>
            </div>
            
            {/* CTA Button */}
            <button className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:via-purple-700 hover:to-indigo-800 transition-all transform hover:scale-105 shadow-lg ml-2">
              Start Free Trial
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-lg ${darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden py-4 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.href} 
                  className={`px-3 py-3 text-sm font-medium rounded-lg ${
                    darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div>{item.label}</div>
                  <div className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    {item.description}
                  </div>
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <button className="w-full px-3 py-3 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white text-sm font-semibold rounded-lg">
                  Start Free Trial
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;