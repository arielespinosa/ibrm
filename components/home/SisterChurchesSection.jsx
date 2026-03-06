import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin } from 'lucide-react';

const SISTER_CHURCHES = [
  {
    name: 'Iglesia Bíblica Coram Deo',
    description: 'Iglesia Evangélica Reformada en Cartagena, Murcia. Unidos en la fe reformada y la proclamación del evangelio.',
    location: 'Cartagena, Murcia',
    pastors: ['Pr. Paco Torres'],
    url: 'https://www.iglesiabiblicacoramdeo.com/',
    logo: 'https://static.wixstatic.com/media/d473fc_5306754a485248c3b62e7ab59e8f2313~mv2.png/v1/fill/w_149,h_58,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo%20cabecera%20rp.png',
    photo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/7079d417d_image.png',
  },
];

export default function SisterChurchesSection() {
  return (
    <section className="py-24 border-t border-white/5 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Comunidad</p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-3">Iglesias Hermanas</h2>
          <p className="text-white/30 text-sm max-w-xl">
            Iglesias con las que compartimos fe, confesión y comunión en el evangelio de Jesucristo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SISTER_CHURCHES.map((church, i) => (
            <motion.div
              key={church.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-white/5 hover:border-[#c9a55a]/20 transition-colors group flex flex-col"
            >
              {/* Photo */}
              {church.photo && (
                <div className="overflow-hidden aspect-video">
                  <img
                    src={church.photo}
                    alt={`${church.name} - fachada`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Info */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white text-base font-medium mb-1 group-hover:text-[#c9a55a] transition-colors leading-tight">
                  {church.name}
                </h3>
                <p className="text-white/30 text-sm leading-relaxed mb-4 flex-1">
                  {church.description}
                </p>

                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-white/30 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#c9a55a]/50" />
                    {church.location}
                  </div>
                  {church.pastors.map(p => (
                    <div key={p} className="text-[#c9a55a]/60 text-xs tracking-wide">{p}</div>
                  ))}
                </div>

                <a
                  href={church.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#c9a55a] text-xs hover:gap-3 transition-all w-fit"
                >
                  Visitar iglesia
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}