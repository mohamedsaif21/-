import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, DollarSign, Clock, ExternalLink, Heart, Filter, Briefcase, TrendingUp } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { apiService } from '../../services/api';

interface JobMatcherProps {
  darkMode: boolean;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  requirements: string[];
  matchScore: number;
  applied: boolean;
  saved: boolean;
}

const JobMatcher: React.FC<JobMatcherProps> = ({ darkMode }) => {
  const { user, addApplication } = useStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('match');

  // Mock job data - in real app, this would come from API
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      salary: '$150,000 - $200,000',
      type: 'Full-time',
      posted: '2 days ago',
      description: 'We are looking for a Senior Software Engineer to join our team...',
      requirements: ['React', 'TypeScript', 'Node.js', 'AWS', '5+ years experience'],
      matchScore: 95,
      applied: false,
      saved: false
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      salary: '$130,000 - $180,000',
      type: 'Full-time',
      posted: '1 day ago',
      description: 'Join our product team to drive innovation...',
      requirements: ['Product Management', 'Agile', 'Data Analysis', '3+ years experience'],
      matchScore: 88,
      applied: false,
      saved: true
    },
    {
      id: '3',
      title: 'Frontend Developer',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      salary: '$120,000 - $160,000',
      type: 'Full-time',
      posted: '3 days ago',
      description: 'Build amazing user experiences for millions of users...',
      requirements: ['React', 'JavaScript', 'CSS', 'Testing', '3+ years experience'],
      matchScore: 82,
      applied: true,
      saved: false
    },
    {
      id: '4',
      title: 'Data Scientist',
      company: 'Amazon',
      location: 'Austin, TX',
      salary: '$140,000 - $190,000',
      type: 'Full-time',
      posted: '5 days ago',
      description: 'Use data to drive business decisions and insights...',
      requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics', '4+ years experience'],
      matchScore: 76,
      applied: false,
      saved: false
    }
  ];

  useEffect(() => {
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesType = !typeFilter || job.type === typeFilter;
      
      return matchesSearch && matchesLocation && matchesType;
    });

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'recent':
          return new Date(b.posted).getTime() - new Date(a.posted).getTime();
        case 'salary':
          // Simple salary comparison - in real app, parse salary ranges
          return b.salary.localeCompare(a.salary);
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, locationFilter, typeFilter, sortBy]);

  const handleApply = async (job: Job) => {
    try {
      // In real app, this would submit application via API
      const updatedJobs = jobs.map(j => 
        j.id === job.id ? { ...j, applied: true } : j
      );
      setJobs(updatedJobs);

      // Add to applications store
      addApplication({
        id: Date.now().toString(),
        company: job.company,
        position: job.title,
        status: 'applied',
        appliedDate: new Date(),
        matchScore: job.matchScore
      });
    } catch (error) {
      console.error('Failed to apply:', error);
    }
  };

  const handleSave = (job: Job) => {
    const updatedJobs = jobs.map(j => 
      j.id === job.id ? { ...j, saved: !j.saved } : j
    );
    setJobs(updatedJobs);
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getMatchBg = (score: number) => {
    if (score >= 90) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 80) return 'bg-blue-100 dark:bg-blue-900/20';
    if (score >= 70) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-orange-100 dark:bg-orange-900/20';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Job Matcher
          </h1>
          <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Find jobs that match your skills and preferences
          </p>
        </div>

        {/* Search and Filters */}
        <div className={`p-6 rounded-xl shadow-lg mb-8 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                    : 'bg-white border-slate-300'
                }`}
              />
            </div>
            
            <div className="relative">
              <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className={`pl-10 pr-4 py-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                    : 'bg-white border-slate-300'
                }`}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-lg border transition-colors flex items-center ${
                darkMode 
                  ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-600">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className={`p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-slate-300'
                }`}
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
              
              <select
                value={salaryFilter}
                onChange={(e) => setSalaryFilter(e.target.value)}
                className={`p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-slate-300'
                }`}
              >
                <option value="">All Salaries</option>
                <option value="50000">$50,000+</option>
                <option value="100000">$100,000+</option>
                <option value="150000">$150,000+</option>
                <option value="200000">$200,000+</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-slate-300'
                }`}
              >
                <option value="match">Best Match</option>
                <option value="recent">Most Recent</option>
                <option value="salary">Highest Salary</option>
              </select>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {filteredJobs.length} jobs found
          </p>
          
          <div className="flex items-center space-x-4">
            <button className={`px-4 py-2 rounded-lg transition-colors ${
              darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}>
              <TrendingUp className="w-4 h-4 mr-2 inline" />
              Market Insights
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`p-6 rounded-xl shadow-lg transition-all hover:shadow-xl ${
                darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className={`text-xl font-bold mr-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {job.title}
                    </h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchBg(job.matchScore)}`}>
                      <span className={getMatchColor(job.matchScore)}>
                        {job.matchScore}% match
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      <Building className={`w-4 h-4 mr-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                      <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{job.company}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className={`w-4 h-4 mr-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                      <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className={`w-4 h-4 mr-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                      <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{job.salary}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className={`w-4 h-4 mr-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                      <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{job.posted}</span>
                    </div>
                  </div>
                  
                  <p className={`mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {job.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements.map((req, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => handleSave(job)}
                  className={`p-2 rounded-lg transition-colors ${
                    job.saved
                      ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                      : darkMode
                        ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-700'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${job.saved ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {job.type}
                  </span>
                  {job.applied && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      Applied
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className={`px-4 py-2 rounded-lg border transition-colors flex items-center ${
                    darkMode 
                      ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                      : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                  
                  <button
                    onClick={() => handleApply(job)}
                    disabled={job.applied}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      job.applied
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    }`}
                  >
                    {job.applied ? 'Applied' : 'Apply Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className={`text-center py-12 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No jobs found matching your criteria</p>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatcher;