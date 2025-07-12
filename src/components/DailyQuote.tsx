import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { getDailyQuote } from '../data/quotes';

export const DailyQuote: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const quote = getDailyQuote();

  const handleReveal = () => {
    if (isRevealed) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setIsRevealed(true);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {!isRevealed ? (
        <div className="text-center">
          <button
            onClick={handleReveal}
            disabled={isAnimating}
            className={`group relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 hover:scale-105 ${
              isAnimating ? 'animate-pulse scale-110' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Today's Message</span>
              <Sparkles className="w-5 h-5" />
            </div>
            {isAnimating && (
              <div className="absolute inset-0 bg-white/20 animate-ping rounded-full"></div>
            )}
          </button>
          <p className="text-purple-200/60 text-sm mt-3">
            Click to reveal your daily inspiration
          </p>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl opacity-100">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-3 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
            <blockquote className="text-white text-lg md:text-xl leading-relaxed font-medium italic">
              "{quote}"
            </blockquote>
            <div className="mt-6 flex justify-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <Sparkles 
                  key={i} 
                  className="w-4 h-4 text-pink-300 animate-pulse" 
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};