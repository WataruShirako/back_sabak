import HeaderSecond from '../components/header/header-second';
import Container from '@/app/components/mytasks/Container';

const page = () => {
  return (
    <>
      <HeaderSecond content={'自分のタスク'} />
      <div className="px-4 py-6">
        <Container />
      </div>
    </>
  );
};

export default page;
