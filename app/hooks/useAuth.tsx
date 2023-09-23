'use client';

import { useRouter } from 'next/navigation';
import { supabaseClientComponent } from '../utils/supabase/controller/supabaseClient';

const useAuthSignOut = () => {
  const router = useRouter();

  supabaseClientComponent.auth.signOut();
  router.refresh();
};

export default useAuthSignOut;
