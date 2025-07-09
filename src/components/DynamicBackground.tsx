import React, { useState, useEffect } from 'react';
import { Sun, Moon, Cloud, Star, Sparkles, CloudRain, CloudDrizzle } from 'lucide-react';

interface TimeOfDay {
  period: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night' | 'lateNight';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  elements: React.ReactNode[];
}

export const DynamicBackground: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>({
    period: 'evening',
    colors: {
      primary: 'from-orange-600 via-red-500 to-purple-700',
      secondary: 'from-orange-500/30 via-red-400/20 to-purple-600/30',
      accent: 'from-red-400/20 via-orange-300/15 to-purple-400/20'
    },
    elements: []
  });

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    let period: TimeOfDay['period'];

    if (hour >= 5 && hour < 7) {
      period = 'dawn';
    } else if (hour >= 7 && hour < 12) {
      period = 'morning';
    } else if (hour >= 12 && hour < 17) {
      period = 'afternoon';
    } else if (hour >= 17 && hour < 20) {
      period = 'evening';
    } else if (hour >= 20 && hour < 23) {
      period = 'night';
    } else {
      period = 'lateNight';
    }

    const timeConfigs: Record<TimeOfDay['period'], Omit<TimeOfDay, 'period'>> = {
      dawn: {
        colors: {
          primary: 'from-purple-900 via-pink-800 to-orange-600',
          secondary: 'from-purple-800/30 via-pink-700/20 to-orange-500/30',
          accent: 'from-pink-500/20 via-orange-400/15 to-yellow-300/20'
        },
        elements: [
          // Dawn sun rising
          <div key="dawn-sun" className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-300 via-yellow-400 to-orange-500 rounded-full opacity-80 animate-pulse">
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute inset-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>,
          // Dawn clouds - reduced to 4
          ...Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`dawn-cloud-${i}`}
              className="absolute animate-float opacity-60"
              style={{
                top: `${20 + Math.random() * 40}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <Cloud className="w-16 h-16 text-pink-200" />
            </div>
          )),
          // Dawn sparkles
          ...Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`dawn-sparkle-${i}`}
              className="absolute animate-pulse opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="w-3 h-3 text-pink-300" />
            </div>
          ))
        ]
      },
      morning: {
        colors: {
          primary: 'from-gray-600 via-gray-500 to-blue-400',
          secondary: 'from-gray-500/40 via-blue-400/30 to-gray-400/30',
          accent: 'from-blue-400/25 via-gray-400/20 to-white/15'
        },
        elements: [
          // Overcast sky with hidden sun
          <div key="morning-overcast" className="absolute top-16 right-16 w-40 h-40 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-full opacity-60 blur-xl">
            <div className="absolute inset-0 bg-gray-300 rounded-full blur-2xl opacity-40 animate-pulse" />
          </div>,
          // Heavy rain clouds - reduced to 4
          ...Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`morning-rain-cloud-${i}`}
              className="absolute animate-float opacity-70"
              style={{
                top: `${10 + Math.random() * 40}%`,
                left: `${Math.random() * 90}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <CloudRain className="w-24 h-24 text-gray-300" />
            </div>
          )),
          // Rain drops
          ...Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`morning-rain-${i}`}
              className="absolute animate-bounce opacity-60"
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            >
              <div className="w-0.5 h-8 bg-gradient-to-b from-blue-200 to-blue-400 rounded-full opacity-80" />
            </div>
          )),
          // Puddle reflections
          ...Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`morning-puddle-${i}`}
              className="absolute bottom-0 animate-pulse opacity-30"
              style={{
                left: `${Math.random() * 90}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div className="w-16 h-4 bg-gradient-to-r from-transparent via-blue-200 to-transparent rounded-full blur-sm" />
            </div>
          ))
        ]
      },
      afternoon: {
        colors: {
          primary: 'from-gray-700 via-gray-600 to-blue-500',
          secondary: 'from-gray-600/40 via-blue-500/30 to-gray-500/30',
          accent: 'from-blue-500/25 via-gray-500/20 to-white/15'
        },
        elements: [
          // Heavy overcast sky
          <div key="afternoon-overcast" className="absolute top-12 right-12 w-44 h-44 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-full opacity-70 blur-2xl">
            <div className="absolute inset-0 bg-gray-400 rounded-full blur-3xl opacity-50 animate-pulse" />
          </div>,
          // Storm clouds - reduced to 5
          ...Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`afternoon-storm-cloud-${i}`}
              className="absolute animate-float opacity-80"
              style={{
                top: `${5 + Math.random() * 35}%`,
                left: `${Math.random() * 85}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${10 + Math.random() * 6}s`,
              }}
            >
              <CloudRain className="w-28 h-28 text-gray-400" />
            </div>
          )),
          // Heavy rain
          ...Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`afternoon-heavy-rain-${i}`}
              className="absolute animate-bounce opacity-70"
              style={{
                top: `${Math.random() * 85}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1.5}s`,
                animationDuration: `${0.3 + Math.random() * 0.4}s`,
              }}
            >
              <div className="w-0.5 h-10 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full opacity-90" />
            </div>
          )),
          // Lightning flashes (occasional)
          ...Array.from({ length: 2 }).map((_, i) => (
            <div
              key={`afternoon-lightning-${i}`}
              className="absolute animate-ping opacity-80"
              style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `0.2s`,
              }}
            >
              <div className="w-1 h-20 bg-gradient-to-b from-yellow-200 via-white to-blue-200 transform rotate-12 opacity-90" />
            </div>
          ))
        ]
      },
      evening: {
        colors: {
          primary: 'from-orange-600 via-red-500 to-purple-700',
          secondary: 'from-orange-500/30 via-red-400/20 to-purple-600/30',
          accent: 'from-red-400/20 via-orange-300/15 to-purple-400/20'
        },
        elements: [
          // Setting sun
          <div key="evening-sun" className="absolute top-32 right-8 w-36 h-36 bg-gradient-to-br from-orange-400 via-red-500 to-red-600 rounded-full opacity-85">
            <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-60 animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-orange-300 to-red-400 rounded-full" />
            <div className="absolute inset-4 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full animate-pulse" />
          </div>,
          // Evening clouds with golden edges - reduced to 4
          ...Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`evening-cloud-${i}`}
              className="absolute animate-float opacity-70"
              style={{
                top: `${25 + Math.random() * 35}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 1.8}s`,
                animationDuration: `${14 + Math.random() * 4}s`,
              }}
            >
              <div className="relative">
                <Cloud className="w-22 h-22 text-orange-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300/30 to-red-300/30 rounded-full blur-sm" />
              </div>
            </div>
          )),
          // Evening fireflies
          ...Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`evening-firefly-${i}`}
              className="absolute animate-pulse opacity-80"
              style={{
                top: `${40 + Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1.5 + Math.random() * 1.5}s`,
              }}
            >
              <div className="w-2 h-2 bg-yellow-300 rounded-full blur-sm animate-pulse" />
            </div>
          ))
        ]
      },
      night: {
        colors: {
          primary: 'from-indigo-900 via-purple-900 to-blue-900',
          secondary: 'from-indigo-800/30 via-purple-800/20 to-blue-800/30',
          accent: 'from-purple-600/20 via-indigo-500/15 to-blue-600/20'
        },
        elements: [
          // Moon
          <div key="night-moon" className="absolute top-16 right-20 w-32 h-32 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-full opacity-90">
            <div className="absolute inset-0 bg-gray-100 rounded-full blur-lg opacity-50 animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-white to-gray-100 rounded-full" />
            {/* Moon craters */}
            <div className="absolute top-4 left-6 w-3 h-3 bg-gray-300 rounded-full opacity-60" />
            <div className="absolute top-8 right-8 w-2 h-2 bg-gray-300 rounded-full opacity-50" />
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-gray-300 rounded-full opacity-40" />
          </div>,
          // Stars
          ...Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`night-star-${i}`}
              className="absolute animate-pulse opacity-80"
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Star className="w-3 h-3 text-yellow-200" />
            </div>
          )),
          // Night clouds - reduced to 3
          ...Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`night-cloud-${i}`}
              className="absolute animate-float opacity-30"
              style={{
                top: `${20 + Math.random() * 40}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${16 + Math.random() * 6}s`,
              }}
            >
              <Cloud className="w-18 h-18 text-indigo-300" />
            </div>
          )),
          // Shooting stars
          ...Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`shooting-star-${i}`}
              className="absolute animate-ping opacity-60"
              style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div className="w-1 h-8 bg-gradient-to-b from-yellow-200 to-transparent transform rotate-45" />
            </div>
          ))
        ]
      },
      lateNight: {
        colors: {
          primary: 'from-gray-900 via-indigo-950 to-black',
          secondary: 'from-gray-800/30 via-indigo-900/20 to-black/30',
          accent: 'from-indigo-700/20 via-purple-800/15 to-gray-700/20'
        },
        elements: [
          // Crescent moon
          <div key="late-moon" className="absolute top-20 right-24 w-28 h-28 opacity-85">
            <div className="relative w-full h-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-full">
              <div className="absolute inset-0 bg-gray-200 rounded-full blur-lg opacity-40 animate-pulse" />
              {/* Crescent shadow */}
              <div className="absolute top-0 right-0 w-20 h-28 bg-gray-900 rounded-full opacity-60" />
            </div>
          </div>,
          // Dim stars
          ...Array.from({ length: 25 }).map((_, i) => (
            <div
              key={`late-star-${i}`}
              className="absolute animate-pulse opacity-60"
              style={{
                top: `${Math.random() * 85}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            >
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
            </div>
          )),
          // Night mist - reduced to 4
          ...Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`late-mist-${i}`}
              className="absolute animate-float opacity-20"
              style={{
                top: `${60 + Math.random() * 30}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 3}s`,
                animationDuration: `${20 + Math.random() * 10}s`,
              }}
            >
              <div className="w-32 h-16 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full blur-xl" />
            </div>
          )),
          // Distant city lights
          ...Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`city-light-${i}`}
              className="absolute animate-pulse opacity-40"
              style={{
                bottom: `${Math.random() * 20}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            >
              <div className="w-1 h-3 bg-yellow-200 rounded-sm" />
            </div>
          ))
        ]
      }
    };

    setTimeOfDay({
      period,
      ...timeConfigs[period]
    });
  }, [currentTime]);

  return (
    <div className="absolute inset-0 overflow-hidden transition-all duration-[2000ms] ease-in-out">
      {/* Primary Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${timeOfDay.colors.primary} transition-all duration-[2000ms] ease-in-out`} />
      
      {/* Secondary Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${timeOfDay.colors.secondary} transition-all duration-[2000ms] ease-in-out`} />
      
      {/* Accent Layer */}
      <div className={`absolute inset-0 bg-gradient-to-bl ${timeOfDay.colors.accent} transition-all duration-[2000ms] ease-in-out`} />
      
      {/* Atmospheric Effects */}
      <div className="absolute inset-0">
        {/* Radial gradients for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)] transition-opacity duration-[2000ms]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)] transition-opacity duration-[2000ms]" />
      </div>
      
      {/* Time-specific Elements */}
      <div className="absolute inset-0 transition-all duration-[2000ms] ease-in-out">
        {timeOfDay.elements}
      </div>
      
      {/* Time Period Indicator */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <div className="flex items-center space-x-2">
            {timeOfDay.period === 'dawn' && <Sun className="w-4 h-4 text-orange-300" />}
            {(timeOfDay.period === 'morning' || timeOfDay.period === 'afternoon') && <CloudRain className="w-4 h-4 text-blue-300" />}
            {timeOfDay.period === 'evening' && <Sun className="w-4 h-4 text-orange-400" />}
            {(timeOfDay.period === 'night' || timeOfDay.period === 'lateNight') && <Moon className="w-4 h-4 text-gray-300" />}
            <span className="text-white/80 text-sm font-medium capitalize">
              {timeOfDay.period === 'lateNight' ? 'Late Night' : timeOfDay.period}
            </span>
            <span className="text-white/60 text-xs">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};