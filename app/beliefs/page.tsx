"use client"

import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';

const SOLAS = [
  {
    latin: 'Sola Scriptura',
    spanish: 'Solo la Escritura',
    n: '01',
    description: 'La Biblia sola es la Palabra de Dios escrita, inerrante e infalible, y la única autoridad suprema e infalible para la fe y la vida del creyente. Ninguna tradición humana o enseñanza eclesiástica puede igualarse a ella.',
    reference: '2 Timoteo 3:16-17',
  },
  {
    latin: 'Sola Gratia',
    spanish: 'Solo por Gracia',
    n: '02',
    description: 'La salvación es completamente un don gratuito de Dios. No se gana ni se merece por ningún esfuerzo humano. Dios, en su misericordia soberana, elige salvar a los pecadores sin ningún mérito en ellos.',
    reference: 'Efesios 2:8-9',
  },
  {
    latin: 'Sola Fide',
    spanish: 'Solo por Fe',
    n: '03',
    description: 'Los pecadores son justificados solo por la fe en Jesucristo, no por obras. La fe que salva no es una mera profesión intelectual, sino una confianza viva y real en Cristo y en su obra redentora.',
    reference: 'Romanos 3:28',
  },
  {
    latin: 'Solus Christus',
    spanish: 'Solo Cristo',
    n: '04',
    description: 'Cristo es el único mediador entre Dios y los hombres. Su vida perfecta, muerte expiatoria y gloriosa resurrección son la única base de la reconciliación del pecador con Dios.',
    reference: '1 Timoteo 2:5',
  },
  {
    latin: 'Soli Deo Gloria',
    spanish: 'Solo a Dios la Gloria',
    n: '05',
    description: 'Toda la gloria pertenece únicamente a Dios. La salvación, desde su planeamiento eterno hasta su consumación final, es completamente la obra de Dios para la exhibición de su gloria.',
    reference: '1 Corintios 10:31',
  },
];

const DOCTRINES = [
  { title: 'Depravación Total', desc: 'Todo ser humano nace muerto espiritualmente y es incapaz de volver a Dios por sí mismo.' },
  { title: 'Elección Incondicional', desc: 'Dios elige soberanamente a quienes salvará, no basándose en méritos previstos.' },
  { title: 'Expiación Particular', desc: 'Cristo murió específicamente por los elegidos, asegurando su redención.' },
  { title: 'Gracia Irresistible', desc: 'El llamado eficaz del Espíritu Santo garantiza que los elegidos vendrán a Cristo.' },
  { title: 'Perseverancia de los Santos', desc: 'Los verdaderos creyentes perseverarán hasta el final, guardados por el poder de Dios.' },
];

export default function Creencias() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="relative pt-32 pb-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/rsc/img/what-believe-cover.png" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Doctrina</p>
          <h1 className="font-display text-5xl md:text-7xl text-white mb-6">Que <br/> Creemos</h1>
          <div className="w-12 h-px bg-[#c9a55a]" />
        </div>
      </div>

      {/* Solas */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="font-display text-3xl text-white mb-2">Las Cinco Solas</h2>
          <p className="text-white/30 text-sm max-w-xl">Los principios fundamentales recuperados durante la Reforma Protestante del siglo XVI.</p>
        </div>

        <div className="space-y-px bg-white/5">
          {SOLAS.map((sola, i) => (
            <motion.div
              key={sola.latin}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#0a0a0a] p-8 md:p-10 grid md:grid-cols-[80px_1fr_1fr] gap-6 items-start group hover:bg-white/2 transition-colors"
            >
              <div className="font-display text-4xl text-[#c9a55a]/20 group-hover:text-[#c9a55a]/40 transition-colors font-bold">
                {sola.n}
              </div>
              <div>
                <h3 className="font-display text-2xl text-white mb-1">{sola.latin}</h3>
                <p className="text-[#c9a55a] text-sm italic">{sola.spanish}</p>
              </div>
              <div>
                <p className="text-white/40 text-sm leading-relaxed mb-3">{sola.description}</p>
                <span className="text-[#c9a55a]/60 text-xs">{sola.reference}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TULIP */}
      <section className="border-t border-white/5 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Soteriología</p>
            <h2 className="font-display text-3xl text-white mb-2">Doctrinas de la Gracia</h2>
            <p className="text-white/30 text-sm max-w-xl">Conocidas como TULIP, estas cinco doctrinas describen la naturaleza de la salvación según las Escrituras.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-px bg-white/5">
            {'TULIP'.split('').map((letter, i) => (
              <motion.div
                key={letter}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#0a0a0a] p-6 group hover:bg-[#c9a55a]/5 transition-colors"
              >
                <div className="font-display text-6xl text-[#c9a55a]/10 group-hover:text-[#c9a55a]/30 font-bold mb-4 transition-colors">
                  {letter}
                </div>
                <h3 className="text-white text-sm font-semibold mb-2">{DOCTRINES[i].title}</h3>
                <p className="text-white/30 text-xs leading-relaxed">{DOCTRINES[i].desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Confession CTA */}
      <section className="border-t border-white/5 py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-px bg-[#c9a55a] mx-auto mb-8" />
          <h2 className="font-display text-3xl text-white mb-4">Confesión de Fe de 1689</h2>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Como iglesia confesional, adoptamos la Segunda Confesión Bautista de Londres de 1689 
            como expresión fiel de lo que enseñan las Escrituras acerca de la fe cristiana.
          </p>
          <a
            href="https://www.chapellibrary.org/pdf/books/lbcos.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-[#c9a55a]/40 hover:bg-[#c9a55a] hover:text-black text-[#c9a55a] px-8 py-4 text-sm transition-all duration-300 group"
          >
            <BookOpen className="w-4 h-4" />
            Leer Confesión de Fe
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
}