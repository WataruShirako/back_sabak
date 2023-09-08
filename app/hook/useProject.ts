'use client';
import type { Database } from '@/lib/database.types';

export type Project = Database['public']['Tables']['m_projects']['Row'];
import { useState, useEffect, SetStateAction } from 'react';
import { supabase } from '../utils/client/supabase';
//
const useProject = () => {
  const [project, setProject] = useState<Project[] | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = (await supabase.from('m_projects').select()) as {
          data: Project[];
        };
        setProject(data);
      } catch (err) {
        setError(err);
      }
    };
    fetch();
  }, []);

  return { project, error };
};

export default useProject;
