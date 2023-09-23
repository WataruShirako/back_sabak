import HeaderSecond from './components/header/header-second';
import Calender from './components/calender/Calender';
import { LoginButton } from './components/button';
import { SupabaseListener } from './utils/supabase/controller/supabaseServer';

export default async function Home() {
  const session = await SupabaseListener();
  console.log('セッション情報はこちら', session.session?.user);

  return (
    <main>
      <HeaderSecond title={session.session?.user.user_metadata.name} />
      <Calender />
      <LoginButton />
    </main>
  );
}
