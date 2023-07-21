'use client';

import { useTheme } from 'next-themes';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useEffect, useState } from 'react';
export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const handleSetTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      The current theme is: {theme}
      <button className="block p-1 bg-black dark:bg-white rounded-full" onClick={handleSetTheme}>
        {theme === 'light' ? (
          <DarkModeIcon className="w-5 h-5 text-white" />
        ) : (
          <LightModeIcon className="w-5 h-5 text-black" />
        )}
      </button>
    </div>
  );
}
