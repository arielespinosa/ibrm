"use client"

import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Search, Youtube, Info, User } from 'lucide-react';
import { fetchData } from '@/api/data-fetcher';
import { Sermon, SermonSerie } from '@/api/types';
import { fetchSermons, fetchSermonSeries } from '@/api/objects-fetcher';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabaseObjectsBaseUrl } from '@/lib/utils';


export default function Sermones() {
  const [search, setSearch] = useState('');
  const [activeSeries, setActiveSeries] = useState('Todos');
  const [sermonSeries, setSermonSeries] = useState<SermonSerie[]>([]);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [filteredSermons, setFilteredSermons] = useState<Sermon[]>([]);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  
  useEffect(() => {
    async function loadSermons() {
      const data = await fetchSermons();
      setSermons(data);
      setFilteredSermons(data);
    }
    async function loadSermoSeries() {
      const data = await fetchSermonSeries();
      console.log(data[0]);
      setSermonSeries(data);
    }
    loadSermoSeries();
    loadSermons();
    //setSupabaseObjectsBaseUrl(process.env.SUPABASE_OBJECTS_BASE_URL);
  }, []);

  useEffect(() => {
    const filtered = sermons.filter(sermon => {
      const matchSeries = activeSeries === 'Todos' || sermon.serie.title === activeSeries;
      const matchSearch = sermon.title.toLowerCase().includes(search.toLowerCase()) ||
        sermon.scripture.toLowerCase().includes(search.toLowerCase());
      return matchSeries && matchSearch;
    });
    setFilteredSermons(filtered);
  }, [activeSeries]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-16">
      {/* Header */}
      <div className="border-b border-white/5 pt-16 pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Predicaciones</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-display text-5xl md:text-6xl text-white">Sermones</h1>
            <a
              href="https://www.youtube.com/@Iglesia-ibrm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2.5 transition-colors w-fit"
            >
              <Youtube className="w-4 h-4" />
              Canal de YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-white/5 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Series tabs */}
          <div className="flex gap-1">
            <button
                key={0}
                onClick={() => setActiveSeries("Todos")}
                className={`px-4 py-1.5 text-xs tracking-wide transition-all duration-200 ${
                  activeSeries === "Todos"
                    ? 'bg-[#c9a55a] text-black font-semibold'
                    : 'text-white/40 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                Todos
              </button>
            {sermonSeries.map(serie => (
              <button
                key={serie.id}
                onClick={() => setActiveSeries(serie.title)}
                className={`px-4 py-1.5 text-xs tracking-wide transition-all duration-200 ${
                  activeSeries === serie.title
                    ? 'bg-[#c9a55a] text-black font-semibold'
                    : 'text-white/40 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                {serie.title}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm pl-9 pr-4 py-1.5 focus:outline-none focus:border-[#c9a55a] transition-colors w-52"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Featured / playing */}
        {playingId && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="aspect-video w-full max-w-4xl mx-auto bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${playingId}?autoplay=1`}
                title="Sermon"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <button
              onClick={() => setPlayingId(null)}
              className="mt-3 text-white/30 hover:text-white text-xs transition-colors"
            >
              ✕ Cerrar reproductor
            </button>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSermons.map((sermon, i) => (
            <motion.div
              key={sermon.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group"
            >
              {/* Thumbnail */}
              <div
                className="relative overflow-hidden aspect-video bg-zinc-900 cursor-pointer mb-3"
                onClick={() => setPlayingId(sermon.id)}
              >
                <img
                  src={`https://img.youtube.com/vi/${sermon.youtube_video_id}/hqdefault.jpg`}
                  alt={sermon.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#c9a55a] flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                  </div>
                </div>
                {/* Duration */}
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5">
                  {sermon.duration}
                </span>
                <span className="absolute top-2 left-2 bg-[#c9a55a] text-black text-[10px] font-bold px-2 py-0.5">
                  {sermon.serie.title}
                </span>
              </div>

              {/* Info */}
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="text-white text-sm font-medium leading-snug line-clamp-2 group-hover:text-[#c9a55a] transition-colors cursor-pointer"
                    onClick={() => setPlayingId(sermon.id)}>
                    {sermon.title}
                  </h3>
                  <p className="text-white/30 text-xs mt-1">{sermon.scripture}</p>
                </div>
                <div className='flex justify-between items-start gap-2'>
                  <HoverCard>
                    <HoverCardTrigger> 
                      <User className="text-white/20 hover:text-[#c9a55a] transition-colors flex-shrink-0 mt-0.5 w-3.5 h-3.5" />
                    </HoverCardTrigger>
                    <HoverCardContent side="top" align="end" className="border border-white/10 text-white bg-[#0A0A0A]">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={`${supabaseObjectsBaseUrl}${sermon.speaker.avatar}`} alt={sermon.speaker.name} />
                          <AvatarFallback>{sermon.speaker.name}</AvatarFallback>
                        </Avatar>
                        <span className="text-white/80 text-sm font-medium">{sermon.speaker.name}</span>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

               
                <a
                  href={`https://www.youtube.com/watch?v=${sermon.youtube_video_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/20 hover:text-[#c9a55a] transition-colors flex-shrink-0 mt-0.5"
                  onClick={e => e.stopPropagation()}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {sermons.length === 0 && (
          <div className="text-center py-20 text-white/20">
            No se encontraron sermones
          </div>
        )}
      </div>
    </div>
  );
}