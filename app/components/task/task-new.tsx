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
  membership: z.string(),
});

const TaskNew = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [fileMessage, setFileMessage] = useState('');
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
      membership: '',
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 画像アップロード
  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileMessage('');

    // ファイルが選択されていない場合
    if (!files || files?.length == 0) {
      setFileMessage('画像をアップロードしてください。');
      return;
    }

    const fileSize = files[0]?.size / 1024 / 1024; // size in MB
    const fileType = files[0]?.type; // MIME type of the file

    // 画像サイズが2MBを超える場合
    if (fileSize > 2) {
      setFileMessage('画像サイズを2MB以下にする必要があります。');
      return;
    }

    // ファイル形式がjpgまたはpngでない場合
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      setFileMessage('画像はjpgまたはpng形式である必要があります。');
      return;
    }

    // 画像をセット
    setImage(files[0]);
  }, []);

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      // ユーザーIDが取得できない場合、処理を終了
      if (!user.id) {
        return;
      }

      let image_url = '';

      if (image) {
        // supabaseストレージに画像アップロード
        const { data: storageData, error: storageError } = await supabase.storage
          .from('posts')
          .upload(`${user.id}/${uuidv4()}`, image);

        // エラーチェック
        if (storageError) {
          setMessage('画像アップロードにエラーが発生しました。' + storageError.message);
          return;
        }

        // 画像のURLを取得
        const { data: urlData } = await supabase.storage
          .from('posts')
          .getPublicUrl(storageData.path);

        image_url = urlData.publicUrl;
      }

      // 新規投稿
      const { error: insertError } = await supabase.from('posts').insert({
        profile_id: user.id,
        title: data.title,
        content: data.content,
        membership_id: data.membership ? data.membership : null,
        image_url,
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
      router.refresh();
    }
  };

  return (
    <form className="mb-4 space-y-3">
      <input
        type="text"
        className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
      />
      <Button
        variant="contained"
        className="w-full px-4 py-2 text-white bg-primary hover:bg-green-800"
        disableElevation
      >
        Add Task
      </Button>
    </form>
  );
};

export default TaskNew;
