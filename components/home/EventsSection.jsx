import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, MapPin, Calendar } from 'lucide-react';

const defaultEvents = [
  {
    id: 1,
    title: 'Culto Congregacional',
    day_of_week: 'domingo',
    time: '11:30 AM',
    location: 'Calle Pintor José María Párraga 1, Bajo 3, Alcantarilla',
    description: 'Reunión principal de adoración y predicación de la Palabra',
    recurring: true
  },
  {
    id: 2,
    title: 'Estudio Bíblico',
    day_of_week: 'jueves',
    time: '18:00 PM',
    location: 'Calle Pintor José María Párraga 1, Bajo 3, Alcantarilla',
    description: 'Estudio profundo de las Escrituras',
    recurring: true
  },
  {
    id: 3,
    title: 'Reunión de Oración',
    day_of_week: 'jueves',
    time: '18:00 PM',
    location: 'Calle Pintor José María Párraga 1, Bajo 3, Alcantarilla',
    description: 'Tiempo de oración congregacional',
    recurring: true
  }
];

export default function EventsSection({ events = [] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const eventsToShow = events.length > 0 ? events : defaultEvents;

  const dayColors = {
    domingo: 'from-amber-500 to-amber-600',
    lunes: 'from-blue-500 to-blue-600',
    martes: 'from-green-500 to-green-600',
    miércoles: 'from-purple-500 to-purple-600',
    jueves: 'from-rose-500 to-rose-600',
    viernes: 'from-cyan-500 to-cyan-600',
    sábado: 'from-orange-500 to-orange-600'
  };

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 tracking-[0.3em] uppercase text-sm font-medium">
            Agenda
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 mb-6">
            Nuestras Reuniones
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {eventsToShow.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-amber-500/50 transition-colors duration-300 group"
            >
              {/* Day Header */}
              <div className={`bg-gradient-to-r ${dayColors[event.day_of_week] || dayColors.domingo} p-4`}>
                <h3 className="text-white font-serif text-2xl capitalize">
                  {event.day_of_week}
                </h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-white font-serif text-xl mb-4 group-hover:text-amber-400 transition-colors">
                  {event.title}
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-start gap-3 text-gray-400">
                    <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                {event.description && (
                  <p className="text-gray-500 text-sm mt-4 pt-4 border-t border-white/10">
                    {event.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-6 py-3 rounded-full">
            <MapPin className="w-5 h-5 text-amber-400" />
            <span className="text-white">
              Calle Pintor José María Párraga 1, Bajo 3, Alcantarilla - Murcia
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}