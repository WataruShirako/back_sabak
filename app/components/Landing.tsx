import { Button } from '@mui/material';

const Landing = () => {
  return (
    <section className={'text-center'}>
      <h2>
        華麗に
        <br />
        タスクを
        <br />
        <span>さばく</span>
      </h2>
      <div className="">
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
      <Button
        variant="contained"
        className="bg-primary disableElevation hover:bg-green-900 hover:brightness-90 w-72"
      >
        早速始める
      </Button>
    </section>
  );
};

export default Landing;
