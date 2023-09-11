import HeaderSecond from '../components/header/header-second';
import Container from '@/app/components/mytasks/Container';

const page = () => {
  const title = '自分のタスク';
  return (
    <>
      <HeaderSecond title={title} />
      <div className="px-4 py-6">
        <Container />
      </div>
    </>
  );
};

export default page;
