'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { Filtering } from './objects-fetcher';
import { PostgrestError } from '@supabase/supabase-js';

/**  Ejemplo de como usarla
 * const { data } = await fetchData("users", {
  posts: {
    table: "posts",
    fields: ["id", "title"],
    foreignKey: "posts_user_id_fkey", // 🔥 reversa
    relations: {
      comments: {
        table: "comments",
        fields: ["id", "content"],
        relations: {
          author: {
            table: "users",
            fields: ["id", "name"]
          }
        }
      }
    }
  },
  tags: {
    table: "tags",
    through: "user_tags",
    flatten: true
  }
});

*/
export type FetchDataResponse = {
  data: any;
  error: PostgrestError | null | unknown;
}

type RelationConfig = {
  table: string;
  fields?: string[];
  through?: string;
  foreignKey?: string;
  flatten?: boolean;
  relations?: Record<string, RelationConfig>; // 🔥 nested
}

// 🔥 RECURSIVO
function buildQuery(relations: Record<string, RelationConfig>): string[] {
  return Object.entries(relations).map(([alias, config]) => {

    const fields = config.fields?.length
      ? config.fields.join(",")
      : "*";

    // 🔥 nested relations
    let nested = "";
    if (config.relations) {
      const nestedQuery = buildQuery(config.relations);
      if (nestedQuery.length) {
        nested = "," + nestedQuery.join(",");
      }
    }

    const content = `${fields}${nested}`;

    // 🔥 MANY TO MANY
    if (config.through) {
      if (config.foreignKey) {
        return `${config.through}!${config.foreignKey}(${config.table}(${content}))`;
      }
      return `${config.through}(${config.table}(${content}))`;
    }

    // 🔥 RELACIÓN NORMAL / REVERSA
    if (config.foreignKey) {
      return `${alias}:${config.table}!${config.foreignKey}(${content})`;
    }

    return `${alias}:${config.table}(${content})`;
  });
}

export async function fetchData(
  table: string,
  relations?: Record<string, RelationConfig>,
  order?: string,
  limit?: number,
  exclude?: number[],
  pk?: number,
  filter?: Filtering[]
): Promise<FetchDataResponse> {

  try {
    let select = "*";
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    // 🔥 construir select dinámico
    if (relations) {
      const relationQueries = buildQuery(relations);
      if (relationQueries.length) {
        select += "," + relationQueries.join(",");
      }
    }

    let query = supabase.from(table).select(select).order(order || "id");

    if (pk) {
      query = query.eq("id", pk);
    }

    if (filter) {
      filter.forEach((item) => {
        switch(item.query){
          default:
            query = query.eq(item.field, item.value);
          case "eq":
            query = query.eq(item.field, item.value);
          case "like":
            query = query.like(item.field,  `%${item.value}%`);     
          case "ilike":
            query = query.ilike(item.field,  `%${item.value}%`);        
        }
      });
    }

    if (exclude && exclude.length > 0) {
      query = query.not("id", "in", `(${exclude.join(",")})`);
    }

    if (limit) {
      query = query.limit(limit);
    }

    let { data, error } = await query;

    if (error) {
      console.error("❌ Error en la query:", error);
      return { data, error };
    }

    let result = data || [];

    // 🔥 FLATTEN MANY-TO-MANY + nested
    function flattenRow(row: any, relations: Record<string, RelationConfig>) {
      Object.entries(relations).forEach(([alias, config]) => {

        // MANY TO MANY
        if (config.flatten && config.through) {
          const bridge = row[config.through];
          if (Array.isArray(bridge)) {
            row[alias] = bridge.map((item: any) => {
              const value = item[config.table];

              // 🔥 aplicar flatten recursivo si hay nested
              if (config.relations && value) {
                return flattenRow(value, config.relations);
              }

              return value;
            });
          }
          delete row[config.through];
        }

        // 🔥 nested normal
        if (config.relations && row[alias]) {
          if (Array.isArray(row[alias])) {
            row[alias] = row[alias].map((item: any) =>
              flattenRow(item, config.relations!)
            );
          } else {
            row[alias] = flattenRow(row[alias], config.relations);
          }
        }
      });

      return row;
    }

    if (relations) {
      result = result.map((row: any) => flattenRow(row, relations));
    }

    return { data: result, error };

  } catch (error) {
    console.error("❌ Error fetching data:", error);
    return { data: null, error };
  }
}