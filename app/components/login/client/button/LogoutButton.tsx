'use client';

import { clientSignOut } from '@/app/utils/supabase/controller/supabaseClient';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();
  return (
    <button
      style={{ marginRight: 10 }}
      onClick={async () => {
        await clientSignOut();
        router.replace('/');
      }}
    >
      Sign Out
    </button>
  );
};
