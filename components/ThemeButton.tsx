'use client';

import { useTheme } from 'next-themes';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useEffect, useState } from 'react';
import { Switch } from '@mui/material';
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
    <div className="flex justify-start items-center gap-2">
      <div className="flex items-center p-2">
        <LightModeIcon className="w-5 h-5 dark:text-white text-primary" />
        <Switch onClick={handleSetTheme} color="default" />
        <DarkModeIcon className="w-5 h-5 dark:text-primary text-slate-1000" />
      </div>
    </div>
  );
}
