import React, { useState } from 'react';
import { Heart, Sparkles, Quote } from 'lucide-react';
import { getDailyQuote } from '../data/quotes';

export const DailyQuote: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
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
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Quote className={`w-8 h-8 md:w-10 md:h-10 text-pink-300 transition-all duration-500 ${
              isRevealed ? 'scale-110 text-pink-200' : ''
            }`} />
            {isRevealed && (
              <div className="absolute inset-0 bg-pink-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
            )}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white ml-3">
            Daily Message
          </h3>
        </div>

        {!isRevealed ? (
          <div className="mb-6">
            <button
              onClick={handleReveal}
              disabled={isAnimating}
              className={`group relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl transition-all duration-500 ${
                isAnimating 
                  ? 'scale-110 shadow-pink-500/50 cursor-not-allowed' 
                  : 'hover:scale-105 hover:shadow-pink-500/30 active:scale-95'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <Heart className={`w-5 h-5 transition-all duration-300 ${
                  isAnimating ? 'animate-pulse text-pink-200' : 'group-hover:scale-110'
                }`} />
                <span>
                  {isAnimating ? 'Revealing...' : 'Reveal Today\'s Message'}
                </span>
                <Sparkles className={`w-5 h-5 transition-all duration-300 ${
                  isAnimating ? 'animate-pulse text-purple-200' : 'group-hover:scale-110'
                }`} />
              </div>
              
              {/* Button glow effect during animation */}
              {isAnimating && (
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
              )}
            </button>
          </div>
        ) : (
          <div className={`transition-all duration-1000 ${
            isRevealed ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-3 rounded-full animate-pulse">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>
                <blockquote className="text-white text-lg md:text-xl leading-relaxed font-medium italic">
                  "{quote}"
                </blockquote>
                <div className="mt-4 flex justify-center space-x-1">
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
          </div>
        )}

        {/* Inspirational note */}
        <div className="text-center">
          <p className="text-purple-200/80 text-sm">
            {isRevealed ? 'A special message just for you 💕' : 'Click to reveal your daily inspiration'}
          </p>
        </div>
      </div>
    </div>
  );
};