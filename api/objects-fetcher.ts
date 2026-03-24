'use server';

import { fetchData } from './data-fetcher';
import { BibleStudy, BibleStudySerie, Person, Sermon, SermonSerie, SisterChurch } from './types';

export type Filtering = {
  field: string;
  query?: string;
  value: any;
}

interface FetchAttributes{
  order?: string;
  limit?: number;
  exclude?: number[];
  pk?: number;
  filter?: Filtering[];
  fromPage?: number;
  toPage?: number;
}

export async function fetchSermons({order, limit, exclude, pk, filter, fromPage, toPage}: FetchAttributes = {}): Promise<Sermon[]> {
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
  const {data, error} = await fetchData('ibrm_sermon', relations, order, limit, exclude, pk, filter, fromPage, toPage);  
  return data;
}

export async function fetchSermonSeries({order, limit, exclude, pk, filter}: FetchAttributes = {}): Promise<SermonSerie[]> {
  const {data, error}  = await fetchData('ibrm_sermonserie', undefined,  order, limit, exclude, pk, filter);
  return data;
}

export async function fetchSisterChurch({order, limit}: FetchAttributes = {}): Promise<SisterChurch[]> {
  const relations = {
    pastors: {
      table: "ibrm_person",
      through: "ibrm_sisterchurch_pastors",
      fields: ["id", "name", "avatar"],
      flatten: true
    }
  }
  const {data, error}  = await fetchData('ibrm_sisterchurch', relations);
  return data;
}

export async function fetchStudySeries({order, limit, exclude, pk, filter}: FetchAttributes = {}): Promise<BibleStudySerie[]> {
  const relations = {
    tags: {
      table: "ibrm_tag",
      through: "ibrm_biblestudyserie_tags",
      fields: ["id", "name"],
      flatten: true
    },
    studies_id: {
      table: "ibrm_biblestudy",
      fields: ["id"],
      foreignKey: "serie_id"
    }
  }
  const {data, error}  = await fetchData('ibrm_biblestudyserie', relations, order, limit, exclude, pk, filter);
  return data;
}

export async function fetchStudy({order, limit, exclude, pk, filter, fromPage, toPage}: FetchAttributes = {}): Promise<BibleStudy[]> {
  const relations = {
    author: {
      table: "ibrm_person",
      fields: ["id", "name", "avatar"],
    },
    serie: {
      table: "ibrm_biblestudyserie",
      fields: ["id", "title"],
    }
  }
  const {data, error}  = await fetchData('ibrm_biblestudy', relations, order, limit, exclude, pk, filter, fromPage, toPage);
  return data;
}

export async function fetchPerson({order, limit, exclude, pk, filter, fromPage, toPage}: FetchAttributes = {}): Promise<Person[]> {
  const {data, error} = await fetchData('ibrm_person', undefined, order, limit, exclude, pk, filter, fromPage, toPage);  
  return data;
}
