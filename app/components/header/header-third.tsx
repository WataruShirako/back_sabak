import {
  Banana,
  Calendar,
  File,
  FolderTree,
  LineChart,
  ListChecks,
  Paperclip,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

const HeaderThird = () => {
  const ProjectHeaderThird = [
    {
      icon: FolderTree,
      name: 'WBS',
      href: '/wbs',
    },
    {
      icon: LineChart,
      name: 'Gantt',
      href: '/gantt',
    },
    {
      icon: Calendar,
      name: 'カレンダー',
      href: '/project',
    },
    {
      icon: Banana,
      name: 'リソース',
      href: '/project',
    },
    {
      icon: ListChecks,
      name: 'タスク',
      href: '/mytasks',
    },
    {
      icon: Banana,
      name: 'チャート',
      href: '/project',
    },
    {
      icon: Paperclip,
      name: 'ドキュメント',
      href: '/project',
    },
    {
      icon: File,
      name: 'ファイル',
      href: '/project',
    },
    {
      icon: Settings,
      name: '設定',
      href: '/project',
    },
  ];
  return (
    <>
      <div
        className={
          'w-full px-4 mt-16 h-10 border-b dark:bg-[#1c1c1c] fixed z-10 flex items-center justify-between'
        }
      >
        <div className={'text-[13px] font-medium flex items-center gap-5'}>
          {ProjectHeaderThird.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className={'rounded-sm text-gray-700  hover:text-gray-500 transition p-1'}
            >
              <h2 className={' flex item-center gap-0.5 leading-[1.4]'}>
                <item.icon className={'w-4 h-4'} />
                {item.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16"></div>
    </>
  );
};

export default HeaderThird;
