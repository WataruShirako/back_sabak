'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';

export const supabaseClientComponent = createClientComponentClient();

export const clientSignInWithOAuthGoogle = async () => {
  const response = await supabaseClientComponent.auth.signInWithOAuth({
    provider: 'google',
  });

  // 認証後のセッションやユーザー情報を取得
  const session = await supabaseClientComponent.auth.getSession();
  const user = await supabaseClientComponent.auth.getUser();

  if (user) {
    // ユーザー情報をデータベースに保存
    const { data, error } = await supabaseClientComponent.from('m_user').upsert({
      id: user.data.user?.id,
      email: user.data.user?.email,
      name: user.data.user?.user_metadata.name,
    });

    if (error) {
      console.error('Error inserting additional data:', error);
    }
  }

  return { session, user, response };
};

export const clientSignOut = () => {
  return supabaseClientComponent.auth.signOut();
};
