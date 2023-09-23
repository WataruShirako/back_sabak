import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const supabaseServerComponent = createServerComponentClient<Database>({
  cookies,
});

export const supabaseSignIn = async () => {
  'use server';

  const response = await supabaseServerComponent.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  });

  const session = await supabaseServerComponent.auth.getSession();
  const user = await supabaseServerComponent.auth.getUser();

  if (user && user.data.user?.id && user.data.user?.email) {
    const { data, error } = await supabaseServerComponent.from('m_user').upsert({
      id: user.data.user?.id,
      email: user.data.user?.email,
      name: user.data.user?.user_metadata.name,
    });

    if (error) {
      console.error('Error inserting additional data:', error);
    }

    return { session, user, response };
  }
};

export const supabaseSignOut = async () => {
  'use server';
  return await supabaseServerComponent.auth.signOut();
};

export const getSupabaseSession = async () => {
  'use server';

  const {
    data: { session },
  } = await supabaseServerComponent.auth.getSession();
  return session;
};

export const getUser = async () => {
  'use server';

  const {
    data: { user },
  } = await supabaseServerComponent.auth.getUser();
  return user;
};

export const getCurrentUserId = async () => {
  'use server';

  const session = await getSupabaseSession();
  return session?.user?.id;
};

// 認証状態の監視
export const SupabaseListener = async () => {
  'use server';
  const supabase = createServerComponentClient<Database>({ cookies });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // プロフィールの取得
  let profile = null;

  if (session) {
    const { data: currentProfile } = await supabase
      .from('m_user')
      .select('*')
      .eq('id', session.user.id)
      .single();

    profile = currentProfile;

    // メールアドレスを変更した場合、プロフィールを更新
    if (currentProfile && currentProfile.email !== session.user.email) {
      // メールアドレスを更新
      const { data: updatedProfile } = await supabase
        .from('m_user')
        .update({ email: session.user.email })
        .match({ id: session.user.id })
        .select('*')
        .single();

      profile = updatedProfile;
    }
  }

  return { session, profile };
};
