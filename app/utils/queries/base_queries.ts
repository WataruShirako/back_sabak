import { supabase } from '../client/supabase';

export const getAllRecordSelectColumns = async <T>(
  tableName: string,
  columnsName: string
): Promise<T[] | null> => {
  const { data } = (await supabase.from(tableName).select(columnsName)) as {
    data: T[];
  };
  // console.log(data);
  return data;
};
export const getAllRecordAllColumns = async <T>(
  tableName: string
): Promise<T[] | null> => {
  const { data } = (await supabase.from(tableName).select()) as {
    data: T[];
  };
  // console.log(data);
  return data;
};

export const getRecordAllColumnsById = async <T>(
  tableName: string,
  pkColName: string,
  pkValue: string
): Promise<T[] | null> => {
  const { data } = (await supabase
    .from(tableName)
    .select()
    .eq(pkColName, pkValue)) as {
    data: T[];
  };
  // console.log(data);
  return data;
};

