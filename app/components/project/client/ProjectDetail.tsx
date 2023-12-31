'use client';

import { useEffect, useState } from 'react';
import { DocumentTextIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import {
  PostWithProfileType,
  ProfileType,
  SubscriptionType,
  MembershipType,
  PostWithTaskType,
} from '@/app/types/types';
import useStore from '@/store/userStore';
import TaskItem from '../../task/task-item';
import MembershipDetail from '../../membership/membership-detail';
import PostItem from '../../post/post-item';
import Link from 'next/link';
import Image from 'next/image';

// 投稿詳細
const ProjectDetail = ({
  posts,
  tasks,
  memberId,
  memberships,
  profile,
  subscriptions,
}: {
  posts: PostWithProfileType[] | null;
  tasks: PostWithTaskType[] | null;
  memberId: string;
  memberships: MembershipType[] | null;
  profile: ProfileType;
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
          <div className="relative w-20 h-20">
            <Image
              src={profile.avatar_url ? profile.avatar_url : '/default.png'}
              className="rounded-full object-cover"
              alt="avatar"
              fill
            />
          </div>
          <div>
            <div className="font-bold text-xl">{profile.name}</div>
          </div>
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
      <div className="mb-5">
        <div>{profile.introduce}</div>
      </div>

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

        {userId === profile.id && (
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
        )}
      </div>

      {tab === 'post' ? (
        <div>
          {posts && posts.length !== 0 ? (
            <div>
              {posts.map((post, index) => {
                const isSubscriber = true;
                post.membership_id === null || userId === post.profile_id
                  ? true
                  : subscriptions!.some(
                      (item) =>
                        item.membership_id === post.membership_id &&
                        new Date(item.current_period_end!) >= new Date()
                    );

                return <PostItem key={index} post={post} isSubscriber={isSubscriber} />;
              })}
            </div>
          ) : (
            <div className="text-center">投稿はありません</div>
          )}
        </div>
      ) : tab === 'membership' ? (
        <MembershipDetail memberships={memberships} memberId={memberId} />
      ) : tab === 'task' ? (
        <div>
          {tasks && tasks.length !== 0 ? (
            <div className="flex mt-5 gap-2 flex-wrap">
              {tasks.map((task, index) => {
                return <TaskItem key={index} task={task} />;
              })}
            </div>
          ) : (
            <div className="text-center">投稿はありません</div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProjectDetail;
