"use client"

import { fetchStudySeries } from '@/api/objects-fetcher';
import { BibleStudySerie } from '@/api/types';
import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabaseObjectsBaseUrl } from '@/lib/utils';

const STUDIES = [
  {
    id: 1,
    title: "Estudio del Libro de Romanos",
    book: "Romanos",
    description: "Un estudio expositivo profundo de la carta de Pablo a los Romanos. Justificación, santificación y la soberanía de Dios en la salvación.",
    lessons: 24,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Las Doctrinas de la Gracia (TULIP)",
    book: "Teología",
    description: "Estudio de los cinco puntos del calvinismo desde las Escrituras: Depravación Total, Elección, Expiación, Gracia Irresistible y Perseverancia.",
    lessons: 12,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
    featured: true,
  },
  {
    id: 3,
    title: "Confesión Bautista de Fe 1689",
    book: "Confesión",
    description: "Estudio capítulo por capítulo de la Segunda Confesión Bautista de Londres, la declaración doctrinal de nuestra iglesia.",
    lessons: 32,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80",
    featured: true,
    url: "https://www.chapellibrary.org/pdf/books/lbcos.pdf",
  },
  {
    id: 4,
    title: "El Evangelio según Juan",
    book: "Juan",
    description: "Versículo por versículo a través del Evangelio de Juan. La divinidad de Cristo y el llamado a creer.",
    lessons: 28,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/ea5082c56_generated_image.png",
  },
  {
    id: 5,
    title: "Efesios: Riquezas en Cristo",
    book: "Efesios",
    description: "Bendiciones espirituales, la unidad de la iglesia y la vida práctica del creyente.",
    lessons: 16,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/6a4a03fe2_generated_image.png",
  },
  {
    id: 6,
    title: "Hermenéutica Bíblica",
    book: "Metodología",
    description: "Principios fundamentales para la correcta interpretación de las Escrituras.",
    lessons: 8,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/28eaf62fe_generated_image.png",
  },
];

export default function Estudios() {
  const featured = STUDIES.filter(s => s.featured);
  const regular = STUDIES.filter(s => !s.featured);

  const [lastStudySeries, setLastStudySeries] = useState<BibleStudySerie[]>();
  const [studySeries, setStudySeries] = useState<BibleStudySerie[]>();

  useEffect(() => {
    async function loadLastStudySeries(){
      const data = await fetchStudySeries({limit:3});
      setLastStudySeries(data);
    }
    loadLastStudySeries();
  }, [])

  useEffect(() => {
    async function loadStudySeries(){
      const exlcude = lastStudySeries?.map((study) => study.id)
      const data = await fetchStudySeries({limit:3, exclude:exlcude});
      setStudySeries(data);
    }
    loadStudySeries();
  }, [lastStudySeries])
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-16">
      {/* Header */}
      <div className="border-b border-white/5 pt-16 pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Recursos</p>
          <h1 className="font-display text-5xl md:text-6xl text-white">Estudios<br />Bíblicos</h1>
        </div>
      </div>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-8">Destacados</p>
        <div className="grid lg:grid-cols-3 gap-px bg-white/5">
          {lastStudySeries && lastStudySeries.map((study, i) => (
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
                    {study.tags.map((tag, index) => (
                      <span key={index} className="bg-[#c9a55a] text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">{tag.name}</span>
                    ))}
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

      {/* Regular */}
      <section className="border-t border-white/5 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-8">Más estudios</p>
        <div className="space-y-px bg-white/5">
          {studySeries && studySeries.map((study, i) => (
            <a key={study.id} href={`studies/${study.id}`}>
              <motion.div               
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-[#0a0a0a] p-6 grid sm:grid-cols-[100px_1fr_auto] gap-4 items-center group hover:bg-white/2 transition-colors"
              >
                <div className="overflow-hidden w-24 h-16 flex-shrink-0 hidden sm:block">
                  <img src={`${supabaseObjectsBaseUrl}${study.thumbnail}`} alt={study.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>
                <div>
                  {study.tags.map((tag, index) => (
                    <span key={index} className="text-[#c9a55a] text-[10px] uppercase tracking-widest">{tag.name}</span>
                  ))}
                  <h3 className="text-white text-sm font-medium mt-0.5 group-hover:text-[#c9a55a] transition-colors">{study.title}</h3>
                  <p className="text-white/25 text-xs mt-1 line-clamp-1">{study.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/20 text-xs hidden md:block">12 lecciones</span>
                  {/* {study.url ? (
                    <a href={study.url} target="_blank" rel="noopener noreferrer" className="text-[#c9a55a] hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <div className="w-4 h-4" />
                  )} */}
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}