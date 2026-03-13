'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

/* export async function fetchSermonsData() {
  try {    
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error, status } = await supabase.from('sermons').select('*');
    
    if (error) {
      console.error('❌ Error en la query:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('❌ Error en fetchSermonsData:', error);
    return [];
  }
}

export async function fetchSermonSeriesData() {
  try {    
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error, status } = await supabase.from('sermons').select('*');
    
    if (error) {
      console.error('❌ Error en la query:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('❌ Error en fetchSermonSeriesData:', error);
    return [];
  }
}
 */