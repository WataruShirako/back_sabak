'use client';
import type { Database } from '@/lib/database.types';

export type Team = Database['public']['Tables']['m_projects']['Row'];
import { useState, useEffect, SetStateAction } from 'react';
import { supabase } from '../utils/client/supabase';
//
const useTeam = () => {
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = (await supabase.from('m_team').select()) as {
          data: Team[];
        };
        setTeams(data);
      } catch (err) {
        setError(err);
      }
    };
    fetch();
  }, []);

  return { teams, error };
};

export default useTeam;
