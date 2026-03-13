'use server';

import { fetchData } from './data-fetcher';

const supabaseObjectsBaseUrl = process.env.SUPABASE_OBJECTS_BASE_URL;

export async function fetchSermons() {
  const relations = {
    speaker: {
      table: "ibrm_person",
      fields: ["id", "name", "avatar"]
    },
    serie: {
      table: "ibrm_sermonserie",
      fields: ["id", "title"]
    },
    tags: {
      table: "ibrm_tag",
      through: "ibrm_sermon_tags",
      fields: ["id", "name"],
      flatten: true
    }
  }
  const data = await fetchData('ibrm_sermon', relations);   
  return data;
}

export async function fetchSermonSeries() {
  const data = await fetchData('ibrm_sermonserie');
  return data;
}