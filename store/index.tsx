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

  task: TaskType;
  setTask: (payload: TaskType) => void;
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
  task: {
    inserted_at: '',
    expired: '',
    user_id: '',
    is_complete: false,
    priority: 1,
    title: '',
    content: '',
    id: 0,
  },

  // taskアップデート
  setTask: (payload) => set({ task: payload }),
}));

export default useStore;
