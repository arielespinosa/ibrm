"use client";

import { fetchStudy } from '@/api/objects-fetcher';
import { BibleStudy } from '@/api/types';
import { Skeleton } from '@/components/ui/skeleton';
import { supabaseObjectsBaseUrl } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { MarkdownRenderer } from '@/components/custom/markdown';
import StudySerieCardList from '@/components/studies/study-card';


export default function StudyDetaillPage() {
  const { id } = useParams();
  const [study, setStudy] = useState<BibleStudy | null>(null);
  const [studySerie, setStudySerie] = useState<BibleStudy[] | null>(null);
  const [studyDate, setStudyDate] = useState("");

  async function loadStudy() {
    const data = await fetchStudy({pk: id});
    setStudy(data[0]);
  }

  async function loadStudySerie(serieId:number) {
    const data = await fetchStudy({filter: [{field: "serie_id", value: serieId}]});
    setStudySerie(data);
  }

  useEffect(() => {
   
    loadStudy();

  },[])

  useEffect(() => {
    if(!study)
      return
    const date = new Date(study.created);
    const formatted = format(date, "d 'de' MMMM yyyy, HH:mm", { locale: es });
    setStudyDate(formatted);
    if(study.serie_id)
      loadStudySerie(study.serie_id);
  },[study])

  if(!study)
    return (
      <Skeleton className="aspect-video w-full" />
    )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={`${supabaseObjectsBaseUrl}${study.thumbnail}`}
          alt={study.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 pb-12 max-w-7xl mx-auto">
          <span className="bg-[#c9a55a] text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest inline-block mb-4">
            {study.serie?.title}
          </span>
          <h1 className="font-display text-3xl md:text-5xl text-white leading-tight">
            {study.title}
          </h1>
        </div>
      </div>

      {/* Meta */}
      <div className="max-w-7xl mx-auto py-8 border-b border-white/5">
        <div className="flex flex-wrap items-center gap-6 text-white/30 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#c9a55a]" />
            <span>{study.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#c9a55a]" />
            <span>{studyDate}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto py-12"
      >
        <div className='flex'>
          <div className='w-2/3'>
            <div className="space-y-6">
              <MarkdownRenderer content={study.content}/>
            </div>
            <div className="mt-16 pt-8 border-t border-white/5">
              <a href="/studies" className="inline-flex items-center gap-2 text-white/30 hover:text-[#c9a55a] text-sm transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />Volver
              </a>
            </div>
          </div>
          <div className='w-1/3'>
          {studySerie && 
            <StudySerieCardList serieStudies={studySerie} />
          }
          </div>
        </div>
      </motion.div>
    </div>
  );
}