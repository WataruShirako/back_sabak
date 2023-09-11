import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Router from 'next/router';

export const supabaseClientComponent = createClientComponentClient();

export const clientSignInWithOAuthGoogle = () => {
  return supabaseClientComponent.auth.signInWithOAuth({
    provider: 'google',
  });
};

export const clientSignOut = () => {
  return supabaseClientComponent.auth.signOut();
};
