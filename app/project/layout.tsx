import { Suspense } from 'react';
import HeaderSecond from '../components/header/header-second';
import HeaderThird from '../components/header/header-third';

export default async function ProjectLayout({ children }: { children: React.ReactNode }) {
  let title = 'プロジェクト';
  return (
    <>
      <HeaderSecond title={'ppp'} />
      <HeaderThird />
      {children}
    </>
  );
}
