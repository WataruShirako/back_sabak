// Zustand Reactの状態管理ライブラリ
// https://github.com/pmndrs/zustand
import { create } from 'zustand';
import type { Database } from '@/lib/database.types';
type TaskType = Database['public']['Tables']['todos']['Row'];

type StateType = {
  todo: TaskType;
  setTodo: (payload: TaskType) => void;
};

const taskStore = create<StateType>((set) => ({
  // task初期値
  todo: {
    inserted_at: '',
    expired: '',
    user_id: '',
    is_complete: false,
    priority: 1,
    title: '',
    content: '',
    id: '',
  },

  // taskアップデート
  setTodo: (payload) => set({ todo: payload }),
}));

export default taskStore;
