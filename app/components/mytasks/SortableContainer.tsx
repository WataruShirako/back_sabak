import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { Plus } from 'lucide-react';
import { MoreHoriz } from '@mui/icons-material';

const SortableContainer = ({
  id,
  items,
  label,
}: {
  id: string;
  items: string[];
  label: string;
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <div className={'w-64'}>
      <h3 className="text-base font-medium text-left px-3 flex items-center justify-between">
        {label}
        <div className={'flex items-center gap-2.5'}>
          <button>
            <Plus className=" w-5 h-5 text-gray-500" />
          </button>
          <button>
            <MoreHoriz className=" w-5 h-5 text-gray-500" />
          </button>
        </div>
      </h3>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        <div ref={setNodeRef} className="w-full px-3 py-4 ">
          {items.map((id: string) => (
            <SortableItem key={id} id={id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default SortableContainer;
