import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Book, Users, Heart, Clock } from 'lucide-react';

const features = [
  {
    icon: Book,
    title: 'Escritura',
    description: 'La Biblia como única regla de fe y conducta'
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Piedras vivas en común unión en Cristo'
  },
  {
    icon: Heart,
    title: 'Evangelio',
    description: 'Llamados a predicar el evangelio al mundo'
  },
  {
    icon: Clock,
    title: 'Tradición',
    description: 'Confesión Bautista de Fe de 1689'
  }
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-600 tracking-[0.3em] uppercase text-sm font-medium">
              Nuestra Identidad
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-4 mb-6 leading-tight">
              Una Iglesia fundada en la <span className="text-amber-600">Palabra de Dios</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mb-8" />
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Somos una Iglesia Bautista Reformada conformada por piedras vivas en común unión 
              en Cristo, llamados a predicar el evangelio al mundo.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Nuestra única guía es la inerrante, infalible y suficiente Biblia. Somos confesionales 
              y tenemos a la Segunda Confesión Bautista de Fe de 1689 como nuestra declaración doctrinal.
            </p>

            {/* Meeting Times */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="font-serif text-xl text-gray-900 mb-4">Nuestras Reuniones</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-gray-700">Culto Congregacional: <strong>Domingos 11:30 am</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-gray-700">Oración y Estudio: <strong>Jueves 18:00 pm</strong></span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1519491050282-cf00c82424bf?w=800&q=80"
                alt="Biblia abierta"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Decorative Frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-amber-500" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-amber-500" />
            </div>

            {/* Quote Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-8 -left-8 bg-amber-600 text-white p-6 max-w-xs shadow-xl"
            >
              <p className="italic font-serif text-lg">
                "La Biblia es nuestra única regla y autoridad en cuestiones de fe y conducta"
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 border border-amber-200 rounded-full flex items-center justify-center group-hover:bg-amber-50 transition-colors">
                <feature.icon className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-serif text-xl text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}