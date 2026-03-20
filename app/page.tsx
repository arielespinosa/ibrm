"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, ChevronDown, ArrowRight, MapPin, Clock,
  BookOpen, Shield, Flame, Star, Users,
  Rainbow,
  Crown,
  MapIcon,
  MapPinIcon
} from 'lucide-react';
import SisterChurchesSection from '../components/home/SisterChurchesSection';
import { Sermon } from '@/api/types';
import { fetchSermons } from '@/api/objects-fetcher';
import { Skeleton } from '@/components/ui/skeleton';

const navLinks = [
  { name: 'Inicio', page: 'Home' },
  { name: 'Nosotros', page: 'Nosotros' },
  { name: 'Creencias', page: 'Creencias' },
  { name: 'Sermones', page: 'Sermones' },
  { name: 'Estudios', page: 'Estudios' },
  { name: 'Blog', page: 'Blog' },
];

const BELIEFS = [
  { title: 'Sola Scriptura', sub: 'Solo la Escritura', icon: BookOpen },
  { title: 'Solus Christus', sub: 'Solo Cristo', icon: Crown },
  { title: 'Sola Gratia', sub: 'Solo por Gracia', icon: Flame },
  { title: 'Sola Fide', sub: 'Solo por Fe', icon: Shield },
  { title: 'Soli Deo Gloria', sub: 'Solo a Dios la Gloria', icon: Rainbow },
];

const SCHEDULE = [
  { day: 'DOM', label: 'Domingo', title: 'Culto Congregacional', time: '11:30 AM' },
  { day: 'JUE', label: 'Jueves', title: 'Estudio Bíblico y Oración', time: '18:00 PM', link: true },
  { day: 'SÁB', label: 'Último Sábado del Mes', title: 'Reuniones de Hombres y Mujeres', time: 'Por confirmar' },
];

function SermonCard({ sermon, index }: { sermon: Sermon, index: number }) {
  const [imgSrc, setImgSrc] = useState(`https://img.youtube.com/vi/${sermon.youtube_video_id}/maxresdefault.jpg`);

  const handleClick = () => {
    window.open(`https://www.youtube.com/watch?v=${sermon.youtube_video_id}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <a
      href={`https://www.youtube.com/watch?v=${sermon.youtube_video_id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group flex flex-col cursor-pointer"
      >
        <div className="relative overflow-hidden aspect-video bg-zinc-900">
          <img
            src={imgSrc}
            alt={sermon.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            onError={() => setImgSrc(`https://img.youtube.com/vi/${sermon.youtube_video_id}/hqdefault.jpg`)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-[#c9a55a] flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Play className="w-6 h-6 text-black fill-black ml-0.5" />
            </div>
          </div>
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5">
            {sermon.duration}
          </span>
          <span className="absolute top-2 left-2 bg-[#c9a55a] text-black text-xs font-medium px-2 py-0.5">
            {sermon.scripture}
          </span>
        </div>
        <div className="pt-3 flex-1 min-w-0">
          <h3 className="truncate w-full text-white text-sm font-medium leading-snug group-hover:text-[#c9a55a] transition-colors line-clamp-2">
            {sermon.title}
          </h3>
          <p className="text-white/40 text-xs mt-1">{sermon.date}</p>
        </div>
      </motion.div>
    </a>
  );
}

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [lastSermons, setLastSermons] = useState<Sermon[]>([]);
  const videoBackgroundUrl = "https://rgbmummrazuosxbcxkds.supabase.co/storage/v1/object/public/ibrm/resources/cross.mp4"

  useEffect(() => {
    async function loadLastSermons() {
      const data = await fetchSermons({limit: 6});
      setLastSermons(data);
    }
    loadLastSermons();
  }, []);
  
  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);    
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white">

      {/* ─── HERO ─── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            playsInline
            loop
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              width: "177.78vh",
              height: "100vh",
              minWidth: "100%",
              minHeight: "56.25vw",
              transform: "translate(-50%, -50%)",
              objectFit: "cover",
              pointerEvents: "none"
            }}
          >
            <source src={videoBackgroundUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,0.4) 100%)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #c9a55a 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
        </div>

        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4">
          <div className="w-px h-20 bg-gradient-to-b from-transparent to-[#c9a55a]" />
          <span className="text-[#c9a55a]/50 text-[10px] tracking-[0.4em] uppercase rotate-90 origin-center whitespace-nowrap">
            Sola Scriptura
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-[#c9a55a] to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence>
            {heroLoaded && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-8 h-px bg-[#c9a55a]" />
                  <span className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase">Iglesia Bautista Reformada · Murcia</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6 max-w-3xl"
                >
                  La Palabra<br />
                  <span className="text-[#c9a55a]">que no</span><br />
                  calla.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  className="text-white/50 text-base md:text-lg max-w-md mb-10 leading-relaxed"
                >
                  Piedras vivas en Cristo. Predicando el evangelio en Alcantarilla, Murcia.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="flex flex-wrap gap-3"
                >
                  <a
                    href="https://www.youtube.com/@Iglesia-ibrm/videos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#c9a55a] hover:bg-[#b8944a] text-black font-semibold px-6 py-3 text-sm transition-all duration-200 group"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    Sermones
                  </a>
                  <a
                    href="https://maps.app.goo.gl/RWNsyN2VoYmMyMLq8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-white/20 hover:border-[#c9a55a] text-white/80 hover:text-[#c9a55a] px-6 py-3 text-sm transition-all duration-200"
                  >
                    Visitar
                    <MapPinIcon className="w-4 h-4" />
                  </a>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </motion.div>
      </section>


      {/* ─── TICKER ─── */}
      <div className="bg-[#c9a55a] py-3 overflow-hidden">
        <motion.div
          animate={{ x: [0, -800] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-16 text-black text-xs tracking-[0.2em] uppercase font-medium">
              <span>Sola Scriptura</span>
              <span>·</span>
              <span>Sola Fide</span>
              <span>·</span>
              <span>Sola Gratia</span>
              <span>·</span>
              <span>Solus Christus</span>
              <span>·</span>
              <span>Soli Deo Gloria</span>
              <span>·</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ─── LATEST SERMONS ─── */}
      {lastSermons.length > 0 && (
        <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-2">Predicaciones</p>
              <h2 className="font-display text-4xl md:text-5xl text-white">Últimos Sermones</h2>
            </div>
            <a href="/sermons" className="hidden md:flex items-center gap-2 text-white/40 hover:text-[#c9a55a] text-sm transition-colors group">
              Ver todos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <motion.div
            onClick={() => window.open(`https://www.youtube.com/watch?v=${lastSermons[0].youtube_video_id}`, '_blank', 'noopener,noreferrer' )}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden mb-8 aspect-video md:aspect-[21/7] cursor-pointer"
          >
            <img
              src={`https://img.youtube.com/vi/${lastSermons[0].youtube_video_id}/maxresdefault.jpg`}
              alt={lastSermons[0].title}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              /* onError={(e) => { e.target.src = `https://img.youtube.com/vi/${REAL_SERMONS[0].id}/hqdefault.jpg`; }} */
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-end p-8 md:p-12">
              <div>
                <span className="bg-[#c9a55a] text-black text-xs font-semibold px-3 py-1 mb-3 inline-block">
                  {lastSermons[0].scripture}
                </span>
                <h3 className="font-display text-2xl md:text-4xl text-white max-w-2xl leading-tight mb-2">
                  {lastSermons[0].title}
                </h3>
                <p className="text-white/50 text-sm">{lastSermons[0].date} · {lastSermons[0].duration}</p>
              </div>
              <div className="ml-auto">
                <div className="w-14 h-14 rounded-full border-2 border-[#c9a55a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-6 h-6 text-[#c9a55a] fill-[#c9a55a] ml-0.5" />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {lastSermons.slice(1).map((s, i) => (
              <SermonCard key={s.id} sermon={s} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ─── ABOUT / IDENTITY ─── */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Nuestra Identidad</p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6 leading-tight">
              Una iglesia edificada<br />sobre la Palabra.
            </h2>
            <div className="w-12 h-px bg-[#c9a55a] mb-8" />
            <p className="text-white/50 leading-relaxed mb-6">
              Somos una Iglesia Bautista Reformada conformada por piedras vivas en común unión en Cristo,
              llamados a predicar el evangelio al mundo.
            </p>
            <p className="text-white/50 leading-relaxed mb-10">
              Nuestra única guía es la inerrante, infalible y suficiente Biblia. Somos confesionales
              y tenemos a la Segunda Confesión Bautista de Fe de 1689 como nuestra declaración doctrinal.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/meet-us" className="flex items-center gap-2 bg-white/5 hover:bg-[#c9a55a] hover:text-black text-white/70 text-sm px-5 py-2.5 border border-white/10 hover:border-[#c9a55a] transition-all duration-200 group">
                Quiénes somos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/beliefs" className="flex items-center gap-2 border border-white/10 hover:border-[#c9a55a] text-white/50 hover:text-[#c9a55a] text-sm px-5 py-2.5 transition-all duration-200">
                Lo que creemos
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              {
                name: 'Pedro Francisco Pérez García',
                img: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/d2bfa3590_603054689_10239637937154575_4186765685569892296_n.jpg',
              },
              {
                name: 'David Eduardo Martinez Cicchini',
                img: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/be62c2002_634729718_10162168009566976_5993971085413391884_n.jpg',
              },
            ].map((pastor) => (
              <div key={pastor.name} className="group relative overflow-hidden border border-white/5 hover:border-[#c9a55a]/30 transition-colors duration-300">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={pastor.img}
                    alt={pastor.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                  <p className="text-[#c9a55a] text-[10px] tracking-[0.2em] uppercase font-semibold mb-0.5">Pstr.</p>
                  <p className="text-white text-sm font-medium leading-tight">{pastor.name}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── BELIEFS ─── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Teología Reformada</p>
            <h2 className="font-display text-4xl md:text-5xl text-white">Las Cinco Solas</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/5">
            {BELIEFS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#0a0a0a] p-8 text-center group hover:bg-[#c9a55a]/5 transition-colors duration-300"
              >
                <div className="w-10 h-10 border border-white/10 group-hover:border-[#c9a55a] flex items-center justify-center mx-auto mb-4 transition-colors">
                  <b.icon className="w-5 h-5 text-[#c9a55a]" />
                </div>
                <h3 className="font-display text-lg text-white mb-1">{b.title}</h3>
                <p className="text-white/30 text-xs">{b.sub}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="/beliefs" className="text-white/30 hover:text-[#c9a55a] text-sm transition-colors inline-flex items-center gap-2">
              Conoce más sobre lo que creemos <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── SCRIPTURE BANNER ─── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-6">1 Timoteo 1:15</p>
          <blockquote className="font-display text-2xl md:text-4xl text-white leading-relaxed italic mb-6">
            "Palabra fiel y digna de ser recibida por todos: que Cristo Jesús vino al mundo
            para salvar a los pecadores, de los cuales yo soy el primero."
          </blockquote>
          <div className="w-16 h-px bg-[#c9a55a] mx-auto" />
        </div>
      </section>

      {/* ─── SCHEDULE ─── */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-2">Agenda</p>
            <h2 className="font-display text-4xl md:text-5xl text-white">Reuniones</h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-white/30 text-sm">
            <MapPin className="w-4 h-4" />
            Alcantarilla, Murcia
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {SCHEDULE.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#0a0a0a] p-8 group hover:bg-white/3 transition-colors"
            >
              <div className="text-[#c9a55a] font-display text-5xl font-bold mb-2 opacity-30 group-hover:opacity-60 transition-opacity">
                {ev.day}
              </div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">{ev.label}</p>
              <h3 className="text-white text-xl font-medium mb-3">{ev.title}</h3>
              <div className="flex items-center gap-2 text-[#c9a55a] text-sm mb-3">
                <Clock className="w-4 h-4" />
                {ev.time}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-white/30 text-sm md:hidden">
          <MapPin className="w-4 h-4" />
          Calle Pintor José María Párraga 1, Bajo 3, Alcantarilla - Murcia
        </div>
        <p className="hidden md:block mt-4 text-white/20 text-sm">
          Calle Pintor José María Párraga 1, Bajo 3, Alcantarilla - Murcia
        </p>
      </section>

      {/* ─── SISTER CHURCHES ─── */}
      <SisterChurchesSection />


    </div>
  );
}