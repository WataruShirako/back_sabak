'use client';

import { FunctionComponent } from 'react';
import { supabaseSignIn } from '../utils/supabase/controller/supabaseServer';
import { clientSignOut } from '../utils/supabase/controller/supabaseClient';

export const LoginButton: FunctionComponent = () => {
  return (
    <>
      <button
        onClick={async () => {
          await supabaseSignIn();
        }}
      >
        <h2>ログイン</h2>
      </button>
    </>
  );
};

export const LogoutButton: FunctionComponent = () => {
  return (
    <>
      <button
        onClick={async () => {
          await clientSignOut();
        }}
      >
        <h2>ログアウト</h2>
      </button>
    </>
  );
};
