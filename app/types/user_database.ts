import type { Database } from '@/lib/database.types'

export type ProfileType = Database['public']['Tables']['profiles']['Row']

export type ProfileColumnsType =   
    | 'Profile_id'
    | 'Profile_name'
    | 'Profile_color'
    | 'Profile_content'
    | 'created_at'
export const ProfileColumns = {
    Profile_id: 'Profile_id',
    Profile_name: 'Profile_name',
    Profile_color: 'Profile_color',
    Profile_content: 'Profile_content',
    created_at: 'created_at',
} as const;