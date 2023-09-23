import type { Database } from '@/lib/database.types'

export type MembershipType = Database['public']['Tables']['t_membership']['Row']

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

export type ProfileType = {
  id: string
  name: string | null
  introduce: string | null
  avatar_url: string | null
}

export type SubscriptionType = {
  t_membership_id: string
  current_period_end: string | null
}



