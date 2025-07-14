import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ValuePillars from './components/ValuePillars';
import ProcessFlow from './components/ProcessFlow';
import SocialProof from './components/SocialProof';
import CareerDashboard from './components/CareerDashboard';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder';
import JobMatcher from './components/JobMatcher/JobMatcher';
import InterviewTrainer from './components/InterviewTrainer/InterviewTrainer';

// Landing Page Component
const LandingPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => (
  <>
    <Hero darkMode={darkMode} />
    <ValuePillars darkMode={darkMode} />
    <ProcessFlow darkMode={darkMode} />
    <SocialProof darkMode={darkMode} />
    <CareerDashboard darkMode={darkMode} />
    <Pricing darkMode={darkMode} />
    <Footer darkMode={darkMode} />
  </>
);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<LandingPage darkMode={darkMode} />} />
          <Route path="/resume-builder" element={<ResumeBuilder darkMode={darkMode} />} />
          <Route path="/job-matcher" element={<JobMatcher darkMode={darkMode} />} />
          <Route path="/interview-trainer" element={<InterviewTrainer darkMode={darkMode} />} />
          <Route path="/dashboard" element={<CareerDashboard darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;