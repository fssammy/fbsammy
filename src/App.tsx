import React from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { CoralReefBackground } from './components/CoralReefBackground';
import { useCountdown } from './hooks/useCountdown';
import { CountdownCard } from './components/CountdownCard';
import { FloatingElements } from './components/FloatingElements';
import { DailyQuote } from './components/DailyQuote';
import { VirtualCakeBuilder } from './components/VirtualCakeBuilder';
import { HugGenerator } from './components/HugGenerator';
import { PolaroidOfTheDay } from './components/PolaroidOfTheDay';
import { SpotifyPlayer } from './components/SpotifyPlayer';
import { DynamicBackground } from './components/DynamicBackground';
import { Calendar, Clock } from 'lucide-react';

function AppContent() {
  const { theme, isTransitioning } = useTheme();
  // Target date: July 12, 2025, 00:00:00 IST
  const targetDate = new Date('2025-07-12T00:00:00+05:30');
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);
  const [showPolaroid, setShowPolaroid] = React.useState(false);

  const countdownItems = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ];

  // Show polaroid after a delay when component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowPolaroid(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePolaroidClose = () => {
    setShowPolaroid(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Theme Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden transition-opacity duration-300">
          {/* Liquid Morph Background */}
          <div className={`liquid-morph ${
            theme === 'coral-reef'
              ? 'bg-gradient-to-br from-cyan-600 via-teal-500 to-blue-600'
              : 'bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600'
          }`} />
          
          {/* Portal Opening Effect */}
          <div className={`portal-open ${
            theme === 'coral-reef'
              ? 'bg-gradient-radial from-cyan-400/60 via-teal-300/40 to-blue-400/20'
              : 'bg-gradient-radial from-purple-400/60 via-pink-300/40 to-indigo-400/20'
          }`} />
          
          {/* Energy Pulse from Center */}
          <div className={`energy-pulse ${
            theme === 'coral-reef'
              ? 'bg-gradient-radial from-cyan-300/80 via-teal-400/60 to-transparent'
              : 'bg-gradient-radial from-purple-300/80 via-pink-400/60 to-transparent'
          }`} />
          
          {/* Vortex Spiral */}
          <div className={`vortex-spiral ${
            theme === 'coral-reef'
              ? 'bg-gradient-conic from-cyan-500/70 via-teal-400/50 via-blue-500/70 to-cyan-500/70'
              : 'bg-gradient-conic from-purple-500/70 via-pink-400/50 via-indigo-500/70 to-purple-500/70'
          }`} />
          
          {/* Quantum Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`quantum-${i}`}
              className={`quantum-particle ${
                theme === 'coral-reef'
                  ? 'bg-gradient-to-r from-cyan-300/80 to-teal-300/80'
                  : 'bg-gradient-to-r from-purple-300/80 to-pink-300/80'
              }`}
              style={{
                animationDelay: `${i * 0.02}s`,
                top: `${45 + Math.random() * 10}%`,
                left: `${45 + Math.random() * 10}%`,
              }}
            />
          ))}
          
          {/* Dimensional Rifts */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`rift-${i}`}
              className={`dimensional-rift ${
                theme === 'coral-reef'
                  ? 'bg-gradient-to-b from-cyan-400/70 via-teal-300/50 to-blue-400/70'
                  : 'bg-gradient-to-b from-purple-400/70 via-pink-300/50 to-indigo-400/70'
              }`}
              style={{
                animationDelay: `${i * 0.1}s`,
                left: `${20 + i * 15}%`,
                filter: `blur(${i * 0.5}px)`,
              }}
            />
          ))}
          
          {/* Cosmic Explosions */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`explosion-${i}`}
              className={`cosmic-explosion ${
                theme === 'coral-reef'
                  ? 'bg-gradient-radial from-cyan-200/60 via-teal-300/40 to-transparent'
                  : 'bg-gradient-radial from-purple-200/60 via-pink-300/40 to-transparent'
              }`}
              style={{
                animationDelay: `${i * 0.08}s`,
                top: `${30 + Math.random() * 40}%`,
                left: `${30 + Math.random() * 40}%`,
              }}
            />
          ))}
          
          {/* Lightning Bolts */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={`lightning-${i}`}
              className={`lightning-bolt ${
                theme === 'coral-reef'
                  ? 'bg-gradient-to-b from-cyan-200/80 via-white/60 to-teal-200/80'
                  : 'bg-gradient-to-b from-purple-200/80 via-white/60 to-pink-200/80'
              }`}
              style={{
                animationDelay: `${i * 0.15}s`,
                left: `${40 + i * 10}%`,
                filter: `blur(${i * 0.3}px)`,
              }}
            />
          ))}
          
          {/* Prism Shatter Effect */}
          <div className={`prism-shatter ${
            theme === 'coral-reef'
              ? 'bg-gradient-to-br from-cyan-300/40 via-teal-200/20 to-blue-300/40'
              : 'bg-gradient-to-br from-purple-300/40 via-pink-200/20 to-indigo-300/40'
          }`} />
          
          {/* Wave Collapse */}
          <div className={`wave-collapse ${
            theme === 'coral-reef'
              ? 'bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent'
              : 'bg-gradient-to-r from-transparent via-purple-400/60 to-transparent'
          }`} />
          
          {/* Hologram Flicker */}
          <div className={`hologram-flicker ${
            theme === 'coral-reef'
              ? 'bg-gradient-to-br from-cyan-200/20 via-teal-100/10 to-blue-200/20'
              : 'bg-gradient-to-br from-purple-200/20 via-pink-100/10 to-indigo-200/20'
          }`} />
          
          {/* Final Flash */}
          <div className={`final-flash ${
            theme === 'coral-reef'
              ? 'bg-gradient-radial from-white/80 via-cyan-100/60 to-transparent'
              : 'bg-gradient-radial from-white/80 via-purple-100/60 to-transparent'
          }`} />
        </div>
      )}
      {/* Polaroid of the Day */}
      <PolaroidOfTheDay isVisible={showPolaroid} onClose={handlePolaroidClose} />

      {/* Dynamic Time-Based Background */}
      <div className={`absolute inset-0 transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 scale-102' : 'opacity-100 scale-100'}`}>
        {theme === 'coral-reef' ? <CoralReefBackground /> : <DynamicBackground />}
      </div>

      {/* Floating Elements */}
      <div className={`transition-all duration-400 ease-out ${isTransitioning ? 'opacity-0 scale-98' : 'opacity-100 scale-100'}`}>
        <FloatingElements />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center px-4 py-8 transition-all duration-600 ease-out ${
        isTransitioning ? 'opacity-80 scale-99 blur-[1px]' : 'opacity-100 scale-100 blur-0'
      }`}>
        {/* Theme Toggle Button */}
        <div className="absolute top-6 right-6 z-20">
          <ThemeToggle />
        </div>
        
        <div className="max-w-6xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="w-8 h-8 md:w-12 md:h-12 text-purple-300 mr-4" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                July 12<sup className="text-2xl md:text-3xl">th</sup>
              </h1>
            </div>
            <p className="text-purple-200 text-lg md:text-xl lg:text-2xl font-light">
              Something amazing is coming
            </p>
            <div className="mt-4 flex items-center justify-center text-purple-300">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm md:text-base">IST (Indian Standard Time)</span>
            </div>
          </div>

          {/* Daily Quote */}
          {!isExpired && <DailyQuote />}

          {/* Hug Generator */}
          <HugGenerator />

          {/* Spotify Player */}
          <SpotifyPlayer />

          {/* Virtual Cake Builder */}
          <VirtualCakeBuilder isCountdownExpired={isExpired} />

          {/* Countdown Display */}
          {!isExpired ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12">
              {countdownItems.map((item, index) => (
                <CountdownCard
                  key={item.label}
                  value={item.value}
                  label={item.label}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                🎉 The Day Has Arrived! 🎉
              </h2>
              <p className="text-xl md:text-2xl text-white/90">
                July 12th is finally here!
              </p>
            </div>
          )}

          {/* Footer Message */}
          <div className="text-center">
            <p className="text-purple-200/80 text-base md:text-lg">
              Every second brings us closer to something extraordinary
            </p>
          </div>
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