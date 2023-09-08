import HeaderSecond from '../components/header/header-second';
import HeaderThird from '../components/header/header-third';
import { ProjectColumnsType, ProjectType } from '../types/project_database';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderSecond />
      <HeaderThird />
      {children}
    </>
  );
}
