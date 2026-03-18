"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin } from 'lucide-react';
import { fetchSisterChurch } from '@/api/objects-fetcher';
import { SisterChurch } from '@/api/types';
import { supabaseObjectsBaseUrl } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


export default function SisterChurchesSection() {
  const [churchs, setChurchs] = useState<SisterChurch[]>([]);

  useEffect(() => {
    async function loadSisterChurch(){
      const data = await fetchSisterChurch();
      setChurchs(data);
    }
    loadSisterChurch();
    
  }, []) 

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
          {churchs && churchs.map((church, i) => (
            <motion.div
              key={church.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-white/5 hover:border-[#c9a55a]/20 transition-colors group flex flex-col"
            >
              {/* Photo */}
              {church.cover_url && (
                <div className="overflow-hidden aspect-video">
                  <img
                    src={`${supabaseObjectsBaseUrl}${church.cover_url}`}
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
                  {church.pastors.map(pastor => (
                     <div key={pastor.id} className="flex items-center gap-3">
                        <Avatar className="w-15 h-15">
                          <AvatarImage src={`${supabaseObjectsBaseUrl}${pastor.avatar}`} alt={pastor.name} />
                          <AvatarFallback>{pastor.name}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-white/80 text-sm font-medium">Pr. {pastor.name}</span>
                          <span className="text-[#c9a55a]/60 text-xs tracking-wide">{pastor.email}</span>
                        </div>
                      </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-white/30 text-xs pb-5">
                  <MapPin className="w-3.5 h-3.5 text-[#c9a55a]/50" />
                  {church.location}
                </div>
                <a
                  href={church.website_url}
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