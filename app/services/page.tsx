
"use client"

import { fetchSermonSeries, fetchStudySeries } from '@/api/objects-fetcher';
import { BibleStudySerie, SermonSerie } from '@/api/types';
import { motion } from 'framer-motion';
import { Clock, MapPin,ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

const MAPS_URL = 'https://maps.app.goo.gl/TBjLMjPiat1NfkqN6';

const STUDY_GROUPS = [
  {
    city: 'Alcantarilla',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/a3a3a64c6_WhatsAppImage2026-03-02at180835.jpg',
    description: 'Grupo de estudio bíblico y oración en Alcantarilla. Nos reunimos para profundizar en la Palabra de Dios y elevar juntos nuestra oración.',
    schedule: 'Jueves · 18:00 PM',
    mapsUrl: MAPS_URL,
  },
  {
    city: 'Totana',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/ade58755a_WhatsAppImage2026-03-02at180927.jpg',
    description: 'Grupo de estudio bíblico y oración en Totana. Un tiempo dedicado a la Escritura, la comunión y la intercesión. ¡Qué el Señor envíe obreros a la mies!',
    schedule: 'Jueves · 18:00 PM',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Totana+Murcia',
  },
  {
    city: 'Hellín',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/d243e3d76_WhatsAppImage2026-03-02at1808351.jpg',
    description: 'Grupo de estudio bíblico y oración en Hellín. Compartimos la Palabra de Dios y nos edificamos mutuamente en la fe. Te esperamos.',
    schedule: 'Jueves · 18:00 PM',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hellín+Albacete',
  },
];

const LITURGY = [
  { n: '01', title: 'Llamado a la Adoración', desc: 'Inicio del culto con un saludo litúrgico y lectura bíblica que convoca a la congregación a adorar a Dios.' },
  { n: '02', title: 'Devocional para niños', desc: 'Instrucción de los niños en la congregación siguiendo alguno de los catecismos históricos para los niños (Domingos alternos)' },
  { n: '03', title: 'Escuela dominical', desc: 'Estudio bíblico expositivo y continuo (Domingos alternos)' },
  { n: '04', title: 'Himnos de Adoración', desc: 'Canto congregacional de himnos que exaltan la gloria, la soberanía y la gracia de Dios.' },
  { n: '05', title: 'Oración de Confesión', desc: 'La congregación se humilla ante Dios confesando sus pecados y recibiendo el perdón en Cristo.' },
  { n: '06', title: 'Lectura de la Escritura', desc: 'Lectura pública del texto bíblico que será expuesto en el sermón.' },
  { n: '07', title: 'Predicación de la Palabra', desc: 'Exposición expositiva y sistemática de la Biblia, corazón del culto reformado.' },
  { n: '08', title: 'Cena del Señor', desc: 'Celebración periódica del sacramento instituido por Cristo para su iglesia. (Domingos alternos)' },
  { n: '09', title: 'Ofrenda y Comisión', desc: 'La congregación responde con gratitud y es enviada a vivir el evangelio en el mundo.' },
];

export default function Reuniones() {
  const [currentStudySerie, setCurrentStudySerie] = useState<BibleStudySerie>();
  const [currentSermonSeries, setCurrentSermonSeries] = useState<SermonSerie[]>();

  async function loadCurrentStudy() {
    const data = await fetchStudySeries({filter:[{field: "is_current_dominical", value:true}]})
    setCurrentStudySerie(data[0]);
  }

  async function loadCurrentSermonSeries() {
    const data = await fetchSermonSeries({limit: 2, filter:[{field: "is_current_dominical", value:true}]})
    setCurrentSermonSeries(data);
  }
  
  useEffect(() =>{
    loadCurrentStudy();
    loadCurrentSermonSeries();
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Header */}
      <div className="relative pt-32 pb-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/rsc/img/meetings-cover.png" alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Vida de Iglesia</p>
          <h1 className="font-display text-5xl md:text-7xl text-white mb-6">Cultos y <br/> Reuniones</h1>
          <div className="w-12 h-px bg-[#c9a55a]" />
        </div>
      </div>

      {/* ── CULTO CONGREGACIONAL ── */}
      <section className="border-t border-white/5 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Cada Domingo</p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Culto<br />Congregacional</h2>
              <div className="w-10 h-px bg-[#c9a55a] mb-8" />

              <p className="text-white/50 leading-relaxed mb-5">
                El culto del domingo es el corazón de nuestra vida como iglesia. Es el día que Dios aparta para que su pueblo se congregue, 
                le adore, escuche su Palabra y sea edificado en la fe. <span className="text-white">No te prives de este bien.</span>
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                Creemos que la predicación expositiva de la Biblia es el medio principal que Dios usa para transformar vidas. 
                Cada domingo exponemos las Escrituras con fidelidad, exaltando a Cristo como el centro de toda la Revelación.
              </p>

              {/* Current study */}
              {currentStudySerie && (
                <a href={`/studies/${currentStudySerie.id}`}>
                  <div className="border border-[#c9a55a]/20 bg-[#c9a55a]/5 p-6 mb-8">
                    <p className="text-[#c9a55a] text-xs tracking-[0.2em] uppercase mb-2">Serie actual de estudio en el Culto</p>
                    <h3 className="text-white text-xl font-display mb-1">{currentStudySerie.title}</h3>
                    <p className="text-white/40 text-sm">{currentStudySerie.description}</p>
                  </div>
                </a>
              )}

              {currentSermonSeries && (
                <div className="border border-[#c9a55a]/20 bg-[#c9a55a]/5 p-6 mb-8">
                  <p className="text-[#c9a55a] text-xs tracking-[0.2em] uppercase mb-2">Serie actual de sermones en el Culto</p>
                  {currentSermonSeries.map((serie) => (
                    <div key={serie.id} className='pb-4'>
                      <a href={`/studies/${serie.id}`}>              
                        <h3 className="text-white text-xl font-display mb-1">{serie.title}</h3>
                        <p className="text-white/40 text-sm">{serie.description}</p>
                      </a>
                    </div>
                  ))}
                  
                </div>
              )}

              {/* Schedule & Location */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white/3 border border-white/8 px-5 py-3">
                  <Clock className="w-4 h-4 text-[#c9a55a]" />
                  <div>
                    <p className="text-white text-sm font-medium">Domingos · 11:30 AM</p>
                    <p className="text-white/30 text-xs">Culto de Adoración y Predicación</p>
                  </div>
                </div>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/3 border border-white/8 hover:border-[#c9a55a]/40 px-5 py-3 transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-[#c9a55a]" />
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-[#c9a55a] transition-colors">Calle Pintor J.M. Párraga 1</p>
                    <p className="text-white/30 text-xs">Alcantarilla, Murcia · Ver en Mapa</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-[#c9a55a] transition-colors ml-1" />
                </a>
              </div>
            </motion.div>

            {/* Liturgy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-6">Orden de la Liturgia</p>
              <div className="space-y-px bg-white/3">
                {LITURGY.map((item, i) => (
                  <motion.div
                    key={item.n}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-[#0a0a0a] p-5 flex gap-4 group hover:bg-white/2 transition-colors"
                  >
                    <span className="font-display text-2xl text-[#c9a55a]/20 group-hover:text-[#c9a55a]/50 font-bold flex-shrink-0 w-8 transition-colors">{item.n}</span>
                    <div>
                      <h4 className="text-white text-sm font-medium mb-1">{item.title}</h4>
                      <p className="text-white/30 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ESTUDIO Y ORACIÓN JUEVES ── */}
      <section className="border-t border-white/5 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Cada Jueves · 18:00 PM</p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-3">Estudio Bíblico<br />y Oración</h2>
            <p className="text-white/30 text-sm max-w-2xl leading-relaxed mt-4">
              Los jueves nos reunimos en grupos para estudiar la Palabra de Dios y orar juntos. 
              Estos grupos funcionan como pequeñas comunidades de discipulado, cuidado mutuo y crecimiento espiritual. 
              Actualmente se están llevando a cabo en tres ciudades.
            </p>
            <div className="mt-4 inline-block border border-[#c9a55a]/20 bg-[#c9a55a]/5 px-5 py-3">
              <p className="text-[#c9a55a] text-xs tracking-[0.2em] uppercase mb-1">Estudio actual en los grupos</p>
              <p className="text-white text-sm font-medium">Evangelio según Juan — Lectura y exposición</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {STUDY_GROUPS.map((group, i) => (
              <motion.div
                key={group.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0a] group"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={group.image}
                    alt={`Estudio y Oración ${group.city}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-[#c9a55a] text-xs tracking-widest uppercase font-semibold">Ministerio IBRM</p>
                    <h3 className="font-display text-2xl text-white">{group.city}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-white/40 text-sm leading-relaxed mb-5">{group.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/50 text-xs">
                      <Clock className="w-3.5 h-3.5 text-[#c9a55a]" />
                      {group.schedule}
                    </div>
                    <a
                      href={group.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[#c9a55a]/60 hover:text-[#c9a55a] text-xs transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      Ver ubicación
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REUNIONES DE HOMBRES ── */}
      <section className="border-t border-white/5 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Último Sábado del Mes</p>
              <h2 className="font-display text-4xl text-white mb-4">Reunión de<br />Hombres</h2>
              <div className="w-10 h-px bg-[#c9a55a] mb-6" />
              <p className="text-white/50 leading-relaxed mb-6">
                Los hombres de la iglesia nos reunimos el último sábado de cada mes para rendir cuentas mutuamente, 
                estudiar la Palabra, orar juntos y exhortarnos a vivir como hombres conforme al evangelio: esposos, 
                padres, hijos y siervos fieles.
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                Es un espacio de comunión fraternal, crecimiento espiritual y edificación mutua, 
                donde los hombres se animan unos a otros en el camino de la fe.
              </p>
              <div className="flex items-center gap-3 bg-white/3 border border-white/8 px-5 py-3 w-fit">
                <Clock className="w-4 h-4 text-[#c9a55a]" />
                <p className="text-white text-sm font-medium">Último sábado de cada mes</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative overflow-hidden aspect-square bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                  alt="Reunión de hombres"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="w-10 h-px bg-[#c9a55a] mb-3" />
                  <p className="font-display text-2xl text-white">Hombres del Evangelio</p>
                  <p className="text-white/40 text-sm mt-1">Conforme a la imagen de Cristo</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── REUNIONES DE MUJERES ── */}
      <section className="border-t border-white/5 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <div className="relative overflow-hidden aspect-square bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=800&q=80"
                  alt="Reunión de mujeres"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-[#0a0a0a]/80 to-transparent" />
                <div className="absolute bottom-6 right-6 text-right">
                  <div className="w-10 h-px bg-[#c9a55a] mb-3 ml-auto" />
                  <p className="font-display text-2xl text-white">Mujeres del Evangelio</p>
                  <p className="text-white/40 text-sm mt-1">Conforme al modelo bíblico</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Último Sábado del Mes</p>
              <h2 className="font-display text-4xl text-white mb-4">Reunión de<br />Mujeres</h2>
              <div className="w-10 h-px bg-[#c9a55a] mb-6" />
              <p className="text-white/50 leading-relaxed mb-6">
                Las mujeres de la iglesia nos reunimos el último sábado de cada mes en un espacio de comunión, 
                estudio bíblico y oración. Exploramos juntas lo que significa ser mujer según las Escrituras: 
                en el hogar, la iglesia y el mundo.
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                Es un tiempo de edificación mutua, donde compartimos luchas, alegrías y la gracia que sostiene 
                a toda mujer que camina en el evangelio.
              </p>
              <div className="flex items-center gap-3 bg-white/3 border border-white/8 px-5 py-3 w-fit">
                <Clock className="w-4 h-4 text-[#c9a55a]" />
                <p className="text-white text-sm font-medium">Último sábado de cada mes</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}