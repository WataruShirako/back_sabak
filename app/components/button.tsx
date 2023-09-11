'use client';

import Link from 'next/link';
import {
  clientSignInWithOAuthGoogle,
  clientSignOut,
} from '../utils/supabase/controller/supabaseClient';
import { supabaseSignOut } from '../utils/supabase/controller/supabaseServer';

export const LoginButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => clientSignInWithOAuthGoogle()}>
      Sign in
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/auth/signup" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => clientSignOut()}>
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
