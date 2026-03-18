"use client"

import { fetchStudy, fetchStudySeries } from '@/api/objects-fetcher';
import { BibleStudy, BibleStudySerie } from '@/api/types';
import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabaseObjectsBaseUrl } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudySerieDetaillPage() {
  const { id } = useParams();
  const [serie, setSerie] = useState<BibleStudySerie>();
  const [studies, setStudies] = useState<BibleStudy[]>();

  useEffect(() => {
    async function loadSerie(){
      const data = await fetchStudySeries({pk: id});
      console.log(data);
      setSerie(data[0]);
    }
    loadSerie();
  }, [])

  useEffect(() => {
    async function loadStudies(){
      const data = await fetchStudy({filter: [{field: "serie_id", value: id}]});
      setStudies(data);
    }
    loadStudies();
  }, [serie])

  if(!serie)
    return (
      <Skeleton className="aspect-video w-full" />
    )
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-16">
      {/* Header */}
      <div className="border-b border-white/5 pt-16 pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Serie</p>
          <h1 className="font-display text-5xl md:text-6xl text-white">{serie.title}</h1>
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-8">Destacados</p>
        <div className="grid lg:grid-cols-3 gap-px bg-white/5">
          {studies && studies.map((study, i) => (
            <a key={study.id} href={`studies/${study.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0a] group hover:bg-white/2 transition-colors"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={`${supabaseObjectsBaseUrl}${study.thumbnail}`}
                    alt={study.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                 {/*    {study.tags.map((tag, index) => (
                      <span key={index} className="bg-[#c9a55a] text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">{tag.name}</span>
                    ))} */}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white text-lg font-medium mb-2 group-hover:text-[#c9a55a] transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-white/30 text-sm leading-relaxed mb-4 line-clamp-2">{study.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/20 text-xs flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      12 lecciones
                    </span>
                    {/* {study.url && (
                      <a
                        href={study.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#c9a55a] text-xs hover:underline"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Descargar PDF
                      </a>
                    )} */}
                  </div>
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}