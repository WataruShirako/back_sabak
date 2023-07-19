import Link from 'next/link';

const Promote = () => {
  return (
    <Link href="/auth/login" className={'underline text-sky-400'}>
      ログインしよう！
    </Link>
  );
};

export default Promote;
