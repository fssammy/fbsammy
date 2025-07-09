import React, { useState, useEffect } from 'react';
import { Clock, Zap, Star, ArrowRight } from 'lucide-react';

interface HyperdriveTimeViewerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const HyperdriveTimeViewer: React.FC<HyperdriveTimeViewerProps> = ({
  days, hours, minutes, seconds, isExpired
}) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'tunnel' | 'reveal' | 'complete'>('idle');
  const [tunnelIntensity, setTunnelIntensity] = useState(0);

  const activateHyperdrive = () => {
    if (isActive || isExpired) return;
    
    setIsActive(true);
    setPhase('tunnel');
    
    // Tunnel animation sequence
    let intensity = 0;
    const tunnelInterval = setInterval(() => {
      intensity += 2;
      setTunnelIntensity(intensity);
      
      if (intensity >= 100) {
        clearInterval(tunnelInterval);
        setTimeout(() => {
          setPhase('reveal');
          setTimeout(() => {
            setPhase('complete');
            setTimeout(() => {
              setIsActive(false);
              setPhase('idle');
              setTunnelIntensity(0);
            }, 3000);
          }, 1000);
        }, 500);
      }
    }, 30);
  };

  const formatTimeUnit = (value: number, label: string) => {
    return `${value.toString().padStart(2, '0')} ${label}${value !== 1 ? 's' : ''}`;
  };

  const getTimeMessage = () => {
    if (isExpired) return "The moment has arrived!";
    
    const totalHours = days * 24 + hours;
    const totalMinutes = totalHours * 60 + minutes;
    
    if (days > 0) {
      return `${formatTimeUnit(days, 'day')} and ${formatTimeUnit(hours, 'hour')} remaining`;
    } else if (hours > 0) {
      return `${formatTimeUnit(hours, 'hour')} and ${formatTimeUnit(minutes, 'minute')} remaining`;
    } else if (minutes > 0) {
      return `${formatTimeUnit(minutes, 'minute')} and ${formatTimeUnit(seconds, 'second')} remaining`;
    } else {
      return `Only ${formatTimeUnit(seconds, 'second')} left!`;
    }
  };

  return (
    <>
      {/* Trigger Button */}
      {!isActive && (
        <div className="text-center mb-8">
          <button
            onClick={activateHyperdrive}
            disabled={isExpired}
            className={`group relative overflow-hidden px-8 py-4 rounded-full font-semibold text-lg shadow-2xl transition-all duration-500 hover:scale-105 ${
              isExpired 
                ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:shadow-blue-500/25'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>How Much Time is Left?</span>
              <Zap className="w-5 h-5" />
            </div>
          </button>
          <p className="text-purple-200/60 text-sm mt-3">
            {isExpired ? 'The countdown has ended!' : 'Travel through time to see the countdown'}
          </p>
        </div>
      )}

      {/* Hyperdrive Tunnel Effect */}
      {isActive && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black">
          
          {/* Tunnel Background */}
          <div className="absolute inset-0">
            {/* Main tunnel gradient */}
            <div 
              className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/30 to-black transition-all duration-100"
              style={{
                background: `radial-gradient(circle at center, 
                  transparent ${Math.max(0, 50 - tunnelIntensity * 0.4)}%, 
                  rgba(59, 130, 246, ${tunnelIntensity * 0.003}) ${Math.max(20, 70 - tunnelIntensity * 0.3)}%, 
                  rgba(0, 0, 0, 0.9) 100%)`
              }}
            />
            
            {/* Tunnel rings */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-full animate-tunnel-ring"
                style={{
                  width: `${(i + 1) * 100}px`,
                  height: `${(i + 1) * 100}px`,
                  borderColor: `rgba(59, 130, 246, ${Math.max(0, 0.8 - i * 0.04)})`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${2 - tunnelIntensity * 0.015}s`,
                  opacity: Math.min(1, tunnelIntensity * 0.02)
                }}
              />
            ))}
            
            {/* Speed lines */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={`line-${i}`}
                className="absolute animate-speed-line"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${20 + Math.random() * 40}px`,
                  background: `linear-gradient(to bottom, 
                    transparent, 
                    rgba(59, 130, 246, ${Math.random() * 0.8}), 
                    transparent)`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`,
                  opacity: Math.min(1, tunnelIntensity * 0.02)
                }}
              />
            ))}
            
            {/* Particle stars */}
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute animate-star-streak"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${0.3 + Math.random() * 0.7}s`,
                  opacity: Math.min(1, tunnelIntensity * 0.015)
                }}
              >
                <Star className="w-2 h-2 text-blue-300" />
              </div>
            ))}
            
            {/* Energy waves */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`wave-${i}`}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-energy-wave"
                style={{
                  width: `${(i + 1) * 200}px`,
                  height: `${(i + 1) * 200}px`,
                  border: `3px solid rgba(147, 51, 234, ${Math.max(0, 0.6 - i * 0.08)})`,
                  borderRadius: '50%',
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${3 - tunnelIntensity * 0.02}s`,
                  opacity: Math.min(1, tunnelIntensity * 0.01)
                }}
              />
            ))}
          </div>
          
          {/* Tunnel entrance effect */}
          <div 
            className="absolute inset-0 bg-gradient-radial from-white via-blue-200 to-transparent animate-pulse"
            style={{
              opacity: Math.max(0, (tunnelIntensity - 80) * 0.05),
              background: `radial-gradient(circle at center, 
                rgba(255, 255, 255, ${Math.max(0, (tunnelIntensity - 80) * 0.01)}) 0%, 
                rgba(59, 130, 246, ${Math.max(0, (tunnelIntensity - 80) * 0.008)}) 30%, 
                transparent 70%)`
            }}
          />
          
          {/* Speed blur effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(59, 130, 246, ${tunnelIntensity * 0.002}) 45%, 
                rgba(147, 51, 234, ${tunnelIntensity * 0.003}) 50%, 
                rgba(59, 130, 246, ${tunnelIntensity * 0.002}) 55%, 
                transparent 100%)`,
              filter: `blur(${tunnelIntensity * 0.1}px)`,
              opacity: Math.min(0.8, tunnelIntensity * 0.008)
            }}
          />
          
          {/* Central loading indicator */}
          {phase === 'tunnel' && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="relative">
                {/* Spinning ring */}
                <div className="w-32 h-32 border-4 border-blue-500/30 border-t-blue-400 rounded-full animate-spin"></div>
                
                {/* Inner glow */}
                <div className="absolute inset-4 bg-gradient-radial from-blue-400/50 to-transparent rounded-full animate-pulse"></div>
                
                {/* Progress text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-blue-300 font-bold text-lg">
                    {Math.round(tunnelIntensity)}%
                  </span>
                </div>
              </div>
              
              <p className="text-blue-200 mt-6 text-xl font-semibold animate-pulse">
                Speeding Through Time...
              </p>
              
              {/* Speed indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-8 bg-blue-400 rounded-full animate-pulse ${
                      tunnelIntensity > i * 20 ? 'opacity-100' : 'opacity-30'
                    }`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Time Reveal */}
          {phase === 'reveal' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center time-reveal-animation">
                {/* Dramatic entrance */}
                <div className="relative">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-radial from-blue-400/30 via-purple-400/20 to-transparent blur-3xl scale-150"></div>
                  
                  {/* Main time display */}
                  <div className="relative bg-black/50 backdrop-blur-lg rounded-3xl p-8 border-2 border-blue-400/50 shadow-2xl">
                    <div className="flex items-center justify-center mb-6">
                      <Clock className="w-12 h-12 text-blue-400 mr-4 animate-pulse" />
                      <h2 className="text-4xl font-bold text-white">Time Remaining</h2>
                    </div>
                    
                    {/* Time breakdown */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">{days.toString().padStart(2, '0')}</div>
                        <div className="text-blue-200 text-sm uppercase tracking-wide">Days</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">{hours.toString().padStart(2, '0')}</div>
                        <div className="text-purple-200 text-sm uppercase tracking-wide">Hours</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-pink-400 mb-2">{minutes.toString().padStart(2, '0')}</div>
                        <div className="text-pink-200 text-sm uppercase tracking-wide">Minutes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400 mb-2">{seconds.toString().padStart(2, '0')}</div>
                        <div className="text-cyan-200 text-sm uppercase tracking-wide">Seconds</div>
                      </div>
                    </div>
                    
                    {/* Summary message */}
                    <div className="text-center">
                      <p className="text-xl text-white font-medium mb-4">
                        {getTimeMessage()}
                      </p>
                      <div className="flex items-center justify-center text-blue-300">
                        <ArrowRight className="w-5 h-5 mr-2" />
                        <span className="text-sm">Until July 12th arrives</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating particles around the display */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-float-around"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: `${3 + Math.random() * 2}s`
                      }}
                    >
                      <Star className="w-4 h-4 text-blue-300 opacity-60" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Exit message */}
          {phase === 'complete' && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm animate-pulse border border-blue-400/30">
                ✨ Time travel complete - Returning to present ✨
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};