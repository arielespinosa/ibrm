"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Video, 
  Users, 
  Calendar, 
  FileText, 
  Settings,
  LogOut,
  ChevronRight,
  LayoutDashboard,
  Mic,
  Library
} from 'lucide-react';

const adminModules = [
  {
    title: 'Sermones',
    description: 'Gestionar sermones y predicaciones',
    icon: Mic,
    href: '/admin/sermons',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  },
  {
    title: 'Estudios',
    description: 'Administrar estudios bíblicos',
    icon: BookOpen,
    href: '/admin/studies',
    color: 'bg-green-500/10 text-green-400 border-green-500/20'
  },
  {
    title: 'Series',
    description: 'Organizar series de sermones y estudios',
    icon: Library,
    href: '/admin/series',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  },
  {
    title: 'Clases',
    description: 'Gestionar clases y cursos',
    icon: Video,
    href: '/admin/classes',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
  },
  {
    title: 'Personas',
    description: 'Administrar predicadores y maestros',
    icon: Users,
    href: '/admin/people',
    color: 'bg-pink-500/10 text-pink-400 border-pink-500/20'
  },
  {
    title: 'Eventos',
    description: 'Gestionar eventos y reuniones',
    icon: Calendar,
    href: '/admin/events',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  },
  {
    title: 'Blog',
    description: 'Publicar y editar artículos',
    icon: FileText,
    href: '/admin/blog',
    color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
  },
  {
    title: 'Configuración',
    description: 'Ajustes generales del sitio',
    icon: Settings,
    href: '/admin/settings',
    color: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  },
];

export default function AdminDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#c9a55a]/30 border-t-[#c9a55a] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#0d0d0d] to-black pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#c9a55a]/20 rounded-full flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-[#c9a55a]" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Panel de Administración</h1>
                <p className="text-white/60">Bienvenido, <span className="text-[#c9a55a]">{user?.username}</span></p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-white/80 hover:text-red-400 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </div>
        </motion.div>

        {/* Modules Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {adminModules.map((module, index) => (
            <motion.a
              key={module.title}
              href={module.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-6 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg ${module.color} border flex items-center justify-center mb-4`}>
                <module.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                {module.title}
                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </h3>
              <p className="text-white/60 text-sm">{module.description}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-white/5 border border-white/10 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Acciones rápidas</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/sermons/new"
              className="bg-[#c9a55a] hover:bg-[#b8944a] text-black text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              + Nuevo Sermón
            </a>
            <a
              href="/admin/studies/new"
              className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/10"
            >
              + Nuevo Estudio
            </a>
            <a
              href="/admin/blog/new"
              className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/10"
            >
              + Nueva Entrada
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
