import Link from 'next/link';
import ThemeButton from '@/app/components/ThemeButton';
import { Box, CheckCircle2Icon, MessageSquareIcon, Plus, Sprout } from 'lucide-react';
import ProjectList from './client/ProjectList';
import GetProject from './server/GetProject';

const Sidebar = () => {
  const pathname = '';

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
      href: '/',
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

      <div className={'p-[10px] border-t group overflow-y-scroll'}>
        <h3
          className={
            'px-3 py-2 font-semibold list-none flex items-center justify-between cursor-pointer'
          }
        >
          プロジェクト
        </h3>
        <ProjectList>
          <GetProject pathname={pathname} />
        </ProjectList>
      </div>

      <div className={'!mt-auto'}>
        <ThemeButton />
      </div>
    </>
  );
};

export default Sidebar;
