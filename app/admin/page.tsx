"use client";

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Video, 
  Users, 
  Calendar, 
  FileText, 
  Mic,
  Library,
  TrendingUp,
  Eye,
  Clock
} from 'lucide-react';

const stats = [
  { label: 'Total Sermones', value: '124', icon: Mic, trend: '+12 este mes' },
  { label: 'Estudios', value: '48', icon: BookOpen, trend: '+3 este mes' },
  { label: 'Series Activas', value: '8', icon: Library, trend: '2 en progreso' },
  { label: 'Visitas Mensuales', value: '2.4k', icon: Eye, trend: '+18%' },
];

const quickActions = [
  { title: 'Nuevo Sermón', href: '/admin/sermons/new', color: 'bg-[#c9a55a] text-black' },
  { title: 'Nuevo Estudio', href: '/admin/studies/new', color: 'bg-white/10 text-white border border-white/10' },
  { title: 'Nueva Entrada', href: '/admin/blog/new', color: 'bg-white/10 text-white border border-white/10' },
  { title: 'Nuevo Evento', href: '/admin/events/new', color: 'bg-white/10 text-white border border-white/10' },
];

const recentActivity = [
  { action: 'Sermón publicado', item: 'La gracia de Dios', time: 'Hace 2 horas', icon: Mic },
  { action: 'Estudio actualizado', item: 'Romanos Capítulo 8', time: 'Hace 5 horas', icon: BookOpen },
  { action: 'Nueva serie creada', item: 'Fundamentos de la Fe', time: 'Ayer', icon: Library },
  { action: 'Evento programado', item: 'Conferencia Anual', time: 'Hace 2 días', icon: Calendar },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/60 mt-1">Resumen general de la administración</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-lg p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                <p className="text-[#c9a55a] text-xs mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </p>
              </div>
              <div className="w-10 h-10 bg-[#c9a55a]/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-[#c9a55a]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="lg:col-span-1 bg-white/5 border border-white/10 rounded-lg p-5"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <a
                key={action.title}
                href={action.href}
                className={`block text-center text-sm font-medium px-4 py-3 rounded-lg transition-colors hover:opacity-90 ${action.color}`}
              >
                {action.title}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="lg:col-span-2 bg-white/5 border border-white/10 rounded-lg p-5"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-5 h-5 text-white/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-sm text-white/60 truncate">{activity.item}</p>
                </div>
                <div className="flex items-center gap-1 text-white/40 text-xs">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Module Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white/5 border border-white/10 rounded-lg p-5"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Módulos de Administración</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { title: 'Sermones', icon: Mic, href: '/admin/sermons' },
            { title: 'Estudios', icon: BookOpen, href: '/admin/studies' },
            { title: 'Series', icon: Library, href: '/admin/series' },
            { title: 'Clases', icon: Video, href: '/admin/classes' },
            { title: 'Personas', icon: Users, href: '/admin/people' },
            { title: 'Eventos', icon: Calendar, href: '/admin/events' },
          ].map((module) => (
            <a
              key={module.title}
              href={module.href}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
            >
              <module.icon className="w-6 h-6 text-white/60 group-hover:text-[#c9a55a] transition-colors" />
              <span className="text-sm text-white/80 group-hover:text-white">{module.title}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
