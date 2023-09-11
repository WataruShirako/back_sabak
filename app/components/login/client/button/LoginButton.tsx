'use client';

import { clientSignInWithOAuthGoogle } from '@/app/utils/supabase/controller/supabaseClient';
import { FunctionComponent } from 'react';

export const LoginButton: FunctionComponent = () => {
  return (
    <>
      <button
        onClick={async () => {
          await clientSignInWithOAuthGoogle();
        }}
      >
        <h2>ログイン</h2>
      </button>
    </>
  );
};
