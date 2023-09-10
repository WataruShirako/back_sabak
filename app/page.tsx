import { LoginButton, LogoutButton, ProfileButton, RegisterButton } from '@/app/components/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { User } from '@/components/user.component';
import { useSession } from 'next-auth/react';

export default async function Home() {
  const session = await getServerSession(authOptions);
  // const { data: session } = useSession();
  //
  return (
    <main>
      <div>
        <LoginButton />
        <LogoutButton />
        <h1>Server Session</h1>
        <pre>{JSON.stringify(session)}</pre>
        <User />
      </div>
    </main>
  );
}
