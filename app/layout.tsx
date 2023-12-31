import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/app/providers/themeProvider';
import Sidebar from '@/app/components/sidebar/sidebar';
import GetHeader from './components/header/server/GetHeader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'sabak',
  description: 'タスクを華麗にさばくためのアプリ。もう、見逃さない。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GetHeader />
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 pt-12 lg:px-0">
              <>
                <div className="col-span-2 text-sm space-y-1 font-medium text-gray-500 hidden lg:flex fixed flex-col border-r h-[calc(100vh_-_48px)] w-60 overflow-y-hidden z-50">
                  <Sidebar />
                </div>
                <div className="lg:pl-60 flex flex-col relative">{children}</div>
              </>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
