
/* NOMENCLADORES */

export interface Tag {
  id: number;
  name: string;
}

export interface Person {
    id: number;
    name: string;
    photo_url: string;
    bio?: string;
    is_pastor?: boolean;
    is_ibrm_member?: boolean;
    is_ibrm_pastor?: boolean;
}

export interface Sermon {
  id: number;
  title: string;
  description: string;
  date: string;
  scripture: string;
  duration: string;
  speaker: Person;
  video_url: string;
  thumbnail_url: string;
}

export interface SermonSerie {
  id: number;
  title: string;
  speakers: Person[];
  thumbnail_url: string;
}

export interface SisterChurch {
  id: number;
  name: string;
  descripton: string;
  location: string;
  website_url: string;
  logo_url: string;
  pastor: Person;
}

export interface ChurchServices {
  day: string; 
  title: string; 
  time: string; 
}


/* ESTUDIOS */

export interface BibleStudy {
  id: number;
  title: string;
  description: string;
  content: string;
  leader: Person;
}

export interface BibleStudySerie {
  id: number;
  title: string;
  description: string;
  amount_of_sessions: number;
}