import type { Database } from '@/lib/database.types'

export type ProjectType = Database['public']['Tables']['m_project']['Row']

export type ProjectColumnsType =   
    | 'project_id'
    | 'project_name'
    | 'project_color'
    | 'project_content'
    | 'created_at'
export const ProjectColumns = {
    project_id: 'project_id',
    project_name: 'project_name',
    project_color: 'project_color',
    project_content: 'project_content',
    created_at: 'created_at',
} as const;