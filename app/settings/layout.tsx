'use client';

import { useEffect, useState } from 'react';
import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  CreditCardIcon,
  ArrowLeftOnRectangleIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useStore from '@/store';
import ThemeButton from '@/app/components/ThemeButton';

// レイアウト
const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { user } = useStore();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (user.id) {
      setUserId(user.id);
    }
  }, [user]);

  // ナビゲーション
  const subNavigation = [
    {
      name: 'プロフィール',
      icon: UserCircleIcon,
      href: '/settings/profile',
    },
    {
      name: 'マイページ',
      icon: ComputerDesktopIcon,
      href: userId ? `/member/${userId}` : '/',
    },
    {
      name: 'メールアドレス',
      icon: EnvelopeIcon,
      href: '/settings/email',
    },
    {
      name: 'パスワード',
      icon: KeyIcon,
      href: '/settings/password',
    },
    {
      name: 'カスタマーポータル',
      icon: CreditCardIcon,
      href: '/settings/customer-portal',
    },
    {
      name: 'ログアウト',
      icon: ArrowLeftOnRectangleIcon,
      href: '/settings/logout',
    },
    {
      name: '完了したタスク',
      icon: ArrowLeftOnRectangleIcon,
      href: '/settings/completed',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-3 overflow-hidden">
      <div className="col-span-2 text-sm space-y-1 font-semibold hidden lg:flex fixed flex-col p-4 border-r h-[calc(100vh_-_80px)] overflow-y-hidden">
        {subNavigation.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              className={`${
                item.href == pathname && 'bg-gray-100 dark:bg-transparent text-slate-900'
              } hover:bg-gray-200 dark:hover:bg-gray-800 px-3 py-2 rounded-sm`}
            >
              <item.icon className="inline-block w-5 h-5 mr-2" />
              {item.name}
            </div>
          </Link>
        ))}
        <div className={'!mt-auto'}>
          <ThemeButton />
        </div>
      </div>
      <div className="lg:col-start-5 lg:col-end-11 flex flex-col mt-5">{children}</div>
    </div>
  );
};

export default SettingsLayout;
