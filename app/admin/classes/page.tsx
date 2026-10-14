"use client";

import { Video } from 'lucide-react';

export default function ClassesAdmin() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Clases</h1>
        <p className="text-white/60 mt-1">Gestiona las clases y cursos de la iglesia</p>
      </div>

      {/* Coming Soon */}
      <div className="bg-[#111111] border border-white/10 rounded-xl p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#c9a55a]/20 rounded-full mb-4">
          <Video className="w-8 h-8 text-[#c9a55a]" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Modulo en desarrollo</h2>
        <p className="text-white/60 max-w-md mx-auto">
          El modulo de gestion de clases estara disponible proximamente. 
          Aqui podras gestionar cursos, materiales y seguimiento de estudiantes.
        </p>
      </div>

      {/* Feature Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Cursos online</h3>
          <p className="text-sm text-white/60">
            Crea y gestiona cursos con videos, materiales descargables y evaluaciones.
          </p>
        </div>
        <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Seguimiento</h3>
          <p className="text-sm text-white/60">
            Realiza seguimiento del progreso de los estudiantes en cada curso.
          </p>
        </div>
        <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Certificados</h3>
          <p className="text-sm text-white/60">
            Genera certificados automaticos al completar los cursos.
          </p>
        </div>
      </div>
    </div>
  );
}
