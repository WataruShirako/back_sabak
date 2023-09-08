// Zustand Reactの状態管理ライブラリ
// https://github.com/pmndrs/zustand
import { create } from 'zustand';
import type { Database } from '@/lib/database.types';
import { PostWithTaskType } from '@/app/types/types';
type ProfileType = Database['public']['Tables']['profiles']['Row'];

type StateType = {
  user: ProfileType;
  setUser: (payload: ProfileType) => void;
};

const userStore = create<StateType>((set) => ({
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
}));

export default userStore;
