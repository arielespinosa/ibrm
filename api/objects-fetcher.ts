'use server';

import { fetchData } from './data-fetcher';

const supabaseObjectsBaseUrl = process.env.SUPABASE_OBJECTS_BASE_URL;

interface FetchAttributes{
  order?: string;
  limit?: number;
}

export async function fetchSermons({order, limit}: FetchAttributes = {}) {
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

  const data = await fetchData('ibrm_sermon', relations, order, limit);   
  return data;
}

export async function fetchSermonSeries() {
  const data = await fetchData('ibrm_sermonserie');
  return data;
}

export async function fetchSisterChurch() {
  const relations = {
    pastors: {
      table: "ibrm_person",
      through: "ibrm_sisterchurch_pastors",
      fields: ["id", "name", "avatar"],
      flatten: true
    }
  }
  const data = await fetchData('ibrm_sisterchurch', relations);
  return data;
}