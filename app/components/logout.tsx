'use client';

import { FormEvent, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import type { Database } from '@/lib/database.types';
import { Button } from '@mui/material';

// ログアウト
const Logout = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 送信
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ログアウト
      const { error } = await supabase.auth.signOut();

      // エラーチェック
      if (error) {
        setMessage('エラーが発生しました。' + error.message);
        return;
      }

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
    <div>
      <div className="text-center mb-5">ログアウトしますか？</div>
      {/* ログアウトボタン */}
      <form onSubmit={onSubmit}>
        <div className="mb-5  text-center mx-auto">
          {loading ? (
            <Loading />
          ) : (
            <Button
              variant="contained"
              type="submit"
              className="font-bold hover:brightness-95 hover:bg-green-900 w-full p-2 text-sm bg-primary text-slate-100 rounded-lg"
            >
              ログアウト
            </Button>
          )}
        </div>
      </form>

      {message && <div className="my-5 text-center text-sm text-red-500">{message}</div>}
    </div>
  );
};

export default Logout;
