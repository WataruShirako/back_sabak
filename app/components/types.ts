import type { Database } from '@/lib/database.types'

export type PostType = Database['public']['Tables']['posts']['Row']
export type TaskType = Database['public']['Tables']['todos']['Row']
export type MembershipType = Database['public']['Tables']['memberships']['Row']

// 投稿
type PostProfileType = {
  profiles: {
    name: string | null
    avatar_url: string | null
  } | null
}

type PostMembershipType = {
  memberships: {
    title: string
  } | null
}

export type PostWithProfileType = PostType & PostProfileType  & PostMembershipType

// タスク
type TaskProfileType = {
  profiles: {
    todo_id: string
    user_id: string
  }
}

type PostTaskType = {
  id: string | null,
  user_id: string | null,
  title: string | null,
  content: string | null,
  is_complete: boolean | null,
  inserted_at: string | null,
  priority: number | null,
  expired: string | null
}

export type PostWithTaskType = TaskType & PostTaskType 

export type ProfileType = {
  id: string
  name: string | null
  introduce: string | null
  avatar_url: string | null
}

export type SubscriptionType = {
  membership_id: string
  current_period_end: string | null
}



