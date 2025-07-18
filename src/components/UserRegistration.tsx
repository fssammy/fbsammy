import React, { useState } from 'react';
import { Mail, User, Bell, BellOff, Sparkles, Heart } from 'lucide-react';

interface UserRegistrationProps {
  onRegister: (name: string, email: string, subscribe: boolean) => void;
}

export const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subscribe: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { name?: string; email?: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    setTimeout(() => {
      onRegister(formData.name, formData.email, formData.subscribe);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to July 12th Blog! 
          </h2>
          <p className="text-purple-200 text-lg">
            Join our community and stay connected
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-white font-medium mb-2 flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 ${
                errors.name ? 'border-red-400' : 'border-white/20'
              }`}
            />
            {errors.name && (
              <p className="text-red-300 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-white font-medium mb-2 flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 ${
                errors.email ? 'border-red-400' : 'border-white/20'
              }`}
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Notification Subscription */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-start space-x-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, subscribe: !prev.subscribe }))}
                className={`flex-shrink-0 p-2 rounded-full transition-all duration-200 ${
                  formData.subscribe
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {formData.subscribe ? (
                  <Bell className="w-5 h-5" />
                ) : (
                  <BellOff className="w-5 h-5" />
                )}
              </button>
              <div className="flex-1">
                <h4 className="text-white font-medium mb-1">
                  Email Notifications
                </h4>
                <p className="text-white/70 text-sm">
                  Get notified when someone posts a new message. You can unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isSubmitting ? 'Joining...' : 'Join the Community'}</span>
            <Heart className="w-5 h-5" />
          </button>
        </form>

        {/* Privacy Note */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-xs">
            Your email is only used for notifications and will never be shared. 
            We respect your privacy! 💕
          </p>
        </div>
      </div>
    </div>
  );
};