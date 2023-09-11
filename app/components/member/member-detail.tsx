'use client';

import { useEffect, useState } from 'react';
import { DocumentTextIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { SubscriptionType, MembershipType } from '@/app/types/types';
import Image from 'next/image';
import Link from 'next/link';
import MembershipDetail from '@/app/components/membership/membership-detail';
import useStore from '@/store/userStore';

// メンバー詳細
const MemberDetail = ({
  memberId,
  memberships,
}: {
  memberId: string;
  memberships: MembershipType[] | null;
  subscriptions: SubscriptionType[] | null;
}) => {
  const [tab, setTab] = useState('post');
  const [userId, setUserId] = useState('');
  const { user } = useStore();

  // ユーザーIDをセット
  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  return (
    <div className={'max-w-screen-lg m-auto p-5'}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-5">
          <p></p>
        </div>
        <div>
          <div
            className="bg-red-500 text-slate-200 rounded-lg px-5 py-2 text-sm font-bold cursor-pointer"
            onClick={() => setTab('membership')}
          >
            メンバーになる
          </div>
        </div>
      </div>
      <div className="mb-5">{/* <div>{profile.introduce}</div> */}</div>

      <div className="flex items-center justify-between border-b mb-5">
        {/* タブ */}
        <div className="flex text-sm text-center">
          <div className="mr-2">
            <div
              className={`${
                tab === 'post' && 'text-primary font-bold'
              } flex p-4 border-b-2 border-transparent hover:border-primary cursor-pointer`}
              onClick={() => setTab('post')}
            >
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              投稿
            </div>
          </div>
          <div className="mr-2">
            <div
              className={`${
                tab === 'membership' && 'text-primary font-bold'
              } flex p-4 border-b-2 border-transparent hover:border-primary cursor-pointer`}
              onClick={() => setTab('membership')}
            >
              <UserGroupIcon className="w-5 h-5 mr-2" />
              メンバーシップ
            </div>
          </div>
          <div className="mr-2">
            <div
              className={`${
                tab === 'task' && 'text-primary font-bold'
              } flex p-4 border-b-2 border-transparent hover:border-primary cursor-pointer`}
              onClick={() => setTab('task')}
            >
              <UserGroupIcon className="w-5 h-5 mr-2" />
              新規タスク
            </div>
          </div>
        </div>

        <div className="bg-primary text-slate-200 rounded-lg px-5 py-2 text-sm font-bold">
          {tab === 'post' ? (
            <Link href="/post/new">新規投稿</Link>
          ) : tab === 'membership' ? (
            <Link href="/membership/new">新規メンバーシップ</Link>
          ) : tab === 'task' ? (
            <Link href="/tasks/new">新規タスク</Link>
          ) : (
            <></>
          )}
        </div>
      </div>

      {tab === 'post' ? (
        <div></div>
      ) : tab === 'membership' ? (
        <MembershipDetail memberships={memberships} memberId={memberId} />
      ) : tab === 'task' ? (
        <div></div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MemberDetail;
