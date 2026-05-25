// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// Entity Types
export interface Person {
  id: string
  name: string
  bio: string | null
  is_pastor: boolean
  is_ibrm_member: boolean
  is_ibrm_pastor: boolean
  avatar: string | null
  email: string | null
}

export interface Tag {
  id: string
  name: string
}

export interface SermonSeries {
  id: string
  title: string
  description: string | null
  thumbnail_url: string | null
  is_current_dominical: boolean
  ibrm_sermon?: Sermon[]
  ibrm_sermonserie_speakers?: {
    id: string
    sermonserie_id: string
    person_id: string
    ibrm_person: Person
  }[]
}

export interface Sermon {
  id: string
  title: string
  description: string
  date: string
  scripture: string
  duration: string
  video_url: string | null
  thumbnail_url: string | null
  youtube_video_id: string | null
  speaker_id: string
  serie_id: string | null
  serie_orden: number | null
  is_on_straming: boolean | null
  ibrm_person?: Person
  ibrm_sermonserie?: SermonSeries
  ibrm_sermon_tags?: {
    id: string
    sermon_id: string
    tag_id: string
    ibrm_tag: Tag
  }[]
}

export interface StudySeries {
  id: string
  title: string
  description: string
  thumbnail: string | null
  recomended: boolean | null
  is_current_dominical: boolean
  created: string | null
  ibrm_biblestudy?: Study[]
  ibrm_biblestudyserie_tags?: {
    id: string
    biblestudyserie_id: string
    tag_id: string
    ibrm_tag: Tag
  }[]
}

export interface Study {
  id: string
  title: string
  description: string
  content: string
  author_id: string
  serie_id: string | null
  serie_order: number | null
  thumbnail: string | null
  file: string | null
  created: string | null
  ibrm_person?: Person
  ibrm_biblestudyserie?: StudySeries
}

export interface SisterChurch {
  id: string
  name: string
  description: string
  location: string
  website_url: string | null
  logo_url: string | null
  cover_url: string | null
  ibrm_sisterchurch_pastors?: {
    id: string
    sisterchurch_id: string
    person_id: string
    ibrm_person: Person
  }[]
}

export interface ChurchService {
  id: string
  day: string
  title: string
  time: string
}

// Query Parameters
export interface QueryParams {
  page?: number
  limit?: number
  search?: string
  orderBy?: string
  order?: 'asc' | 'desc'
  [key: string]: any
}

// Base API URL
const API_BASE = '/api'

// Generic fetch function
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })
  
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error || 'API request failed')
  }
  
  return data
}

// Build query string from params
function buildQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value))
    }
  })
  
  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

// ============ SERMONS API ============

export async function getSermons(params: QueryParams = {}): Promise<PaginatedResponse<Sermon>> {
  return fetchApi(`/sermons${buildQueryString(params)}`)
}

export async function getSermon(id: string): Promise<ApiResponse<Sermon>> {
  return fetchApi(`/sermons/${id}`)
}

export async function createSermon(data: Partial<Sermon>): Promise<ApiResponse<Sermon>> {
  return fetchApi('/sermons', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateSermon(id: string, data: Partial<Sermon>): Promise<ApiResponse<Sermon>> {
  return fetchApi(`/sermons/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deleteSermon(id: string): Promise<ApiResponse<{ message: string }>> {
  return fetchApi(`/sermons/${id}`, {
    method: 'DELETE',
  })
}

// ============ SERMON SERIES API ============

export async function getSermonSeries(params: QueryParams = {}): Promise<PaginatedResponse<SermonSeries>> {
  return fetchApi(`/sermon-series${buildQueryString(params)}`)
}

export async function getSermonSeriesById(id: string): Promise<ApiResponse<SermonSeries>> {
  return fetchApi(`/sermon-series/${id}`)
}

export async function createSermonSeries(data: Partial<SermonSeries>): Promise<ApiResponse<SermonSeries>> {
  return fetchApi('/sermon-series', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateSermonSeries(id: string, data: Partial<SermonSeries>): Promise<ApiResponse<SermonSeries>> {
  return fetchApi(`/sermon-series/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deleteSermonSeries(id: string): Promise<ApiResponse<{ message: string }>> {
  return fetchApi(`/sermon-series/${id}`, {
    method: 'DELETE',
  })
}

// ============ STUDIES API ============

export async function getStudies(params: QueryParams = {}): Promise<PaginatedResponse<Study>> {
  return fetchApi(`/studies${buildQueryString(params)}`)
}

export async function getStudy(id: string): Promise<ApiResponse<Study>> {
  return fetchApi(`/studies/${id}`)
}

export async function createStudy(data: Partial<Study>): Promise<ApiResponse<Study>> {
  return fetchApi('/studies', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateStudy(id: string, data: Partial<Study>): Promise<ApiResponse<Study>> {
  return fetchApi(`/studies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deleteStudy(id: string): Promise<ApiResponse<{ message: string }>> {
  return fetchApi(`/studies/${id}`, {
    method: 'DELETE',
  })
}

// ============ STUDY SERIES API ============

export async function getStudySeries(params: QueryParams = {}): Promise<PaginatedResponse<StudySeries>> {
  return fetchApi(`/study-series${buildQueryString(params)}`)
}

export async function getStudySeriesById(id: string): Promise<ApiResponse<StudySeries>> {
  return fetchApi(`/study-series/${id}`)
}

export async function createStudySeries(data: Partial<StudySeries>): Promise<ApiResponse<StudySeries>> {
  return fetchApi('/study-series', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateStudySeries(id: string, data: Partial<StudySeries>): Promise<ApiResponse<StudySeries>> {
  return fetchApi(`/study-series/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deleteStudySeries(id: string): Promise<ApiResponse<{ message: string }>> {
  return fetchApi(`/study-series/${id}`, {
    method: 'DELETE',
  })
}

// ============ PERSONS API ============

export async function getPersons(params: QueryParams = {}): Promise<PaginatedResponse<Person>> {
  return fetchApi(`/persons${buildQueryString(params)}`)
}

export async function getPerson(id: string): Promise<ApiResponse<Person>> {
  return fetchApi(`/persons/${id}`)
}

export async function createPerson(data: Partial<Person>): Promise<ApiResponse<Person>> {
  return fetchApi('/persons', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updatePerson(id: string, data: Partial<Person>): Promise<ApiResponse<Person>> {
  return fetchApi(`/persons/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deletePerson(id: string): Promise<ApiResponse<{ message: string }>> {
  return fetchApi(`/persons/${id}`, {
    method: 'DELETE',
  })
}

// ============ SISTER CHURCHES API ============

export async function getSisterChurches(params: QueryParams = {}): Promise<PaginatedResponse<SisterChurch>> {
  return fetchApi(`/sister-churches${buildQueryString(params)}`)
}

export async function getSisterChurch(id: string): Promise<ApiResponse<SisterChurch>> {
  return fetchApi(`/sister-churches/${id}`)
}

export async function createSisterChurch(data: Partial<SisterChurch>): Promise<ApiResponse<SisterChurch>> {
  return fetchApi('/sister-churches', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateSisterChurch(id: string, data: Partial<SisterChurch>): Promise<ApiResponse<SisterChurch>> {
  return fetchApi(`/sister-churches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deleteSisterChurch(id: string): Promise<ApiResponse<{ message: string }>> {
  return fetchApi(`/sister-churches/${id}`, {
    method: 'DELETE',
  })
}

// ============ TAGS API ============

export async function getTags(params: QueryParams = {}): Promise<PaginatedResponse<Tag>> {
  return fetchApi(`/tags${buildQueryString(params)}`)
}

export async function getTag(id: string): Promise<ApiResponse<Tag>> {
  return fetchApi(`/tags/${id}`)
}

export async function createTag(data: Partial<Tag>): Promise<ApiResponse<Tag>> {
  return fetchApi('/tags', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateTag(id: string, data: Partial<Tag>): Promise<ApiResponse<Tag>> {
  return fetchApi(`/tags/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deleteTag(id: string): Promise<ApiResponse<{ message: string }>> {
  return fetchApi(`/tags/${id}`, {
    method: 'DELETE',
  })
}

// ============ CHURCH SERVICES API ============

export async function getChurchServices(params: QueryParams = {}): Promise<PaginatedResponse<ChurchService>> {
  return fetchApi(`/church-services${buildQueryString(params)}`)
}

export async function getChurchService(id: string): Promise<ApiResponse<ChurchService>> {
  return fetchApi(`/church-services/${id}`)
}

export async function createChurchService(data: Partial<ChurchService>): Promise<ApiResponse<ChurchService>> {
  return fetchApi('/church-services', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateChurchService(id: string, data: Partial<ChurchService>): Promise<ApiResponse<ChurchService>> {
  return fetchApi(`/church-services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deleteChurchService(id: string): Promise<ApiResponse<{ message: string }>> {
  return fetchApi(`/church-services/${id}`, {
    method: 'DELETE',
  })
}
