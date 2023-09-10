// Zustand Reactの状態管理ライブラリ
// https://github.com/pmndrs/zustand
import { create } from 'zustand';
import type { Database } from '@/lib/database.types';
type ProjectType = Database['public']['Tables']['m_projects']['Row'];

type StateType = {
  project: ProjectType;
  setProject: (payload: ProjectType) => void;
};

const projectStore = create<StateType>((set) => ({
  // t初期値
  project: {
    project_id: '',
    project_name: '',
    project_color: '',
    project_content: '',
    created_at: '',
    project_admin_id: '',
  },
  // taskアップデート
  setProject: (payload) => set({ project: payload }),
}));

export default projectStore;
