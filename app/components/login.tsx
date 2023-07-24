'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Loading from '@/app/loading';
import * as z from 'zod';
import type { Database } from '@/lib/database.types';
import { Button } from '@mui/material';
type Schema = z.infer<typeof schema>;

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
  password: z.string().min(6, { message: '6文字以上入力する必要があります。' }),
});

// ログインページ
const Login = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { email: '', password: '' },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);

    try {
      // ログイン
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      // エラーチェック
      if (error) {
        setMessage('エラーが発生しました。' + error.message);
        return;
      }

      // ログイン成功でトップページに遷移
      router.push('/');
    } catch (error) {
      setMessage('エラーが発生しました。' + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <div className="text-center font-bold text-xl mb-10">ログイン</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* メールアドレス */}
        <div className="mb-3">
          <input
            type="email"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-primary dark:placeholder:opacity-40"
            placeholder="メールアドレス"
            id="email"
            {...register('email', { required: true })}
          />
          <div className="my-3 text-center text-sm !text-red-500">{errors.email?.message}</div>
        </div>

        {/* パスワード */}
        <div className="mb-5">
          <input
            type="password"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-primary dark:placeholder:opacity-40"
            placeholder="パスワード"
            id="password"
            {...register('password', { required: true })}
          />
          <div className="my-3 text-center text-sm !text-red-500">{errors.password?.message}</div>
        </div>

        {/* ログインボタン */}
        <div className="mb-5 text-center mx-auto">
          {loading ? (
            <Loading />
          ) : (
            <Button
              type="submit"
              className="font-bold bg-primary disableElevation hover:bg-green-900 hover:brightness-90 w-72 m-auto text-slate-100"
            >
              ログイン
            </Button>
          )}
        </div>
      </form>

      {message && <div className="my-5 text-center text-sm !text-red-500">{message}</div>}

      <div className="text-center text-sm mb-5">
        <Link href="/auth/reset-password" className="text-gray-800 dark:text-gray-700 font-bold">
          パスワードを忘れた方はこちら
        </Link>
      </div>

      <div className="text-center text-sm">
        <Link href="/auth/signup" className="text-gray-800 dark:text-gray-700 font-bold">
          アカウントを作成する
        </Link>
      </div>
    </div>
  );
};

export default Login;
