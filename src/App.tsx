import React from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { CoralReefBackground } from './components/CoralReefBackground';
import { FloatingElements } from './components/FloatingElements';
import { DynamicBackground } from './components/DynamicBackground';
import { BlogFeed } from './components/BlogFeed';

function AppContent() {
  const { theme, isTransitioning } = useTheme();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Theme Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {/* Cinematic Portal Opening */}
          <div className={`portal-opening absolute inset-0 ${
            theme === 'coral-reef'
              ? 'bg-gradient-to-br from-cyan-600 via-teal-500 to-blue-600'
              : 'bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600'
          }`} />
          
          {/* Energy Ripples */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`ripple-${i}`}
                className={`energy-ripple absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 rounded-full ${
                  theme === 'coral-reef'
                    ? 'border-cyan-300/60'
                    : 'border-purple-300/60'
                }`}
                style={{
                  animationDelay: `${i * 0.15}s`,
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                }}
              />
            ))}
          </div>
          
          {/* Magical Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className={`magic-particle absolute ${
                theme === 'coral-reef'
                  ? 'bg-gradient-to-r from-cyan-300 to-teal-300'
                  : 'bg-gradient-to-r from-purple-300 to-pink-300'
              } rounded-full`}
              style={{
                top: `${45 + Math.random() * 10}%`,
                left: `${45 + Math.random() * 10}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
          
          {/* Color Wave Sweep */}
          <div className={`color-wave absolute inset-0 ${
            theme === 'coral-reef'
              ? 'bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent'
              : 'bg-gradient-to-r from-transparent via-purple-400/80 to-transparent'
          }`} />
          
          {/* Sparkle Burst */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className={`sparkle-burst absolute ${
                theme === 'coral-reef' ? 'text-cyan-200' : 'text-purple-200'
              }`}
              style={{
                top: `${30 + Math.random() * 40}%`,
                left: `${30 + Math.random() * 40}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              ✨
            </div>
          ))}
          
          {/* Final Flash */}
          <div className={`final-flash absolute inset-0 ${
            theme === 'coral-reef'
              ? 'bg-gradient-radial from-white via-cyan-100 to-transparent'
              : 'bg-gradient-radial from-white via-purple-100 to-transparent'
          }`} />
        </div>
      )}
      {/* Dynamic Time-Based Background */}
      <div className={`absolute inset-0 transition-all duration-300 ease-out ${isTransitioning ? 'opacity-30' : 'opacity-100'}`}>
        {theme === 'coral-reef' ? <CoralReefBackground /> : <DynamicBackground />}
      </div>

      {/* Floating Elements */}
      <div className={`transition-all duration-200 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <FloatingElements />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center px-4 py-8 transition-all duration-300 ease-out ${
        isTransitioning ? 'opacity-50' : 'opacity-100'
      }`}>
        {/* Theme Toggle Button */}
        <div className="absolute top-6 right-6 z-20">
          <ThemeToggle />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Blog Feed */}
          <BlogFeed />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;