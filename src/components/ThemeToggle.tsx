import React from 'react';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button 
      className="theme-toggle" 
      onClick={onToggle}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
    </button>
  );
};

export default ThemeToggle;