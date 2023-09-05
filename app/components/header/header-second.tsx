const HeaderSecond = ({ content }: { content: string }) => {
  return (
    <>
      <div
        className={
          'w-full px-4 h-16 border-b dark:bg-[#1c1c1c] fixed z-10 flex items-center justify-between'
        }
      >
        <h1 className={'text-2xl font-medium'}>{content}</h1>
      </div>
      <div className="mt-16"></div>
    </>
  );
};

export default HeaderSecond;
