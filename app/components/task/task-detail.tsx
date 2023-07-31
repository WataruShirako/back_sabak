'use client';

import { format } from 'date-fns';
import { PostWithTaskType } from '@/app/components/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '@/app/loading';
import * as z from 'zod';
import type { Database } from '@/lib/database.types';
import useStore from '@/store';
import { useState } from 'react';
import { Avatar, AvatarGroup, Button } from '@mui/material';
type Schema = z.infer<typeof schema>;

import EditIcon from '@mui/icons-material/Edit';

// 入力データの検証ルールを定義
const schema = z.object({
  title: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  content: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
});

// タスク詳細
const TaskDetail = ({ task }: { task: PostWithTaskType }) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [fileMessage, setFileMessage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/default.png');
  const { user } = useStore();

  // タイトルを編集する関数
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: {
      title: task.title ? task.title : '',
      content: task.content ? task.content : '',
      expired: task.expired ? task.expired : '',
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  const editText = () => {
    setIsEditing(true);
  };

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      // let is_complete;
      // let prioroty;
      // let expired;

      // taskアップデート
      const { error: updateError } = await supabase
        .from('todos')
        .update({
          content: data.content,
          title: data.title,
        })
        .eq('id', task.id);

      // エラーチェック
      if (updateError) {
        setMessage('エラーが発生しました。' + updateError.message);
        return;
      }

      setMessage('タスクを更新しました。');
    } catch (error) {
      setMessage('エラーが発生しました。' + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="max-w-screen-md mx-auto mt-32">
      <Button>←前に戻る</Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="inline-flex items-center space-x-2 mb-5">
            <div>
              <div className="text-sm text-gray-500">
                期限：{format(new Date(task.expired), 'yyyy/MM/dd')}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center space-x-1">
          <div className="font-bold text-lg md:text-2xl flex items-center gap-2">
            {isEditing ? (
              <input
                type="text"
                className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:border-primary placeholder:opacity-50"
                {...register('title', { required: true })}
                required
              />
            ) : (
              <p>{task.title}</p>
            )}
            <div onClick={editText} className="cursor-pointer">
              <EditIcon />
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2">
          <div className="flex items-center space-x-1">
            <p>メンバー：</p>
            <div>
              <AvatarGroup>
                <Avatar sx={{ width: 28, height: 28 }}>H</Avatar>
                <Avatar sx={{ width: 28, height: 28 }}>H</Avatar>
              </AvatarGroup>
            </div>
          </div>
          <div>
            <EditIcon />
          </div>
        </div>

        <textarea
          className="block border rounded-lg w-full py-2 px-3 focus:outline-none focus:border-primary placeholder:opacity-30 mb-5"
          placeholder="タスクの詳細を入力してください。"
          id="introduce"
          {...register('content')}
          rows={5}
        />
        {/* 変更ボタン */}
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <>
              <Button
                variant="contained"
                type="submit"
                className="font-bold bg-primary hover:bg-primary text-slate-100 w-full rounded-lg p-2 text-sm"
              >
                更新
              </Button>
              <Button
                variant="outlined"
                type="submit"
                className="font-bold border-primary focus:bg-primary focus:bg-opacity-20 hover:border-primary hover:bg-opacity-20 text-slate-100 w-full rounded-lg p-2 text-sm mt-4"
              >
                このタスクを完了させる
              </Button>
            </>
          )}
        </div>
        <div>
          <div className="text-sm text-gray-500">
            作成日：{format(new Date(task.inserted_at), 'yyyy/MM/dd HH:mm')}
          </div>
        </div>
      </form>
      {/* メッセージ */}
      {message && <div className="my-5 text-center !text-red-500 mb-5">{message}</div>}
    </div>
  );
};

export default TaskDetail;
