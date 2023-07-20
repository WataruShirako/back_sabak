import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Noto_Sans_JP } from 'next/font/google';
import SupabaseListener from '../components/supabase-listener';

const montserrat = Montserrat({ subsets: ['latin'] });
const notoSansJp = Noto_Sans_JP({ subsets: ['latin'] });

import { StyledEngineProvider } from '@mui/material/styles';

import Providers from '../components/Providers';
import ThemeButton from '../components/ThemeButton';

export const metadata: Metadata = {
  title: 'sabak',
  description: 'タスクを華麗にさばくためのアプリ。もう、見逃さない。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${notoSansJp.className} ${montserrat.className}`}>
        <StyledEngineProvider injectFirst>
          <Providers>
            <div className="flex flex-col min-h-screen">
              <SupabaseListener />

              <main className="flex-1 container max-w-screen-sm mx-auto px-1 py-5">{children}</main>
              <footer className="py-5">
                <div className="text-center text-sm">Copyright © All rights reserved | Sabak</div>
                <ThemeButton />
              </footer>
            </div>
          </Providers>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
