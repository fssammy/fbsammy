import React, { useState, useEffect } from 'react';
import { Fish, Waves, Anchor, Shell, Star, Sparkles } from 'lucide-react';

interface TimeOfDay {
  period: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night' | 'lateNight';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    water: string;
  };
  elements: React.ReactNode[];
}

// Enhanced Fish Component with more realistic swimming
const SwimmingFish: React.FC<{ 
  size: 'small' | 'medium' | 'large';
  color: string;
  direction: 'left' | 'right';
  speed: 'slow' | 'medium' | 'fast';
  depth: number;
}> = ({ size, color, direction, speed, depth }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const speedDurations = {
    slow: '12s',
    medium: '8s',
    fast: '5s'
  };

  return (
    <div 
      className={`absolute animate-swim-${direction} ${sizeClasses[size]} ${color}`}
      style={{
        animationDuration: speedDurations[speed],
        opacity: Math.max(0.4, 1 - depth * 0.3),
        filter: `blur(${depth * 0.5}px)`,
      }}
    >
      <Fish className={`w-full h-full transform ${direction === 'left' ? 'scale-x-[-1]' : ''}`} />
      {/* Fish tail animation */}
      <div className={`absolute ${direction === 'left' ? 'right-0' : 'left-0'} top-1/2 transform -translate-y-1/2`}>
        <div className={`w-1 h-2 ${color} opacity-60 animate-pulse`} />
      </div>
    </div>
  );
};

// Enhanced Coral Component
const CoralFormation: React.FC<{
  type: 'brain' | 'staghorn' | 'table' | 'soft';
  height: number;
  colors: string[];
  position: number;
}> = ({ type, height, colors, position }) => {
  const renderCoral = () => {
    switch (type) {
      case 'brain':
        return (
          <div className="relative">
            <div 
              className={`w-16 bg-gradient-to-t ${colors[0]} rounded-t-3xl opacity-80`}
              style={{ height: `${height}%` }}
            >
              {/* Brain coral texture */}
              <div className="absolute inset-2 opacity-60">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-white/20 rounded-full animate-pulse"
                    style={{
                      width: `${4 + Math.random() * 8}px`,
                      height: `${4 + Math.random() * 8}px`,
                      top: `${Math.random() * 80}%`,
                      left: `${Math.random() * 80}%`,
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'staghorn':
        return (
          <div className="relative">
            <div 
              className={`w-3 bg-gradient-to-t ${colors[0]} rounded-t-full opacity-80`}
              style={{ height: `${height}%` }}
            />
            {/* Branches */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 bg-gradient-to-t ${colors[0]} rounded-t-full opacity-70`}
                style={{
                  height: `${height * 0.6}%`,
                  bottom: `${20 + i * 15}%`,
                  left: `${-2 + Math.random() * 8}px`,
                  transform: `rotate(${-30 + Math.random() * 60}deg)`,
                  transformOrigin: 'bottom center'
                }}
              />
            ))}
          </div>
        );
      
      case 'table':
        return (
          <div className="relative">
            <div 
              className={`w-2 bg-gradient-to-t ${colors[0]} opacity-80`}
              style={{ height: `${height * 0.7}%` }}
            />
            <div 
              className={`absolute top-0 w-20 h-4 bg-gradient-to-r ${colors[1]} rounded-full opacity-70`}
              style={{ left: '-36px' }}
            />
          </div>
        );
      
      case 'soft':
        return (
          <div className="relative">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 bg-gradient-to-t ${colors[Math.floor(Math.random() * colors.length)]} rounded-t-full opacity-60 animate-sway`}
                style={{
                  height: `${height * (0.5 + Math.random() * 0.5)}%`,
                  bottom: 0,
                  left: `${i * 2}px`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      className="absolute bottom-0"
      style={{ left: `${position}%` }}
    >
      {renderCoral()}
    </div>
  );
};

// Jellyfish Component
const Jellyfish: React.FC<{
  size: number;
  color: string;
  glowIntensity: number;
}> = ({ size, color, glowIntensity }) => {
  return (
    <div className="relative animate-jellyfish-float">
      {/* Bell */}
      <div 
        className={`bg-gradient-to-b ${color} rounded-full animate-jellyfish-pulse`}
        style={{ 
          width: `${size}px`, 
          height: `${size * 0.8}px`,
          boxShadow: `0 0 ${glowIntensity}px rgba(0, 255, 255, 0.5)`
        }}
      />
      
      {/* Tentacles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={`absolute top-full w-0.5 bg-gradient-to-b ${color} rounded-full animate-tentacle-sway opacity-70`}
          style={{
            height: `${size * (1 + Math.random() * 0.8)}px`,
            left: `${(i / 7) * size}px`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${2 + Math.random()}s`
          }}
        />
      ))}
    </div>
  );
};

// Seaweed Component
const Seaweed: React.FC<{
  height: number;
  segments: number;
  color: string;
}> = ({ height, segments, color }) => {
  return (
    <div className="relative">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-3 bg-gradient-to-t ${color} rounded-t-lg animate-seaweed-sway opacity-70`}
          style={{
            height: `${height / segments}px`,
            bottom: `${i * (height / segments)}px`,
            left: `${Math.sin(i * 0.5) * 4}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            transformOrigin: 'bottom center'
          }}
        />
      ))}
    </div>
  );
};

export const CoralReefBackground: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>({
    period: 'afternoon',
    colors: {
      primary: 'from-blue-600 via-cyan-500 to-teal-400',
      secondary: 'from-blue-500/40 via-cyan-400/30 to-teal-300/30',
      accent: 'from-cyan-300/25 via-teal-300/20 to-blue-200/15',
      water: 'from-cyan-200/20 via-teal-100/15 to-transparent'
    },
    elements: []
  });

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

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
          primary: 'from-cyan-900 via-teal-800 to-blue-700',
          secondary: 'from-pink-800/30 via-orange-700/20 to-cyan-600/30',
          accent: 'from-orange-500/20 via-yellow-400/15 to-cyan-300/20',
          water: 'from-cyan-400/10 via-teal-300/5 to-transparent'
        },
        elements: [
          // Enhanced dawn sun rays
          <div key="dawn-rays" className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full opacity-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bg-gradient-to-b from-yellow-300/60 via-orange-300/40 to-transparent animate-ray-shimmer"
                style={{
                  left: `${35 + i * 2.5}%`,
                  width: '3px',
                  height: '70%',
                  transform: `rotate(${-30 + i * 5}deg)`,
                  transformOrigin: 'top center',
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>,
          
          // Swimming fish schools
          ...Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`dawn-fish-${i}`}
              className="absolute"
              style={{
                top: `${20 + Math.random() * 50}%`,
                left: `${-10 + Math.random() * 120}%`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              <SwimmingFish
                size={['small', 'medium'][Math.floor(Math.random() * 2)] as 'small' | 'medium'}
                color="text-cyan-300"
                direction={Math.random() > 0.5 ? 'left' : 'right'}
                speed="medium"
                depth={Math.random() * 2}
              />
            </div>
          )),
          
          // Enhanced bubble streams
          ...Array.from({ length: 25 }).map((_, i) => (
            <div
              key={`dawn-bubble-${i}`}
              className="absolute animate-bubble-rise opacity-60"
              style={{
                bottom: `${Math.random() * 30}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            >
              <div 
                className="bg-cyan-200/50 rounded-full border border-cyan-300/70 animate-bubble-wobble"
                style={{
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`
                }}
              />
            </div>
          )),

          // Coral formations
          ...Array.from({ length: 6 }).map((_, i) => (
            <CoralFormation
              key={`dawn-coral-${i}`}
              type={['brain', 'staghorn', 'soft'][Math.floor(Math.random() * 3)] as 'brain' | 'staghorn' | 'soft'}
              height={30 + Math.random() * 25}
              colors={['from-pink-500 to-coral-400', 'from-orange-400 to-red-400']}
              position={10 + i * 15}
            />
          ))
        ]
      },
      
      morning: {
        colors: {
          primary: 'from-blue-800 via-cyan-700 to-teal-600',
          secondary: 'from-blue-700/40 via-cyan-600/30 to-teal-500/30',
          accent: 'from-cyan-400/25 via-teal-400/20 to-blue-300/15',
          water: 'from-cyan-300/15 via-teal-200/10 to-transparent'
        },
        elements: [
          // Vibrant coral reef
          ...Array.from({ length: 8 }).map((_, i) => (
            <CoralFormation
              key={`morning-coral-${i}`}
              type={['brain', 'staghorn', 'table', 'soft'][Math.floor(Math.random() * 4)] as any}
              height={35 + Math.random() * 30}
              colors={[
                'from-pink-500 to-coral-400',
                'from-orange-400 to-yellow-400',
                'from-red-400 to-pink-400',
                'from-purple-400 to-pink-300'
              ]}
              position={5 + i * 12}
            />
          )),
          
          // Diverse fish schools
          ...Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`morning-fish-${i}`}
              className="absolute"
              style={{
                top: `${15 + Math.random() * 60}%`,
                left: `${-10 + Math.random() * 120}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <SwimmingFish
                size={['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as any}
                color={['text-blue-300', 'text-yellow-400', 'text-pink-400', 'text-purple-400'][Math.floor(Math.random() * 4)]}
                direction={Math.random() > 0.5 ? 'left' : 'right'}
                speed={['slow', 'medium', 'fast'][Math.floor(Math.random() * 3)] as any}
                depth={Math.random() * 3}
              />
            </div>
          )),
          
          // Seaweed forest
          ...Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`morning-seaweed-${i}`}
              className="absolute bottom-0"
              style={{ left: `${Math.random() * 100}%` }}
            >
              <Seaweed
                height={80 + Math.random() * 60}
                segments={4 + Math.floor(Math.random() * 4)}
                color="from-green-600 to-green-400"
              />
            </div>
          )),

          // Sea anemones with enhanced animation
          ...Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`morning-anemone-${i}`}
              className="absolute bottom-0 animate-anemone-sway"
              style={{
                left: `${20 + i * 15}%`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-radial from-pink-400 via-purple-400 to-blue-400 rounded-full opacity-80" />
                {Array.from({ length: 12 }).map((_, j) => (
                  <div
                    key={j}
                    className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-t from-pink-300 via-purple-300 to-transparent rounded-full animate-tentacle-wave"
                    style={{
                      height: `${20 + Math.random() * 15}px`,
                      transform: `translate(-50%, -50%) rotate(${j * 30}deg)`,
                      transformOrigin: 'bottom center',
                      animationDelay: `${j * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          ))
        ]
      },
      
      afternoon: {
        colors: {
          primary: 'from-blue-600 via-cyan-500 to-teal-400',
          secondary: 'from-blue-500/40 via-cyan-400/30 to-teal-300/30',
          accent: 'from-cyan-300/25 via-teal-300/20 to-blue-200/15',
          water: 'from-cyan-200/20 via-teal-100/15 to-transparent'
        },
        elements: [
          // Massive coral reef system
          ...Array.from({ length: 12 }).map((_, i) => (
            <CoralFormation
              key={`afternoon-coral-${i}`}
              type={['brain', 'staghorn', 'table', 'soft'][Math.floor(Math.random() * 4)] as any}
              height={40 + Math.random() * 40}
              colors={[
                'from-pink-600 to-coral-500',
                'from-orange-500 to-yellow-500',
                'from-red-500 to-pink-500',
                'from-purple-500 to-pink-400',
                'from-blue-500 to-purple-400'
              ]}
              position={2 + i * 8}
            />
          )),
          
          // Tropical fish paradise
          ...Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`afternoon-fish-${i}`}
              className="absolute"
              style={{
                top: `${10 + Math.random() * 70}%`,
                left: `${-15 + Math.random() * 130}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <SwimmingFish
                size={['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as any}
                color={[
                  'text-yellow-400', 'text-orange-400', 'text-pink-400', 
                  'text-purple-400', 'text-blue-400', 'text-green-400',
                  'text-red-400', 'text-indigo-400'
                ][Math.floor(Math.random() * 8)]}
                direction={Math.random() > 0.5 ? 'left' : 'right'}
                speed={['slow', 'medium', 'fast'][Math.floor(Math.random() * 3)] as any}
                depth={Math.random() * 2}
              />
            </div>
          )),
          
          // Enhanced sea anemones
          ...Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`afternoon-anemone-${i}`}
              className="absolute bottom-0 animate-anemone-sway"
              style={{
                left: `${15 + i * 10}%`,
                animationDelay: `${i * 0.6}s`,
              }}
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-radial from-pink-400 via-purple-400 to-blue-400 rounded-full opacity-90" />
                {Array.from({ length: 16 }).map((_, j) => (
                  <div
                    key={j}
                    className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-t from-pink-300 via-purple-300 to-transparent rounded-full animate-tentacle-wave"
                    style={{
                      height: `${25 + Math.random() * 20}px`,
                      transform: `translate(-50%, -50%) rotate(${j * 22.5}deg)`,
                      transformOrigin: 'bottom center',
                      animationDelay: `${j * 0.08}s`
                    }}
                  />
                ))}
              </div>
            </div>
          )),

          // Particle effects
          ...Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`afternoon-particle-${i}`}
              className="absolute animate-float opacity-50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div className="w-1 h-1 bg-cyan-300 rounded-full animate-pulse" />
            </div>
          ))
        ]
      },
      
      evening: {
        colors: {
          primary: 'from-indigo-800 via-purple-700 to-blue-800',
          secondary: 'from-purple-700/30 via-pink-600/20 to-indigo-600/30',
          accent: 'from-pink-400/20 via-purple-300/15 to-indigo-400/20',
          water: 'from-purple-300/10 via-pink-200/5 to-transparent'
        },
        elements: [
          // Bioluminescent coral
          ...Array.from({ length: 8 }).map((_, i) => (
            <CoralFormation
              key={`evening-coral-${i}`}
              type={['brain', 'soft'][Math.floor(Math.random() * 2)] as any}
              height={25 + Math.random() * 20}
              colors={[
                'from-purple-600 to-indigo-500',
                'from-pink-500 to-purple-400',
                'from-blue-500 to-purple-500'
              ]}
              position={10 + i * 12}
            />
          )),
          
          // Jellyfish swarm
          ...Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`evening-jellyfish-${i}`}
              className="absolute"
              style={{
                top: `${20 + Math.random() * 50}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 1.5}s`,
              }}
            >
              <Jellyfish
                size={30 + Math.random() * 25}
                color="from-purple-300/60 via-pink-300/40 to-transparent"
                glowIntensity={15 + Math.random() * 10}
              />
            </div>
          )),
          
          // Bioluminescent particles
          ...Array.from({ length: 50 }).map((_, i) => (
            <div
              key={`evening-bio-${i}`}
              className="absolute animate-bioluminescence opacity-80"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              <div 
                className="bg-cyan-300 rounded-full blur-sm animate-pulse"
                style={{
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
                }}
              />
            </div>
          )),

          // Evening fish with bioluminescence
          ...Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`evening-fish-${i}`}
              className="absolute"
              style={{
                top: `${25 + Math.random() * 50}%`,
                left: `${-10 + Math.random() * 120}%`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              <div className="relative">
                <SwimmingFish
                  size="medium"
                  color="text-indigo-300"
                  direction={Math.random() > 0.5 ? 'left' : 'right'}
                  speed="slow"
                  depth={1}
                />
                <div className="absolute top-1 left-1 w-1 h-1 bg-cyan-300 rounded-full animate-pulse" 
                     style={{ boxShadow: '0 0 5px rgba(0, 255, 255, 0.8)' }} />
              </div>
            </div>
          ))
        ]
      },
      
      night: {
        colors: {
          primary: 'from-indigo-900 via-blue-900 to-purple-900',
          secondary: 'from-indigo-800/30 via-blue-800/20 to-purple-800/30',
          accent: 'from-cyan-600/20 via-blue-500/15 to-purple-600/20',
          water: 'from-indigo-300/5 via-blue-200/3 to-transparent'
        },
        elements: [
          // Deep sea bioluminescent display
          ...Array.from({ length: 60 }).map((_, i) => (
            <div
              key={`night-glow-${i}`}
              className="absolute animate-deep-glow opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div 
                className={`rounded-full blur-sm ${['bg-cyan-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400'][Math.floor(Math.random() * 4)]}`}
                style={{
                  width: `${1 + Math.random() * 3}px`,
                  height: `${1 + Math.random() * 3}px`,
                  boxShadow: `0 0 ${5 + Math.random() * 10}px currentColor`
                }}
              />
            </div>
          )),
          
          // Night jellyfish with enhanced glow
          ...Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`night-jellyfish-${i}`}
              className="absolute"
              style={{
                top: `${30 + Math.random() * 40}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 2}s`,
              }}
            >
              <Jellyfish
                size={40 + Math.random() * 30}
                color="from-cyan-300/40 via-blue-300/30 to-transparent"
                glowIntensity={20 + Math.random() * 15}
              />
            </div>
          )),
          
          // Deep sea coral silhouettes
          ...Array.from({ length: 6 }).map((_, i) => (
            <CoralFormation
              key={`night-coral-${i}`}
              type="soft"
              height={20 + Math.random() * 15}
              colors={['from-indigo-800 to-indigo-600', 'from-purple-800 to-purple-600']}
              position={15 + i * 15}
            />
          ))
        ]
      },
      
      lateNight: {
        colors: {
          primary: 'from-slate-900 via-blue-950 to-indigo-950',
          secondary: 'from-slate-800/30 via-blue-900/20 to-indigo-900/30',
          accent: 'from-blue-700/20 via-indigo-800/15 to-slate-700/20',
          water: 'from-slate-300/3 via-blue-200/2 to-transparent'
        },
        elements: [
          // Minimal deep sea ambiance
          ...Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`late-glow-${i}`}
              className="absolute animate-deep-sleep opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            >
              <div className="w-0.5 h-0.5 bg-blue-300 rounded-full blur-sm" />
            </div>
          )),
          
          // Sleeping fish
          ...Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`late-fish-${i}`}
              className="absolute"
              style={{
                top: `${60 + Math.random() * 30}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 4}s`,
              }}
            >
              <SwimmingFish
                size="small"
                color="text-slate-400"
                direction={Math.random() > 0.5 ? 'left' : 'right'}
                speed="slow"
                depth={2}
              />
            </div>
          )),
          
          // Dark coral formations
          ...Array.from({ length: 4 }).map((_, i) => (
            <CoralFormation
              key={`late-coral-${i}`}
              type="brain"
              height={15 + Math.random() * 10}
              colors={['from-slate-800 to-slate-600']}
              position={25 + i * 20}
            />
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
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary Ocean Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${timeOfDay.colors.primary} transition-all duration-[3000ms] ease-in-out`} />
      
      {/* Secondary Water Layer */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${timeOfDay.colors.secondary} transition-all duration-[3000ms] ease-in-out`} />
      
      {/* Accent Shimmer Layer */}
      <div className={`absolute inset-0 bg-gradient-to-bl ${timeOfDay.colors.accent} transition-all duration-[3000ms] ease-in-out`} />
      
      {/* Enhanced Water Surface Effect */}
      <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${timeOfDay.colors.water} animate-water-surface`} />
      
      {/* Underwater Light Caustics */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,255,255,0.15),transparent_60%)] animate-caustic-1" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,200,255,0.1),transparent_60%)] animate-caustic-2" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(100,200,255,0.08),transparent_50%)] animate-caustic-3" />
      </div>
      
      {/* Enhanced Ocean Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-900/60 via-yellow-800/30 to-transparent">
        {/* Sand particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-1 h-1 bg-yellow-600 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 20}px`
            }}
          />
        ))}
      </div>
      
      {/* Time-specific Ocean Elements */}
      <div className="absolute inset-0 transition-all duration-[3000ms] ease-in-out">
        {timeOfDay.elements}
      </div>
      
      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-particle-drift opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${10 + Math.random() * 8}s`,
            }}
          >
            <div 
              className="bg-cyan-200 rounded-full"
              style={{
                width: `${0.5 + Math.random() * 1.5}px`,
                height: `${0.5 + Math.random() * 1.5}px`
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Ocean Theme Indicator */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-cyan-300/30">
          <div className="flex items-center space-x-2">
            <Waves className="w-4 h-4 text-cyan-300" />
            <span className="text-cyan-100 text-sm font-medium capitalize">
              Ocean {timeOfDay.period === 'lateNight' ? 'Late Night' : timeOfDay.period}
            </span>
            <span className="text-cyan-200/60 text-xs">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};