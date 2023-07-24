import { Button } from '@mui/material';
import Link from 'next/link';
import ThemeButton from './ThemeButton';

const Landing = () => {
  return (
    <>
      <section className={'text-center mt-12'}>
        <h2 className="text-5xl md:text-7xl font-bold leading-snug">
          華麗に
          <br />
          タスクを
          <br />
          <span className="bg-gradient-to-tr from-lime-300 to-green-700 bg-clip-text text-transparent">
            さばく
          </span>
        </h2>
        <div className="mt-12 text-sm">
          <p>
            たくさんのタスクを抱えている、
            <br className={'lg:hidden'} />
            働き者のあなたの為のアプリです。
            <br />
            Sabakは、今取り組むべき業務を見逃しません。
            <br />
            さらに、チームであなたのタスクを共有し、
            <br className={'lg:hidden'} />
            ひとりで抱えるストレスから解放されましょう。
          </p>
        </div>
        <Link href={'/auth/signup'}>
          <Button
            disableElevation
            className="bg-primary hover:bg-green-900 hover:brightness-90 w-72 text-slate-100 font-semibold mt-12"
          >
            早速始める
          </Button>
        </Link>
        <ThemeButton />
      </section>
      <div></div>
    </>
  );
};

export default Landing;
