import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Noto_Sans_JP } from 'next/font/google';
import SupabaseListener from './components/supabase-listener';

const montserrat = Montserrat({ subsets: ['latin'] });
const notoSansJp = Noto_Sans_JP({ subsets: ['latin'] });

import { StyledEngineProvider } from '@mui/material/styles';

import Providers from './components/Providers';
import ThemeButton from './components/ThemeButton';

export const metadata: Metadata = {
  title: 'sabak',
  description: 'タスクを華麗にさばくためのアプリ。もう、見逃さない。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${notoSansJp.className} ${montserrat.className}`}>
        <Providers>
          <StyledEngineProvider injectFirst>
            <div className="flex flex-col min-h-screen">
              <SupabaseListener />
              <main className="flex-1 p-5 pt-20 lg:px-0">{children}</main>
            </div>
          </StyledEngineProvider>
        </Providers>
      </body>
    </html>
  );
}
