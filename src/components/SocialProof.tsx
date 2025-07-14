import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Award, Play, Star, Building, CheckCircle, ArrowRight } from 'lucide-react';

interface SocialProofProps {
  darkMode: boolean;
}

const SocialProof: React.FC<SocialProofProps> = ({ darkMode }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Users', growth: '+25% this month' },
    { icon: TrendingUp, value: '92%', label: 'ATS Pass Rate', growth: 'Industry leading' },
    { icon: Award, value: '3x', label: 'Interview Rate', growth: 'vs. traditional resumes' },
    { icon: Star, value: '4.9/5', label: 'User Rating', growth: '2,500+ reviews' }
  ];

  const companies = [
    { name: 'Google', hired: 45 },
    { name: 'Microsoft', hired: 38 },
    { name: 'Amazon', hired: 52 },
    { name: 'Apple', hired: 29 },
    { name: 'Meta', hired: 31 },
    { name: 'Netflix', hired: 18 },
    { name: 'Spotify', hired: 22 },
    { name: 'Tesla', hired: 27 }
  ];

  const testimonials = [
    {
      name: 'Sarah Martinez',
      role: 'Software Engineer',
      company: 'Google',
      avatar: 'SM',
      rating: 5,
      text: "ResuCraft AI helped me land my dream job at Google. The ATS optimization was game-changing - I went from 0 responses to 5 interviews in 2 weeks!",
      results: { applications: 15, interviews: 5, offers: 2 },
      videoLength: '45s'
    },
    {
      name: 'Michael Johnson',
      role: 'Product Manager',
      company: 'Microsoft',
      avatar: 'MJ',
      rating: 5,
      text: "The interview prep feature is incredible. I felt confident and prepared for every question. The AI feedback helped me improve my communication style.",
      results: { applications: 8, interviews: 6, offers: 3 },
      videoLength: '38s'
    },
    {
      name: 'Emily Wilson',
      role: 'Data Scientist',
      company: 'Amazon',
      avatar: 'EW',
      rating: 5,
      text: "Finally, a platform that understands the modern job market. The career dashboard keeps me motivated and shows clear paths for advancement.",
      results: { applications: 12, interviews: 4, offers: 2 },
      videoLength: '52s'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`py-24 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Trusted by Career Professionals
          </h2>
          <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Join thousands who've accelerated their careers with ResuCraft AI
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Stats Column */}
          <div className={`p-8 rounded-3xl shadow-xl ${darkMode ? 'bg-slate-700 border border-slate-600' : 'bg-white border border-slate-200'}`}>
            <h3 className={`text-xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Success Metrics
            </h3>
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline">
                      <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {stat.value}
                      </span>
                      <span className={`text-sm ml-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {stat.label}
                      </span>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                      {stat.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Video */}
          <div className={`p-8 rounded-3xl shadow-xl ${darkMode ? 'bg-slate-700 border border-slate-600' : 'bg-white border border-slate-200'}`}>
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Success Story
            </h3>
            <div className="relative mb-6">
              <div className={`aspect-video rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all group`}>
                <div className="text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                  <p className="text-sm font-medium">{testimonials[activeTestimonial].videoLength} Success Story</p>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="flex justify-center mt-4 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeTestimonial === index 
                        ? 'bg-blue-500 w-6' 
                        : darkMode ? 'bg-slate-600' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center mb-3">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                "{testimonials[activeTestimonial].text}"
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-600">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">
                      {testimonials[activeTestimonial].avatar}
                    </span>
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {testimonials[activeTestimonial].name}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {testimonials[activeTestimonial].results.offers} offers from {testimonials[activeTestimonial].results.applications} applications
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Logos */}
          <div className={`p-8 rounded-3xl shadow-xl ${darkMode ? 'bg-slate-700 border border-slate-600' : 'bg-white border border-slate-200'}`}>
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Our Users Got Hired At
            </h3>
            <div className="space-y-3">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    darkMode 
                      ? 'bg-slate-600 hover:bg-slate-500' 
                      : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center">
                    <Building className={`w-5 h-5 mr-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                    <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {company.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {company.hired} hired
                    </span>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                  </div>
                </div>
              ))}
            </div>
            
            <button className={`w-full mt-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center group ${
              darkMode 
                ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}>
              View All Success Stories
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Additional testimonials grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.slice(1).map((testimonial, index) => (
            <div key={index} className={`p-6 rounded-2xl shadow-lg ${darkMode ? 'bg-slate-700 border border-slate-600' : 'bg-white border border-slate-200'}`}>
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className={`mb-6 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                "{testimonial.text}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {testimonial.name}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {testimonial.results.offers} Offers
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {testimonial.results.interviews} interviews
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;