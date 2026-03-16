'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

type RelationConfig = {
  table: string
  fields?: string[]
}

function buildQuery(relations: any) {
  const relationQueries = Object.entries(relations).map(
    ([alias, config]: any) => {

      const fields = config.fields?.length
        ? config.fields.join(",")
        : "*"

      if (config.through) {
        return `${config.through}(${config.table}(${fields}))`
      }

      return `${alias}:${config.table}(${fields})`
    }
  )
  return relationQueries;
}

export async function fetchData(table: string, relations?: any, order?: string, limit?: number) {
  try {
    let select = "*";
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    let data, error;

    if(!relations){
      if (!limit) {
        ({ data, error } = await supabase.from(table).select(select).order(order || "id"));
      } else {
        ({ data, error } = await supabase.from(table).select(select).order(order || "id").limit(limit));
      }

      if (error) {
        console.error("❌ Error en la query:", error)
        return []
      }
      return data;
    }

    const relationQueries = buildQuery(relations);

    if (relationQueries.length) {
      select += "," + relationQueries.join(",")
    }

    if (!limit) {
      ({ data, error } = await supabase.from(table).select(select).order(order || "id"));
    } else {
      ({ data, error } = await supabase.from(table).select(select).order(order || "id").limit(limit));
    }

    if (error) {
      console.error("❌ Error en la query:", error)
      return []
    }

    let result = data || []

    // Flatten many-to-many
    result = result.map((row: any) => {
      Object.entries(relations).forEach(([alias, config]: any) => {
        if (config.flatten && config.through) {
          const bridge = row[config.through]
          if (Array.isArray(bridge)) {
            row[alias] = bridge.map((item: any) => item[config.table])
          }
          delete row[config.through]
        }
      })
      return row
    })

    return result

  } catch (error) {
    console.error("❌ Error fetching data:", error)
    return []
  }
}
