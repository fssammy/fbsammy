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
import { HyperdriveTimeViewer } from './components/HyperdriveTimeViewer';
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
      {/* Polaroid of the Day */}
      <PolaroidOfTheDay isVisible={showPolaroid} onClose={handlePolaroidClose} />

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

          {/* Hyperdrive Time Viewer */}
          <HyperdriveTimeViewer 
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            isExpired={isExpired}
          />

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