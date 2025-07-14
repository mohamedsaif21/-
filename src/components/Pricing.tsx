import React from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';

interface PricingProps {
  darkMode: boolean;
}

const Pricing: React.FC<PricingProps> = ({ darkMode }) => {
  const plans = [
    {
      name: 'Explorer',
      price: 'Free',
      period: 'forever',
      icon: Star,
      description: 'Perfect for getting started with resume basics',
      features: [
        'Basic resume templates',
        'ATS compatibility check',
        'PDF export',
        'Email support',
        'Basic career tips'
      ],
      cta: 'Start Free',
      popular: false,
      gradient: 'from-slate-500 to-slate-600'
    },
    {
      name: 'Professional',
      price: '800',
      period: 'per month',
      icon: Zap,
      description: 'Ideal for active job seekers and career changers',
      features: [
        'Everything in Explorer',
        'Advanced resume builder',
        'AI-powered cover letters',
        'ATS optimization analyzer',
        'Interview question bank',
        'LinkedIn profile optimization',
        'Priority support'
      ],
      cta: 'Start 7-Day Free Trial',
      popular: true,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Executive',
      price: '1500',
      period: 'per month',
      icon: Crown,
      description: 'Complete career advancement for senior professionals',
      features: [
        'Everything in Professional',
        'AI mock interviews',
        'Personalized career roadmap',
        'Skill gap analysis',
        'Industry insights dashboard',
        'Executive resume templates',
        'Career coach consultation',
        'White-glove onboarding'
      ],
      cta: 'Start 14-Day Free Trial',
      popular: false,
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <section id="pricing" className={`py-20 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Choose Your Career Stage
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Scale your career advancement tools as you grow
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl ${
                plan.popular 
                  ? 'scale-105 ring-2 ring-blue-500' 
                  : 'hover:scale-105'
              } ${darkMode ? 'bg-slate-700' : 'bg-white'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                
                <p className={`text-sm mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {plan.description}
                </p>

                <div className="flex items-baseline justify-center">
                  <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {plan.price}
                  </span>
                  {plan.price !== 'Free' && (
                    <span className={`text-sm ml-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      /{plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  : darkMode
                    ? 'bg-slate-600 text-white hover:bg-slate-500'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className={`inline-flex items-center p-4 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  30-day money-back guarantee
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Cancel anytime
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  24/7 support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;