
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// サインアップ後のリダイレクト先
export async function GET(request: NextRequest) {
  // URL取得
  const requestUrl = new URL(request.url);

  // 認証コード取得
  const code = requestUrl.searchParams.get('code');

  if (code) {
    // auth.jsでSupabaseのクライアントインスタンスを作成
    const supabase = await ;

    // 認証コードをセッショントークンに交換
    await supabase.
  }

  return NextResponse.redirect(requestUrl.origin);
}

