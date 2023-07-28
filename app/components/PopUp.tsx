import { ComputerDesktopIcon, UserCircleIcon } from '@heroicons/react/24/outline';

// ナビゲーション
const topNavigation = [
  {
    name: '最近のタスク',
    icon: UserCircleIcon,
    href: '/settings/profile',
  },
  {
    name: '新規追加',
    icon: ComputerDesktopIcon,
    href: '/settings/email',
  },
];
const PopUp = () => {
  return {
    /* {!session ? null : (
        // ポップアップリンク
        <div className="fixed bottom-4 left-4 bg-green-800 p-2 rounded-lg z-50 shadow-sm">
          {topNavigation.map((item, index) => (
            <Link href={item.href} key={index}>
              <div
                className={`hover:bg-green-700 px-4 py-3 rounded-lg text-gray-100 font-semibold`}
              >
                <item.icon className="inline-block w-5 h-5 mr-2" />
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      )} */
  };
};

export default PopUp;
