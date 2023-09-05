'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useStore from '@/store';
import ThemeButton from '@/app/components/ThemeButton';
import { Box, CheckCircle2Icon, LucideMenu, MessageSquareIcon, Plus, Sprout } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useStore();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (user.id) {
      setUserId(user.id);
    }
  }, [user]);
  // ナビゲーション
  const subNavigation1 = [
    {
      name: 'ダッシュボード',
      icon: Box,
      href: '/',
    },
    {
      name: '自分のタスク',
      icon: CheckCircle2Icon,
      href: '/mytasks',
    },
    {
      name: 'メッセージ',
      icon: MessageSquareIcon,
      href: userId ? `/member/${userId}` : '/',
    },
  ];

  const project = [
    {
      name: 'Sabak開発',
      href: '/project/',
    },
    {
      name: '10%',
      href: '/project/',
    },
  ];

  return (
    <>
      <div className={'p-[10px]'}>
        {subNavigation1.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              className={`${
                item.href == pathname && 'bg-gray-100 dark:bg-[#232323] text-gray-700'
              } hover:bg-gray-100 dark:hover:bg-[#232323] px-3 py-2 rounded-sm`}
            >
              <item.icon
                className={`${
                  item.href == pathname && 'text-gray-700'
                } inline-block w-4 h-4 mr-2 text-gray-500`}
              />
              {item.name}
            </div>
          </Link>
        ))}
      </div>

      <details className={'p-[10px] border-t group'} open>
        <summary
          className={
            'px-3 py-2 font-semibold list-none flex items-center justify-between cursor-pointer'
          }
        >
          プロジェクト
          <Plus className={'w-4 h-5 text-gray-500 group-open:rotate-45 transition'} />
        </summary>
        {project.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              className={`${
                item.href == pathname && 'bg-gray-100 dark:bg-[#232323] text-gray-500'
              } hover:bg-gray-100 dark:hover:bg-[#232323] px-3 py-2 rounded-sm`}
            >
              <Sprout
                className={`${
                  item.href == pathname && 'text-amber-300'
                } inline-block w-4 h-4 mr-2 text-gray-500`}
              />
              {item.name}
            </div>
          </Link>
        ))}
      </details>

      <div className={'!mt-auto'}>
        <ThemeButton />
      </div>
    </>
  );
};

export default Sidebar;
