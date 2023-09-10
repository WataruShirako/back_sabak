'use client';

import { useSession } from 'next-auth/react';

export const User = () => {
  const { data: session } = useSession();
  // サーバーのセッションの場合はgetServerSessionを使う

  return (
    <>
      <h1>Client Session</h1>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
};
