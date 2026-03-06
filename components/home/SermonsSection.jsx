import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function SermonsSection({ sermons = [] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const displaySermons = sermons.slice(0, 3);

  // Placeholder sermons if none exist
  const placeholderSermons = [
    {
      id: 1,
      title: "La Soberanía de Dios en la Salvación",
      preacher: "Pastor",
      date: "2024-01-21",
      scripture: "Efesios 1:3-14",
      thumbnail_url: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80"
    },
    {
      id: 2,
      title: "Cristo, Nuestra Única Esperanza",
      preacher: "Pastor",
      date: "2024-01-14",
      scripture: "Romanos 8:28-39",
      thumbnail_url: "https://images.unsplash.com/photo-1445633743309-b60418bedbf2?w=600&q=80"
    },
    {
      id: 3,
      title: "La Fidelidad de Dios",
      preacher: "Pastor",
      date: "2024-01-07",
      scripture: "Lamentaciones 3:22-26",
      thumbnail_url: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&q=80"
    }
  ];

  const sermonsToShow = displaySermons.length > 0 ? displaySermons : placeholderSermons;

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <span className="text-amber-600 tracking-[0.3em] uppercase text-sm font-medium">
              Predicaciones
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-4">
              Últimos Sermones
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mt-6" />
          </div>
          <Link to={createPageUrl('Sermones')}>
            <Button
              variant="ghost"
              className="mt-6 md:mt-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50 group"
            >
              Ver todos los sermones
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Sermons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermonsToShow.map((sermon, index) => (
            <motion.div
              key={sermon.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden mb-6">
                <img
                  src={sermon.thumbnail_url || "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80"}
                  alt={sermon.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
                {/* Scripture Tag */}
                {sermon.scripture && (
                  <div className="absolute bottom-4 left-4 bg-amber-600 text-white px-3 py-1 text-sm">
                    {sermon.scripture}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {sermon.date && format(new Date(sermon.date), "d 'de' MMMM, yyyy", { locale: es })}
                </div>
                {sermon.preacher && (
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {sermon.preacher}
                  </div>
                )}
              </div>
              <h3 className="font-serif text-xl text-gray-900 group-hover:text-amber-600 transition-colors">
                {sermon.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* YouTube CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-none"
            onClick={() => window.open('https://www.youtube.com/@Iglesia-ibrm', '_blank')}
          >
            <Play className="w-5 h-5 mr-2" />
            Ver en YouTube
          </Button>
        </motion.div>
      </div>
    </section>
  );
}