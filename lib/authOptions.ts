import type {Account, NextAuthOptions, Profile, Session, User} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/app/utils/client/supabase-client";
import { AdapterUser } from "next-auth/adapters";
import { v4 as uuidv4 } from 'uuid';

export const authOptions: NextAuthOptions = {
        debug: true,
        session: {strategy: "jwt"},
        providers: [
            // https://next-auth.js.org/providers/google
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                authorization: {
                    params: {
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code",
                    }
                },
            }),
        ],
        callbacks: {
            async signIn({ user, account, profile }: { 
                user: User | AdapterUser; 
                account: Account | null; 
                profile?: Profile 
              }): Promise<boolean> {
                if (account && account.provider === 'google') {
                  // 既存のユーザーを確認
                  let { data: existingUser } = await supabase.from('profiles').select('email').eq('email', user.email!);
                  
                  // ユーザーが存在しない場合、新しいユーザーをusersテーブルに挿入
                  if (!existingUser || existingUser.length === 0) {
                    // profilesテーブルにデータを挿入
                    const {data: session } = await supabase.from('profiles').insert({
                        id: uuidv4(),
                        name: user.name!,
                        email: user.email!,
                        avatar_url: user.image!,
                        // その他のカラム...
                    });
                    console.log(session);
                  }
                }
                return true;
              }
          },
    };
