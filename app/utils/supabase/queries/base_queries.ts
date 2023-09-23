import { supabaseServerComponent } from '../controller/supabaseServer';

export const getAllRecordSelectColumns = async <T>(
  tableName: string,
  columnsName: string
): Promise<T[] | null> => {
  const { data } = (await supabaseServerComponent.from(tableName).select(columnsName)) as {
    data: T[];
  };
  // console.log(data);
  return data;
};
export const getAllRecordAllColumns = async <T>(
  tableName: string
): Promise<T[] | null> => {
  const { data } = (await supabaseServerComponent.from(tableName).select()) as {
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
  const { data } = (await supabaseServerComponent
    .from(tableName)
    .select()
    .eq(pkColName, pkValue)) as {
    data: T[];
  };
  // console.log(data);
  return data;
};

