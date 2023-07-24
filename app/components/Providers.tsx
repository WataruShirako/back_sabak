'use client';
import React from 'react';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  // ダークモード適用のプロバイダー
  return (
    <>
      <ThemeProvider defaultTheme="system" enableSystem attribute="class">
        {children}
      </ThemeProvider>
    </>
  );
}
