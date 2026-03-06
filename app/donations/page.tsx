"use client"

import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';

export default function Donaciones() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-16">
      <div className="border-b border-white/5 pt-16 pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Apoya la Obra</p>
          <h1 className="font-display text-5xl md:text-6xl text-white">Donaciones</h1>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 border border-[#c9a55a]/40 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-7 h-7 text-[#c9a55a]" />
          </div>
          <h2 className="font-display text-3xl text-white mb-4">Sostén el ministerio</h2>
          <p className="text-white/40 leading-relaxed">
            Tu ofrenda contribuye al sostenimiento del ministerio de la Palabra, 
            la predicación del evangelio y las actividades de la iglesia en Alcantarilla, Murcia.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border border-white/8 p-10 mb-8 bg-white/2"
        >
          <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-6">Transferencia Bancaria</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-white/40 text-sm">Banco</span>
              <span className="text-white text-sm font-medium">CaixaBank</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-white/40 text-sm">Titular</span>
              <span className="text-white text-sm font-medium">Iglesia Bautista Reformada de Murcia</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-white/40 text-sm">IBAN</span>
              <span className="text-[#c9a55a] text-sm font-mono font-medium">ES00 0000 0000 0000 0000 0000</span>
            </div>
          </div>
          <p className="text-white/20 text-xs mt-6 italic">
            * Por favor contacta con nosotros para obtener los datos bancarios actualizados.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border border-white/5 p-8 bg-[#c9a55a]/5"
        >
          <blockquote className="font-display text-xl text-white/70 italic leading-relaxed text-center">
            "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad,
            porque Dios ama al dador alegre."
          </blockquote>
          <p className="text-[#c9a55a] text-xs text-center mt-4 tracking-widest">2 Corintios 9:7</p>
        </motion.div>
      </section>
    </div>
  );
}