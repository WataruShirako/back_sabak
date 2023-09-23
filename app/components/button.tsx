'use client';

import Link from 'next/link';
import { supabaseSignOut } from '../utils/supabase/controller/supabaseServer';
import {
  clientSignInWithOAuthGoogle,
  clientSignOut,
} from '../utils/supabase/controller/supabaseClient';
import useAuth from '../hooks/useAuth';

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
  const signout = useAuth();
  return (
    <button style={{ marginRight: 10 }} onClick={() => signout}>
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
