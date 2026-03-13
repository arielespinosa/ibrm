import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Download, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function StudiesSection({ studies = [] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Placeholder studies
  const placeholderStudies = [
    {
      id: 1,
      title: "Estudio del Libro de Romanos",
      book: "Romanos",
      description: "Un estudio profundo de la carta de Pablo a los Romanos, explorando la justificación por la fe.",
      lessons_count: 24,
      image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80"
    },
    {
      id: 2,
      title: "Doctrinas de la Gracia",
      book: "Teología",
      description: "Estudio sistemático de las doctrinas reformadas conocidas como los Cinco Puntos del Calvinismo.",
      lessons_count: 12,
      image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80"
    },
    {
      id: 3,
      title: "Confesión de Fe 1689",
      book: "Confesión",
      description: "Estudio capítulo por capítulo de la Segunda Confesión Bautista de Londres.",
      lessons_count: 32,
      image_url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80"
    }
  ];

  const studiesToShow = studies.length > 0 ? studies.slice(0, 3) : placeholderStudies;

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-amber-600 tracking-[0.3em] uppercase text-sm font-medium">
            Recursos
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-4 mb-6">
            Estudios Bíblicos
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6">
            Materiales de estudio para profundizar en el conocimiento de las Escrituras
          </p>
        </motion.div>

        {/* Studies Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {studiesToShow.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={study.image_url || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80"}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-amber-500 text-white px-3 py-1 text-sm font-medium">
                    {study.book}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {study.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {study.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {study.lessons_count} lecciones
                  </span>
                  {study.document_url && (
                    <a href={study.document_url} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-600 hover:text-amber-700 p-0"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Descargar
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a href="/studies">
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600 px-8 py-6 rounded-none group"
            >
              Ver todos los estudios
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}