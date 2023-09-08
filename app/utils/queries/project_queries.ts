import { Project } from '@/app/hook/useProject';
import {
  getAllRecordSelectColumns,
  getAllRecordAllColumns,
  getRecordAllColumnsById,
} from './base_queries';
import {
  ProjectColumns,
  ProjectColumnsType,
} from '@/app/types/project_database';
import { TABLE_NAME } from '@/app/components/const/database';

export const getAllProjectSelectColumns = (...columnsName: ProjectColumnsType[]) => {
  if (!columnsName.length) return getAllProjectAllColumns();
  const columnName = columnsName.join(', ');
  return getAllRecordSelectColumns<Project>(TABLE_NAME.m_projects, columnName);
};

export const getAllProjectAllColumns = () => {
  return getAllRecordAllColumns<Project>(TABLE_NAME.m_projects);
};

// 現在のスラッグのプロジェクトを取得
export const getProjectBySlug = (userId: string) => {
  return getRecordAllColumnsById<Project>(
    TABLE_NAME.m_projects,
    ProjectColumns.project_name,
    userId
  );
}