"use client"

import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Search, Youtube } from 'lucide-react';
import { fetchData } from '@/api/data-fetcher';
import { Sermon } from '@/api/types';

const ALL_SERMONS = [
  { id: 'HSrJZ_kSLI4', title: 'La encrucijada de vivir en dos deseos', scripture: 'Filipenses 1:21-26', duration: '1:02:20', date: '2026-02-26', series: 'Filipenses' },
  { id: 'zPj3HyyuYj4', title: 'Cuando el cielo se cierra hasta que confiesas', scripture: 'Mateo 6:12a', duration: '1:07:06', date: '2026-02-19', series: 'Mateo 6' },
  { id: '_W1nGnRako8', title: 'Dependencia o Ilusión', scripture: 'Mateo 6:11', duration: '47:07', date: '2026-02-12', series: 'Mateo 6' },
  { id: '0jMfpJb5DFY', title: 'Entre la vida y la muerte', scripture: 'Filipenses 1:19-21', duration: '1:05:02', date: '2026-02-05', series: 'Filipenses' },
  { id: '8a5VC_ZVkqs', title: 'Cuando orar significa morir', scripture: 'Mateo 6:10b', duration: '49:22', date: '2026-01-29', series: 'Mateo 6' },
  { id: 'ReHL0Gmh65Y', title: 'Cristo es Anunciado', scripture: 'Filipenses 1:15-19', duration: '1:07:11', date: '2026-01-22', series: 'Filipenses' },
  { id: 'km78_NI1i1g', title: 'Sed Santos Porque Yo Soy Santo', scripture: '1 Pedro 1:16', duration: '58:30', date: '2025-12-01', series: 'Especial' },
  { id: '3veIN9rMefs', title: 'Redimidos por Su Sangre', scripture: 'Apocalipsis 5', duration: '1:01:00', date: '2025-11-15', series: 'Especial' },
];

const SERIES = ['Todos', 'Filipenses', 'Mateo 6', 'Especial'];

export default function Sermones() {
  const [search, setSearch] = useState('');
  const [activeSeries, setActiveSeries] = useState('Todos');
  const [playingId, setPlayingId] = useState(null);

  const [filtered, setFiltered] = useState<Sermon[]>([]);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  
  useEffect(() => {
    async function loadSermons() {
      const relations = {
        speaker: {
          table: "ibrm_person",
          fields: ["id", "name", "avatar"]
        },
        tags: {
          table: "ibrm_tag",
          through: "ibrm_sermon_tags",
          fields: ["id", "name"],
          flatten: true
        }
      }
      const data = await fetchData('ibrm_sermon', relations);
      setSermons(data);
      console.log('📊 Datos recibidos en el cliente:', data);
    }
    loadSermons();
  }, []);

  /*   useEffect(() => {
    const filteredSermons = ALL_SERMONS.filter(s => {
      const matchSeries = activeSeries === 'Todos' || s.series === activeSeries;
      const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.scripture.toLowerCase().includes(search.toLowerCase());
      return matchSeries && matchSearch;
    });
    setFiltered(filteredSermons);
  }, [sermons]); */

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
            {SERIES.map(s => (
              <button
                key={s}
                onClick={() => setActiveSeries(s)}
                className={`px-4 py-1.5 text-xs tracking-wide transition-all duration-200 ${
                  activeSeries === s
                    ? 'bg-[#c9a55a] text-black font-semibold'
                    : 'text-white/40 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                {s}
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
          {filtered.map((sermon, i) => (
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
                  src={`https://img.youtube.com/vi/${sermon.id}/hqdefault.jpg`}
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
                  {sermon.series}
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
                <a
                  href={`https://www.youtube.com/watch?v=${sermon.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/20 hover:text-[#c9a55a] transition-colors flex-shrink-0 mt-0.5"
                  onClick={e => e.stopPropagation()}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/20">
            No se encontraron sermones
          </div>
        )}
      </div>
    </div>
  );
}