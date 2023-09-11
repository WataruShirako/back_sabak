import HeaderSecond from './components/header/header-second';
import Calender from './components/calender/Calender';
import { getSupabaseSession } from './utils/supabase/controller/supabaseServer';
import LoginPageComponent from './components/login/client/LoginPageComponent';
import { LogoutButton } from './components/login/client/button/LogoutButton';

export default async function Home() {
  const session = await getSupabaseSession();
  const userName = `${session?.user.user_metadata.full_name}さん、こんにちは`;

  return (
    <main>
      <HeaderSecond title={userName} />
      <Calender />
    </main>
  );
}
