import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Cross, Sparkles, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const beliefs = [
  {
    icon: BookOpen,
    title: 'Sola Scriptura',
    latin: 'Solo la Escritura',
    description: 'La Biblia es la única autoridad infalible para la fe y la práctica cristiana.'
  },
  {
    icon: Cross,
    title: 'Solus Christus',
    latin: 'Solo Cristo',
    description: 'Cristo es el único mediador entre Dios y los hombres, nuestro único Salvador.'
  },
  {
    icon: Sparkles,
    title: 'Sola Gratia',
    latin: 'Solo por Gracia',
    description: 'La salvación es un don gratuito de Dios, no algo que podamos merecer.'
  },
  {
    icon: Shield,
    title: 'Sola Fide',
    latin: 'Solo por Fe',
    description: 'Somos justificados únicamente por la fe en Cristo, no por nuestras obras.'
  },
  {
    icon: Heart,
    title: 'Soli Deo Gloria',
    latin: 'Solo a Dios la Gloria',
    description: 'Todo lo que hacemos debe ser para la gloria de Dios únicamente.'
  }
];

export default function BeliefsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80"
          alt="Church background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-gray-900" />
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
            Lo que creemos
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 mb-6">
            Las Cinco Solas de la Reforma
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
            Fundamentamos nuestra fe en los principios recuperados durante la Reforma Protestante
          </p>
        </motion.div>

        {/* Beliefs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {beliefs.map((belief, index) => (
            <motion.div
              key={belief.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 group ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="w-14 h-14 border border-amber-500/30 rounded-full flex items-center justify-center mb-6 group-hover:border-amber-500 transition-colors">
                <belief.icon className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-1">{belief.title}</h3>
              <p className="text-amber-400 text-sm italic mb-4">{belief.latin}</p>
              <p className="text-gray-400 leading-relaxed">{belief.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Scripture Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center border border-amber-500/20 bg-amber-500/5 p-8 md:p-12"
        >
          <p className="text-white text-xl md:text-2xl font-serif italic mb-4 leading-relaxed">
            "Palabra fiel y digna de ser recibida por todos: que Cristo Jesús vino al mundo 
            para salvar a los pecadores, de los cuales yo soy el primero."
          </p>
          <p className="text-amber-400 font-medium">— 1 Timoteo 1:15</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10 px-8 py-6 rounded-none tracking-wide"
            onClick={() => window.open('https://www.chapellibrary.org/pdf/books/lbcos.pdf', '_blank')}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Leer Confesión de Fe 1689
          </Button>
        </motion.div>
      </div>
    </section>
  );
}