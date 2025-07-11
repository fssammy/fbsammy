import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles, RotateCcw, Check, Edit3 } from 'lucide-react';

interface CakeBuilderProps {
  isCountdownExpired: boolean;
}

interface CakeConfig {
  base: string;
  frosting: string;
  candles: number;
  toppings: string[];
}

const cakeBases = [
  { id: 'chocolate', name: 'Chocolate', color: 'bg-gradient-to-b from-amber-700 to-amber-900', emoji: '🍫' },
  { id: 'vanilla', name: 'Vanilla', color: 'bg-gradient-to-b from-yellow-100 to-yellow-200', emoji: '🍰' },
  { id: 'strawberry', name: 'Strawberry', color: 'bg-gradient-to-b from-pink-200 to-pink-400', emoji: '🍓' },
  { id: 'red-velvet', name: 'Red Velvet', color: 'bg-gradient-to-b from-red-400 to-red-600', emoji: '❤️' },
];

const frostings = [
  { id: 'vanilla', name: 'Vanilla', color: 'bg-gradient-to-b from-white to-gray-100', emoji: '🤍' },
  { id: 'chocolate', name: 'Chocolate', color: 'bg-gradient-to-b from-amber-600 to-amber-800', emoji: '🤎' },
  { id: 'strawberry', name: 'Strawberry', color: 'bg-gradient-to-b from-pink-200 to-pink-400', emoji: '🩷' },
  { id: 'mint', name: 'Mint', color: 'bg-gradient-to-b from-green-200 to-green-400', emoji: '💚' },
];

const toppings = [
  { id: 'sprinkles', name: 'Sprinkles', emoji: '🌈' },
  { id: 'cherries', name: 'Cherries', emoji: '🍒' },
  { id: 'berries', name: 'Berries', emoji: '🫐' },
  { id: 'flowers', name: 'Flowers', emoji: '🌸' },
  { id: 'stars', name: 'Stars', emoji: '⭐' },
  { id: 'hearts', name: 'Hearts', emoji: '💖' },
];

const STORAGE_KEY = 'july12th-cake-config';

export const VirtualCakeBuilder: React.FC<CakeBuilderProps> = ({ isCountdownExpired }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const [cake, setCake] = useState<CakeConfig>({
    base: 'vanilla',
    frosting: 'vanilla',
    candles: 1,
    toppings: [],
  });
  const [isExploding, setIsExploding] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showFinalizeAnimation, setShowFinalizeAnimation] = useState(false);

  // Load saved cake configuration on component mount
  useEffect(() => {
    const savedConfig = localStorage.getItem(STORAGE_KEY);
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setCake(parsedConfig.cake);
        setIsFinalized(parsedConfig.isFinalized);
        if (parsedConfig.isFinalized) {
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Error loading saved cake configuration:', error);
      }
    }
  }, []);

  // Save cake configuration whenever it changes or is finalized
  useEffect(() => {
    const configToSave = {
      cake,
      isFinalized,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configToSave));
  }, [cake, isFinalized]);

  useEffect(() => {
    if (isCountdownExpired && isOpen) {
      setIsExploding(true);
      setTimeout(() => {
        setShowFireworks(true);
      }, 1000);
    }
  }, [isCountdownExpired, isOpen]);

  // Check if it's July 12th for special explosion
  const isJuly12th = () => {
    const today = new Date();
    return today.getMonth() === 6 && today.getDate() === 12; // July is month 6 (0-indexed)
  };

  const selectedBase = cakeBases.find(b => b.id === cake.base);
  const selectedFrosting = frostings.find(f => f.id === cake.frosting);

  const toggleTopping = (toppingId: string) => {
    if (isFinalized) return;
    setCake(prev => ({
      ...prev,
      toppings: prev.toppings.includes(toppingId)
        ? prev.toppings.filter(t => t !== toppingId)
        : [...prev.toppings, toppingId]
    }));
  };

  const resetCake = () => {
    setCake({
      base: 'vanilla',
      frosting: 'vanilla',
      candles: 1,
      toppings: [],
    });
    setIsExploding(false);
    setShowFireworks(false);
    setIsFinalized(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const finalizeCake = () => {
    setShowFinalizeAnimation(true);
    setTimeout(() => {
      setIsFinalized(true);
      setShowFinalizeAnimation(false);
    }, 800);
  };

  const editCake = () => {
    setIsFinalized(false);
  };

  const getCakeDescription = () => {
    const baseText = selectedBase?.name || 'Vanilla';
    const frostingText = selectedFrosting?.name || 'Vanilla';
    const toppingsText = cake.toppings.length > 0 
      ? cake.toppings.map(id => toppings.find(t => t.id === id)?.name).join(', ')
      : 'No toppings';
    
    return `${baseText} cake with ${frostingText} frosting, ${cake.candles} candle${cake.candles > 1 ? 's' : ''}, and ${toppingsText}`;
  };

  const renderCake = () => {
    return (
      <div className={`relative transition-all duration-1000 ${isExploding ? 'animate-bounce scale-110' : ''} ${showFinalizeAnimation ? 'animate-pulse scale-110' : ''}`}>
        {/* Cake Plate */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-4 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-full shadow-lg border border-gray-400"></div>
        
        {/* Cake Base - Bottom Layer */}
        <div className={`relative w-36 h-16 ${selectedBase?.color} rounded-t-3xl rounded-b-lg shadow-2xl border-2 border-amber-700/30 overflow-hidden`}>
          {/* Cake texture */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10"></div>
          
          {/* Cake layers effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20"></div>
          <div className="absolute bottom-1 left-0 right-0 h-px bg-white/30"></div>
        </div>

        {/* Cake Base - Top Layer (smaller) */}
        <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-28 h-12 ${selectedBase?.color} rounded-t-3xl rounded-b-lg shadow-xl border-2 border-amber-700/30 overflow-hidden`}>
          {/* Cake texture */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10"></div>
          
          {/* Cake layers effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20"></div>
          <div className="absolute bottom-1 left-0 right-0 h-px bg-white/30"></div>
        </div>

        {/* Frosting Layer - Bottom */}
        <div className={`absolute top-0 left-0 right-0 h-6 ${selectedFrosting?.color} rounded-t-2xl shadow-inner overflow-hidden`}>
          {/* Frosting swirls and texture */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute top-1 left-2 w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="absolute top-2 right-3 w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="absolute top-1 left-1/2 w-1 h-1 bg-white/40 rounded-full"></div>
          
          {/* Decorative frosting edge */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>

        {/* Frosting Layer - Top */}
        <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-28 h-4 ${selectedFrosting?.color} rounded-t-2xl shadow-inner overflow-hidden`}>
          {/* Frosting swirls and texture */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute top-1 left-2 w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="absolute top-1 right-2 w-1 h-1 bg-white/40 rounded-full"></div>
          
          {/* Decorative frosting edge */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>
        
        {/* Toppings - Bottom Layer */}
        <div className="absolute top-2 left-0 right-0 flex justify-center space-x-1 flex-wrap px-2">
          {cake.toppings.slice(0, Math.ceil(cake.toppings.length / 2)).map((toppingId, index) => {
            const topping = toppings.find(t => t.id === toppingId);
            return (
              <span 
                key={`bottom-${toppingId}-${index}`} 
                className={`text-sm animate-bounce ${isExploding ? 'animate-ping' : ''}`}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '2s'
                }}
              >
                {topping?.emoji}
              </span>
            );
          })}
        </div>

        {/* Toppings - Top Layer */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-28 flex justify-center space-x-1 flex-wrap px-2">
          {cake.toppings.slice(Math.ceil(cake.toppings.length / 2)).map((toppingId, index) => {
            const topping = toppings.find(t => t.id === toppingId);
            return (
              <span 
                key={`top-${toppingId}-${index}`} 
                className={`text-xs animate-bounce ${isExploding ? 'animate-ping' : ''}`}
                style={{ 
                  animationDelay: `${(index + 3) * 0.2}s`,
                  animationDuration: '2s'
                }}
              >
                {topping?.emoji}
              </span>
            );
          })}
        </div>

        {/* Candles */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Array.from({ length: cake.candles }).map((_, index) => (
            <div key={index} className="relative">
              {/* Candle */}
              <div className="w-2 h-8 bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 border border-yellow-500 rounded-sm shadow-md">
                {/* Candle stripes */}
                <div className="absolute top-1 left-0 right-0 h-px bg-yellow-500/50"></div>
                <div className="absolute top-3 left-0 right-0 h-px bg-yellow-500/50"></div>
                <div className="absolute top-5 left-0 right-0 h-px bg-yellow-500/50"></div>
              </div>
              
              {/* Wax drip */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-yellow-200 rounded-b-full opacity-60"></div>
              
              {/* Flame */}
              <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${isExploding ? 'animate-pulse scale-150' : 'animate-pulse'}`}>
                {/* Outer flame */}
                <div className="w-3 h-4 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full opacity-90 animate-pulse">
                  {/* Inner flame */}
                  <div className="absolute inset-0.5 bg-gradient-to-t from-red-400 via-orange-300 to-yellow-100 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}>
                    {/* Flame core */}
                    <div className="absolute inset-1 bg-gradient-to-t from-blue-400 via-white to-yellow-100 rounded-full opacity-80 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
                
                {/* Flame glow */}
                <div className="absolute inset-0 bg-yellow-300 rounded-full blur-sm opacity-50 animate-pulse"></div>
              </div>
              
              {/* Smoke effect */}
              {!isExploding && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-3 bg-gray-400 opacity-30 rounded-full animate-pulse blur-sm" style={{ animationDelay: `${index * 0.3}s` }}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Finalized Badge */}
        {isFinalized && !isCountdownExpired && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full p-2 shadow-lg animate-pulse">
            <Check className="w-4 h-4" />
          </div>
        )}

        {/* Explosion Effect */}
        {isExploding && !isJuly12th() && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`,
                }}
              >
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"></div>
              </div>
            ))}
            
            {/* Confetti */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`confetti-${i}`}
                className="absolute animate-bounce"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1}s`,
                  animationDuration: `${1 + Math.random() * 1}s`,
                }}
              >
                <div className={`w-2 h-2 ${['bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400'][Math.floor(Math.random() * 5)]} rounded-full`}></div>
              </div>
            ))}
          </div>
        )}

        {/* Special July 12th Wholesome Explosion */}
        {isExploding && isJuly12th() && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Heart explosion */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`heart-${i}`}
                className="absolute animate-bounce text-2xl"
                style={{
                  top: `${30 + Math.random() * 40}%`,
                  left: `${30 + Math.random() * 40}%`,
                  animationDelay: `${Math.random() * 0.8}s`,
                  animationDuration: `${1.5 + Math.random() * 1}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              >
                💖
              </div>
            ))}
            
            {/* Flower explosion */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`flower-${i}`}
                className="absolute animate-ping text-xl"
                style={{
                  top: `${25 + Math.random() * 50}%`,
                  left: `${25 + Math.random() * 50}%`,
                  animationDelay: `${Math.random() * 1}s`,
                  animationDuration: `${1 + Math.random() * 0.8}s`,
                }}
              >
                🌸
              </div>
            ))}
            
            {/* Sparkle explosion */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute animate-pulse text-lg"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 1.2}s`,
                  animationDuration: `${0.8 + Math.random() * 0.7}s`,
                }}
              >
                ✨
              </div>
            ))}
            
            {/* Rainbow confetti */}
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={`rainbow-${i}`}
                className="absolute animate-bounce"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1.5}s`,
                  animationDuration: `${1.2 + Math.random() * 1.3}s`,
                }}
              >
                <div className={`w-3 h-3 ${['bg-pink-400', 'bg-purple-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-orange-400'][Math.floor(Math.random() * 6)]} rounded-full shadow-lg`}></div>
              </div>
            ))}
            
            {/* Celebration text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="animate-bounce text-4xl font-bold text-white mb-2" style={{ animationDuration: '0.8s' }}>
                🎉 HAPPY JULY 12TH! 🎉
              </div>
              <div className="animate-pulse text-xl text-yellow-300 font-semibold">
                Your special day is here! 💕
              </div>
            </div>
            
            {/* Floating balloons */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`balloon-${i}`}
                className="absolute animate-float text-3xl"
                style={{
                  top: `${60 + Math.random() * 30}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                {['🎈', '🎀', '🌟', '💝'][Math.floor(Math.random() * 4)]}
              </div>
            ))}
            
            {/* Gentle glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-yellow-200/30 via-pink-200/20 to-transparent animate-pulse" />
          </div>
        )}

        {/* Finalize Animation */}
        {showFinalizeAnimation && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.3}s`,
                }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {!isOpen ? (
        <div className="text-center">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <ChefHat className="w-5 h-5" />
              <span>{isFinalized ? 'View Your Celebration Cake' : 'Build Your Celebration Cake'}</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </button>
          <p className="text-purple-200/60 text-sm mt-3">
            {isFinalized ? 'Your cake is ready for July 12th!' : 'Create a special cake for the big day!'}
          </p>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <ChefHat className="w-6 h-6 text-orange-300" />
              <h3 className="text-xl font-bold text-white">
                Virtual Cake Builder
                {isFinalized && <span className="ml-2 text-green-400 text-sm">✓ Finalized</span>}
              </h3>
            </div>
            <div className="flex space-x-2">
              {isFinalized && (
                <button
                  onClick={editCake}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-full transition-colors duration-200"
                  title="Edit Cake"
                >
                  <Edit3 className="w-4 h-4 text-blue-300" />
                </button>
              )}
              <button
                onClick={resetCake}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
                title="Reset Cake"
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cake Preview */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-4">Your Cake</h4>
              <div className="flex justify-center items-end h-48 relative">
                {renderCake()}
              </div>
              
              {/* Cake Description */}
              {isFinalized && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-white/80 text-sm">
                    <strong>Your Choice:</strong> {getCakeDescription()}
                  </p>
                </div>
              )}

              {isCountdownExpired && showFireworks && (
                <div className="mt-4 text-center">
                  {isJuly12th() ? (
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-yellow-300 animate-bounce">
                        🎂 CAKE CELEBRATION! 🎂
                      </p>
                      <p className="text-xl text-pink-300 animate-pulse">
                        Your special cake exploded with love! 💖
                      </p>
                      <p className="text-white/80 text-sm mt-2">The most wholesome explosion ever! 🌸✨</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-2xl font-bold text-yellow-300 animate-pulse">
                        🎉 Happy July 12th! 🎉
                      </p>
                      <p className="text-white/80 text-sm mt-2">Your cake is ready to celebrate!</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Customization Options or Finalized View */}
            <div className="space-y-6">
              {!isFinalized ? (
                <>
                  {/* Cake Base */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Cake Base</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {cakeBases.map((base) => (
                        <button
                          key={base.id}
                          onClick={() => setCake(prev => ({ ...prev, base: base.id }))}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                            cake.base === base.id
                              ? 'border-yellow-400 bg-white/20'
                              : 'border-white/20 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-center">
                            <span className="text-lg">{base.emoji}</span>
                            <p className="text-white text-xs mt-1">{base.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Frosting */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Frosting</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {frostings.map((frosting) => (
                        <button
                          key={frosting.id}
                          onClick={() => setCake(prev => ({ ...prev, frosting: frosting.id }))}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                            cake.frosting === frosting.id
                              ? 'border-yellow-400 bg-white/20'
                              : 'border-white/20 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-center">
                            <span className="text-lg">{frosting.emoji}</span>
                            <p className="text-white text-xs mt-1">{frosting.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Candles */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Candles</h4>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setCake(prev => ({ ...prev, candles: Math.max(1, prev.candles - 1) }))}
                        className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-200"
                      >
                        -
                      </button>
                      <span className="text-white font-semibold text-lg min-w-[2rem] text-center">
                        {cake.candles}
                      </span>
                      <button
                        onClick={() => setCake(prev => ({ ...prev, candles: Math.min(5, prev.candles + 1) }))}
                        className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Toppings */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Toppings</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {toppings.map((topping) => (
                        <button
                          key={topping.id}
                          onClick={() => toggleTopping(topping.id)}
                          className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                            cake.toppings.includes(topping.id)
                              ? 'border-yellow-400 bg-white/20'
                              : 'border-white/20 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-center">
                            <span className="text-sm">{topping.emoji}</span>
                            <p className="text-white text-xs mt-1">{topping.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Finalize Button */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={finalizeCake}
                      disabled={showFinalizeAnimation}
                      className={`w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                        showFinalizeAnimation ? 'animate-pulse scale-105' : 'hover:scale-105'
                      }`}
                    >
                      <Check className="w-5 h-5" />
                      <span>{showFinalizeAnimation ? 'Finalizing...' : 'Finalize My Cake Choice'}</span>
                    </button>
                    <p className="text-white/60 text-xs mt-2 text-center">
                      Your cake will be saved and ready for July 12th!
                    </p>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Check className="w-5 h-5 text-green-400" />
                      <h4 className="text-green-400 font-semibold">Cake Finalized!</h4>
                    </div>
                    <p className="text-white/80 text-sm mb-3">
                      Your perfect cake is ready for the celebration. It will be automatically saved and available whenever you visit this page.
                    </p>
                    <div className="bg-white/5 rounded p-3">
                      <p className="text-white/70 text-sm">
                        <strong>Your Final Choice:</strong><br />
                        {getCakeDescription()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-purple-200/80 text-sm">
                      Want to make changes? Click the edit button above.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Fireworks Effect */}
          {showFireworks && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-ping"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};