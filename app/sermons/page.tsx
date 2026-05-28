"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Search, Youtube, User, Filter } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PAGE_SIZE, supabaseObjectsBaseUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PaginatorPageProps, Paginator } from '@/components/sermon/paginator';
import { FilterSermonModalForm } from '@/components/sermon/filter';
import { Sermon, SermonSerie } from '@/api/types';


export default function Sermones() {
  const [search, setSearch] = useState('');
  const [activeSeries, setActiveSeries] = useState('Todos');
  const [sermonSeries, setSermonSeries] = useState<SermonSerie[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playingSermon, setPlayingSermon] = useState<Sermon | null>(null);
  const [filteredSermons, setFilteredSermons] = useState<Sermon[]>([]);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [paginatorPages, setPaginatorPages] = useState<PaginatorPageProps[] | null>(null);
  const [paginatorHasPrevious, setPaginatorHasPrevious] = useState(false);
  const [paginatorHasNext, setPaginatorHasNext] = useState(false);
  const [total, setTotal] = useState<number | undefined>();

  async function loadSermons() {
    try {
      const response = await fetch(`api/sermons?page=${page}&limit=${PAGE_SIZE}`);
      if (response.status === 200) {
        const result = await response.json();
        setSermons(result.data);
        setFilteredSermons(result.data);
        setTotal(result.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error loading sermons:', error);
      setSermons([]);
      setFilteredSermons([]);
    }
  }

  async function loadSermonSeries() {
    try {
      const response = await fetch(`api/sermon-series?limit=${100}`);
      if (response.status === 200) {
        const result = await response.json();
        setSermonSeries(result.data);
      }
    } catch (error) {
      console.error('Error loading sermon series:', error);
      setSermonSeries([]);
    }
  }

  function reloadPaginatorPages() {
    let data = []
    let fromPage = page - 3 <= 0 ? 1 : page - 2
    let toPage = fromPage + 4;

    if (total && (total === 0 || total <= toPage)) {
      toPage = total;
    }

    for (let i = fromPage; i <= toPage; i++) {
      data.push({ value: i, isActive: i == page })
    }

    setPaginatorPages(data);
  }

  function checkPaginatorPreviousNext() {
    setPaginatorHasPrevious(paginatorPages?.[0].value !== 1);

    if (paginatorPages && total)
      setPaginatorHasNext(paginatorPages[paginatorPages.length - 1].value < total);
  }

  useEffect(() => {
    loadSermonSeries();
  }, []);

  useEffect(() => {
    loadSermons();
  }, [page]);

  useEffect(() => {
    checkPaginatorPreviousNext();
  }, [paginatorPages]);

  useEffect(() => {
    const filtered = sermons.filter(sermon => {
      const seriesTitle = sermon.ibrm_sermonserie?.title || '';
      const matchSeries = activeSeries === 'Todos' || seriesTitle === activeSeries;
      const matchSearch = sermon.title.toLowerCase().includes(search.toLowerCase()) ||
        sermon.scripture.toLowerCase().includes(search.toLowerCase());
      return matchSeries && matchSearch;
    });
    setFilteredSermons(filtered);
  }, [activeSeries, search, sermons]);

  useEffect(() => {
    const filtered = sermons.filter(sermon => {
      const match = sermon.youtube_video_id === playingId;
      return match;
    });
    setPlayingSermon(filtered[0] || null);
  }, [playingId, sermons]);

  useEffect(() => {
    if (total !== undefined) {
      reloadPaginatorPages();
    }
  }, [total, page]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="relative pt-32 pb-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/rsc/img/sermons-cover.png" alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Predicaciones</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-display text-5xl md:text-7xl text-white mb-6">Sermones y <br /> Conferencias</h1>
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
          <div className="w-12 h-px bg-[#c9a55a]" />
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-white/5 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Series tabs */}
          <div className="flex gap-1 flex-wrap">
            <button
              key={0}
              onClick={() => setActiveSeries("Todos")}
              className={`px-4 py-1.5 text-xs tracking-wide transition-all duration-200 ${activeSeries === "Todos"
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
                className={`px-4 py-1.5 text-xs tracking-wide transition-all duration-200 ${activeSeries === serie.title
                    ? 'bg-[#c9a55a] text-black font-semibold'
                    : 'text-white/40 hover:text-white border border-white/10 hover:border-white/30'
                  }`}
              >
                {serie.title}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="flex flex-row relative gap-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm pl-9 pr-4 py-1.5 focus:outline-none focus:border-[#c9a55a] transition-colors w-52"
            />
            <Button
              type="button"
              size="icon"
              onClick={() => setIsFilterOpen(true)}
              className="px-4 py-1.5 text-xs tracking-wide text-white/40 hover:text-[#c9a55a] border border-white/10 hover:border-[#c9a55a] rounded-none"
            >
              <Filter />
            </Button>
            <FilterSermonModalForm
              open={isFilterOpen}
              setOpen={setIsFilterOpen}
              callback={(filtered) => setFilteredSermons(filtered)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Featured / playing */}
        {playingId && playingSermon && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-4/5">
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <div className="aspect-video w-full bg-black">
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
                  Cerrar reproductor
                </button>
              </motion.div>
            </div>
            <div className="lg:w-1/5">
              <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">DETALLES DEL SERMON</p>
              <h2 className="font-display text-2xl md:text-xl text-white mb-6 leading-tight">{playingSermon.title}</h2>
              <div className="w-12 h-px bg-[#c9a55a] mb-8" />
              <p className="text-[#c9a55a] text-xs tracking-[0.3em] mb-3">{playingSermon.scripture}</p>
              <p className="text-white/50 leading-relaxed mb-6">{playingSermon.description}</p>
              {playingSermon.ibrm_person && (
                <div className="flex items-center gap-3">
                  <Avatar className="w-15 h-15">
                    <AvatarImage src={`${supabaseObjectsBaseUrl}${playingSermon.ibrm_person.avatar}`} alt={playingSermon.ibrm_person.name} />
                    <AvatarFallback>{playingSermon.ibrm_person.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-white/80 text-sm font-medium">Pr. {playingSermon.ibrm_person.name}</span>
                    <span className="text-[#c9a55a]/60 text-xs tracking-wide">{playingSermon.ibrm_person.email}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {filteredSermons.length > 0 && paginatorPages && (
          <>
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
                    onClick={() => setPlayingId(sermon.youtube_video_id)}
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
                    {sermon.ibrm_sermonserie && (
                      <span className="absolute top-2 left-2 bg-[#c9a55a] text-black text-[10px] font-bold px-2 py-0.5">
                        {sermon.ibrm_sermonserie.title}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="truncate w-75 text-white text-sm font-medium leading-snug line-clamp-2 group-hover:text-[#c9a55a] transition-colors cursor-pointer"
                        onClick={() => setPlayingId(sermon.youtube_video_id)}>
                        {sermon.title}
                      </h3>
                      <div className='flex justify-between items-start gap-2'>
                        <p className="text-white/30 text-xs mt-1">{sermon.scripture}</p>
                        <div className='flex justify-between items-start gap-2'>
                          {sermon.ibrm_person && (
                            <HoverCard>
                              <HoverCardTrigger>
                                <User className="text-white/20 hover:text-[#c9a55a] transition-colors flex-shrink-0 mt-0.5 w-3.5 h-3.5" />
                              </HoverCardTrigger>
                              <HoverCardContent side="top" align="end" className="border border-white/10 text-white bg-[#0A0A0A]">
                                <div className="flex items-center gap-3">
                                  <Avatar className="w-10 h-10">
                                    <AvatarImage src={`${supabaseObjectsBaseUrl}${sermon.ibrm_person.avatar}`} alt={sermon.ibrm_person.name} />
                                    <AvatarFallback>{sermon.ibrm_person.name?.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-white/80 text-sm font-medium">{sermon.ibrm_person.name}</span>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          )}
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
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.05 }}
              className="group"
            >
              <div className='pt-20'>
                <Paginator pages={paginatorPages} hasPrevious={paginatorHasPrevious} hasNext={paginatorHasNext} setPage={setPage} />
              </div>
            </motion.div>
          </>
        )}

        {sermons.length === 0 && (
          <div className="text-center py-20 text-white/20">
            No se encontraron sermones
          </div>
        )}
      </div>
    </div>
  );
}
