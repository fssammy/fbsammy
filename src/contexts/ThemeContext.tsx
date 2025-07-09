import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'default' | 'coral-reef';

interface ThemeContextType {
  theme: Theme;
  isTransitioning: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('default');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('july12th-theme') as Theme;
    // Only load saved theme if it exists, otherwise stay with default
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    if (newTheme === theme) return;
    
    setIsTransitioning(true);
    
    // Perfect timing for cinematic effect
    setTimeout(() => {
      setThemeState(newTheme);
      localStorage.setItem('july12th-theme', newTheme);
      
      // End transition after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200); // Perfect timing for all effects
    }, 200); // Small delay for effect buildup
  };

  const toggleTheme = () => {
    const newTheme = theme === 'default' ? 'coral-reef' : 'default';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, isTransitioning, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};