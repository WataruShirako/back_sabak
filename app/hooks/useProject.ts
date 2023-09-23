'use client';
import type { Database } from '@/lib/database.types';

export type Project = Database['public']['Tables']['m_project']['Row'];
import { useState, useEffect, SetStateAction } from 'react';
import { supabaseClientComponent } from '../utils/supabase/controller/supabaseClient';
//
const useProject = () => {
  const [project, setProject] = useState<Project[] | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = (await supabaseClientComponent.from('m_project').select()) as {
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
