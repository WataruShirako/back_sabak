'use client';

import { useCallback, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '@/app/loading';
import useStore from '@/store';
import axios from 'axios';
import * as z from 'zod';
import type { Database } from '@/lib/database.types';
import { Button } from '@mui/material';
type Schema = z.infer<typeof schema>;

// 入力データの検証ルールを定義
const schema = z.object({
  title: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  content: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  expired: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
});

const TaskNew = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { user } = useStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: {
      title: '',
      content: '',
      member: '',
      category: '',
      expired: '',
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage('ロード中...');

    try {
      // ユーザーIDが取得できない場合、処理を終了
      if (!user.id) {
        console.log('ユーザーIDがありません');
        return;
      }

      // 新規投稿
      const { error: insertError } = await supabase.from('todos').insert({
        user_id: user.id,
        title: data.title,
        content: data.content,
        expired: data.content,
      });

      // エラーチェック
      if (insertError) {
        setMessage('新規投稿にエラーが発生しました。' + insertError.message);
        return;
      }

      router.push('/member/' + user.id);
    } catch (error) {
      setMessage('エラーが発生しました。' + error);
      return;
    } finally {
      setLoading(false);
      console.log('送信成功');
      router.refresh();
    }
  };

  return (
    <form className="mb-4 space-y-3 max-w-screen-md" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:border-primary placeholder:opacity-50"
        placeholder="タイトル"
        id="title"
        {...register('title', { required: true })}
        required
      />
      <textarea
        className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-primary placeholder:opacity-50"
        placeholder="内容"
        id="content"
        {...register('content', { required: true })}
        rows={5}
      />
      {loading ? (
        <Loading />
      ) : (
        <Button
          variant="contained"
          className="w-full px-4 py-2 text-white bg-primary hover:bg-green-800"
          disableElevation
        >
          Add Task
        </Button>
      )}
    </form>
  );
};

export default TaskNew;
