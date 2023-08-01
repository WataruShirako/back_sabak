// Zustand Reactの状態管理ライブラリ
// https://github.com/pmndrs/zustand
import { create } from 'zustand';
import type { Database } from '@/lib/database.types';
import { PostWithTaskType } from '@/app/components/types';
type ProfileType = Database['public']['Tables']['profiles']['Row'];
type TaskType = Database['public']['Tables']['todos']['Row'];

type StateType = {
  user: ProfileType;
  setUser: (payload: ProfileType) => void;

  todo: TaskType;
  setTodo: (payload: TaskType) => void;
};

const useStore = create<StateType>((set) => ({
  // user初期値
  user: {
    id: '',
    email: '',
    name: '',
    introduce: '',
    avatar_url: '',
    customer_id: '',
    team: '',
  },
  // userアップデート
  setUser: (payload) => set({ user: payload }),

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

export default useStore;
