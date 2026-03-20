"use client"

import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="relative pt-32 pb-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/rsc/img/who-we-are-cover.png" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Conócenos</p>
          <h1 className="font-display text-5xl md:text-7xl text-white mb-6">Quiénes<br />Somos</h1>
          <div className="w-12 h-px bg-[#c9a55a]" />
        </div>
      </div>

      {/* Identity */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            key="identity"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <div className="space-y-5 text-white/50 text-base leading-relaxed">
              <p>
                Somos una <span className="text-white">Iglesia Bautista Reformada</span> en la ciudad de Murcia, España. 
                Conformada por piedras vivas en común unión en Cristo, llamados a predicar el evangelio al mundo.
              </p>
              <p>
                Nuestra única guía es la inerrante, infalible y suficiente Biblia. Como iglesia confesional, 
                sostenemos la <a href="https://www.chapellibrary.org/pdf/books/lbcos.pdf" target="_blank" rel="noopener noreferrer" className="text-[#c9a55a]">
                  Segunda Confesión Bautista de Fe de 1689
                </a>, que expresa fielmente las doctrinas bíblicas de la fe cristiana reformada.
              </p>
              <p>
                Creemos en la predicación expositiva y sistemática de la Palabra de Dios como el medio 
                principal que Dios usa para edificar su iglesia y transformar vidas.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/beliefs"
                className="flex items-center gap-2 bg-[#c9a55a] hover:bg-[#b8944a] text-black text-sm font-medium px-5 py-2.5 transition-colors group"
              >
                Nuestras Creencias
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div
            key="image"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="group relative overflow-hidden border border-white/5 hover:border-[#c9a55a]/30 transition-colors duration-300">
              <div className="overflow-hidden">
                <img
                  src="/rsc/img/congregation.jpeg"
                  alt="Congregación de la Iglesia Bautista Reformada de Murcia"
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values grid */}
      <section className="border-t border-white/5 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Lo que nos define</p>
            <h2 className="font-display text-3xl text-white">Nuestros Valores</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {[
              { n: '01', title: 'La Biblia', desc: 'La Escritura es nuestra única regla de fe y práctica. Todo lo que creemos y hacemos está sometido a su autoridad.' },
              { n: '02', title: 'El Evangelio', desc: 'Predicamos a Cristo crucificado y resucitado como el único camino de salvación para los pecadores.' },
              { n: '03', title: 'La Comunidad', desc: 'Somos una familia comprometida con el cuidado mutuo, la edificación y el crecimiento espiritual.' },
              { n: '04', title: 'La Adoración', desc: 'Adoramos a Dios en espíritu y en verdad, con reverencia y gozo, guiados por las Escrituras.' },
              { n: '05', title: 'El Discipulado', desc: 'Nos comprometemos a crecer en el conocimiento de Dios y a formar discípulos maduros en Cristo.' },
              { n: '06', title: 'La Misión', desc: 'Creemos en la responsabilidad de llevar el evangelio a nuestra ciudad y al mundo.' },
            ].map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-[#0a0a0a] p-8 group hover:bg-white/2 transition-colors"
              >
                <div className="font-display text-3xl text-[#c9a55a]/20 group-hover:text-[#c9a55a]/50 font-bold mb-4 transition-colors">{v.n}</div>
                <h3 className="text-white text-lg font-medium mb-3">{v.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule / Location */}
      <section className="border-t border-white/5 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-6">Horarios</p>
              <div className="space-y-4">
                {[
                  { day: 'Domingo', time: '11:30 AM', event: 'Culto Congregacional' },
                  { day: 'Jueves', time: '18:00 PM', event: 'Estudio Bíblico y Oración' },
                ].map(ev => (
                  <div key={ev.event} className="flex items-center gap-6 py-4 border-b border-white/5">
                    <span className="text-[#c9a55a] font-display text-xl w-20">{ev.day}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{ev.event}</p>
                      <p className="text-white/30 text-xs flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {ev.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-6">Ubicación</p>
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="w-4 h-4 text-[#c9a55a] flex-shrink-0 mt-1" />
                <a
                  target="_blank"
                  rel="noopener noreferrer" 
                  href='https://www.google.com/maps/place/IGLESIA+BAUTISTA+REFORMADA+DE+MURCIA/@37.973111,-1.220111,16z/data=!4m6!3m5!1s0xd648126c37b4e9d:0x91368909031a3d45!8m2!3d37.9710936!4d-1.2171174!16s%2Fg%2F11scc7t_pz?hl=es-ES&entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D'>
                  
                  <p className="text-white/50 text-sm leading-relaxed">
                    Calle Pintor José María Párraga 1, Bajo 3, Alcantarilla, Murcia
                  </p>
                </a>
              </div>
              <div className="aspect-video bg-zinc-900 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=37.9710936,-1.2171174&z=16&output=embed"
                  width="100%" height="100%"
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.8)' }}
                  allowFullScreen loading="lazy"
                  title="Ubicación"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}