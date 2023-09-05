import { UniqueIdentifier } from '@dnd-kit/core';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { CheckCircle2 } from 'lucide-react';

const Item = ({ id }: { id: UniqueIdentifier }) => {
  return (
    <div className="w-full h-32 py-5 px-2.5 my-2 dark:bg-gray-900 shadow rounded-lg">
      <div className="title flex items-center justify-start gap-2.5">
        <button className={'text-gray-500/30 hover:text-amber-300/100 transition'}>
          <CheckCircle2 className={'w-6 h-6 '} />
        </button>
        <h2>{`${id}`}</h2>
      </div>
      <div className="flex items-center justify-start gap-2 mt-2.5">
        <span className="status text-xs py-1 px-2 bg-lightBlue-700 text-white rounded-sm">
          順調
        </span>
        <span className="priority text-xs py-1 px-2 bg-red-700 text-white rounded-full">
          最優先
        </span>
      </div>
      <div className="flex items-center justify-between mt-2.5">
        <span className={'text-sm text-gray-700'}>9月5日 - 7日</span>
        <Avatar className={'w-6 h-6'}>
          <AvatarImage
            src={'/default.png'}
            className="rounded-full object-cover w-6 h-6"
            alt="avatar"
          />
        </Avatar>
      </div>
    </div>
  );
};
export default Item;
