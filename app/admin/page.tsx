"use client";

import { useState } from 'react';
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
import Modal from '@/components/admin/Modal';
import { InputField, TextareaField, SelectField, CheckboxField, FormActions } from '@/components/admin/FormField';

const stats = [
  { label: 'Total Sermones', value: '124', icon: Mic, trend: '+12 este mes' },
  { label: 'Estudios', value: '48', icon: BookOpen, trend: '+3 este mes' },
  { label: 'Series Activas', value: '8', icon: Library, trend: '2 en progreso' },
  { label: 'Visitas Mensuales', value: '2.4k', icon: Eye, trend: '+18%' },
];

const quickActions = [
  { title: 'Nuevo Sermón', action: 'sermon', color: 'bg-[#c9a55a] text-black' },
  { title: 'Nuevo Estudio', action: 'study', color: 'bg-white/10 text-white border border-white/10' },
  { title: 'Nueva Entrada', action: 'entry', color: 'bg-white/10 text-white border border-white/10' },
  { title: 'Nuevo Evento', action: 'event', color: 'bg-white/10 text-white border border-white/10' },
];

const recentActivity = [
  { action: 'Sermón publicado', item: 'La gracia de Dios', time: 'Hace 2 horas', icon: Mic },
  { action: 'Estudio actualizado', item: 'Romanos Capítulo 8', time: 'Hace 5 horas', icon: BookOpen },
  { action: 'Nueva serie creada', item: 'Fundamentos de la Fe', time: 'Ayer', icon: Library },
  { action: 'Evento programado', item: 'Conferencia Anual', time: 'Hace 2 días', icon: Calendar },
];

type QuickActionType = 'sermon' | 'study' | 'entry' | 'event'

type FormDataState = {
  title?: string
  description?: string
  date?: string
  scripture?: string
  duration?: string
  speaker_id?: string
  serie_id?: string
  youtube_video_id?: string
  content?: string
  author_id?: string
  author?: string
  category?: string
  excerpt?: string
  thumbnail?: string
  file?: string
  published?: boolean
  day?: string
  time?: string
}

const defaultActionData: Record<QuickActionType, FormDataState> = {
  sermon: {
    title: '',
    description: '',
    date: '',
    scripture: '',
    duration: '',
    speaker_id: '',
    serie_id: '',
    youtube_video_id: '',
  },
  study: {
    title: '',
    description: '',
    content: '',
    author_id: '',
    serie_id: '',
    thumbnail: '',
    file: '',
  },
  entry: {
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Devocional',
    published: false,
    thumbnail: '',
  },
  event: {
    title: '',
    day: '',
    time: '',
  },
}

const categories = [
  { value: 'Devocional', label: 'Devocional' },
  { value: 'Estudio Biblico', label: 'Estudio Biblico' },
  { value: 'Anuncios', label: 'Anuncios' },
  { value: 'Testimonios', label: 'Testimonios' },
  { value: 'Noticias', label: 'Noticias' },
]

const daysOfWeek = [
  { value: 'Lunes', label: 'Lunes' },
  { value: 'Martes', label: 'Martes' },
  { value: 'Miercoles', label: 'Miercoles' },
  { value: 'Jueves', label: 'Jueves' },
  { value: 'Viernes', label: 'Viernes' },
  { value: 'Sabado', label: 'Sabado' },
  { value: 'Domingo', label: 'Domingo' },
]

export default function AdminDashboard() {
  const [activeAction, setActiveAction] = useState<QuickActionType | null>(null)
  const [formData, setFormData] = useState<FormDataState>(defaultActionData.sermon)
  const [isSaving, setIsSaving] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const openActionModal = (action: QuickActionType) => {
    setActiveAction(action)
    setFormData(defaultActionData[action])
    setSubmitError(null)
    setSuccessMessage(null)
  }

  const closeActionModal = () => {
    setActiveAction(null)
    setSubmitError(null)
  }

  const getModalTitle = () => {
    switch (activeAction) {
      case 'sermon': return 'Crear nuevo sermón'
      case 'study': return 'Crear nuevo estudio'
      case 'entry': return 'Crear nueva entrada'
      case 'event': return 'Crear nuevo evento'
      default: return ''
    }
  }

  const getModalDescription = () => {
    switch (activeAction) {
      case 'sermon': return 'Completa los datos básicos para publicar un nuevo sermón.'
      case 'study': return 'Crea un nuevo estudio bíblico para tu audiencia.'
      case 'entry': return 'Escribe una nueva entrada del blog o devocional.'
      case 'event': return 'Agrega un nuevo servicio o evento en el calendario.'
      default: return ''
    }
  }

  const buildPayload = () => {
    if (!activeAction) return {}
    switch (activeAction) {
      case 'sermon':
        return {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          scripture: formData.scripture,
          duration: formData.duration,
          speaker_id: formData.speaker_id,
          serie_id: formData.serie_id || null,
          youtube_video_id: formData.youtube_video_id || null,
        }
      case 'study':
        return {
          title: formData.title,
          description: formData.description,
          content: formData.content,
          author_id: formData.author_id,
          serie_id: formData.serie_id || null,
          thumbnail: formData.thumbnail || null,
          file: formData.file || null,
        }
      case 'entry':
        return {
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          author: formData.author,
          category: formData.category,
          published: formData.published,
          thumbnail: formData.thumbnail || null,
        }
      case 'event':
        return {
          title: formData.title,
          day: formData.day,
          time: formData.time,
        }
      default:
        return {}
    }
  }

  const getEndpoint = () => {
    switch (activeAction) {
      case 'sermon': return '/api/sermons'
      case 'study': return '/api/studies'
      case 'entry': return '/api/blog'
      case 'event': return '/api/church-services'
      default: return '/api'
    }
  }

  const handleActionSubmit = async () => {
    if (!activeAction) return
    setIsSaving(true)
    setSubmitError(null)
    try {
      const response = await fetch(getEndpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      })
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.message || 'No se pudo crear el elemento')
      }
      const result = await response.json()
      setSuccessMessage('Creado correctamente')
      closeActionModal()
      console.log('Creación exitosa:', result)
    } catch (error: unknown) {
      console.error('Error creando elemento rápido:', error)
      setSubmitError(error instanceof Error ? error.message : 'Error desconocido')
    } finally {
      setIsSaving(false)
    }
  }

  const renderModalBody = () => {
    switch (activeAction) {
      case 'sermon':
        return (
          <div className="grid gap-4">
            <InputField label="Título" name="title" value={formData.title ?? ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required placeholder="Título del sermón" />
            <TextareaField label="Descripción" name="description" value={formData.description ?? ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required placeholder="Breve descripción" />
            <InputField label="Fecha" name="date" type="date" value={formData.date ?? ''} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
            <InputField label="Escritura" name="scripture" value={formData.scripture ?? ''} onChange={(e) => setFormData({ ...formData, scripture: e.target.value })} required placeholder="Ej: Juan 3:16" />
            <InputField label="Duración" name="duration" value={formData.duration ?? ''} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required placeholder="Ej: 45 min" />
            <InputField label="ID del expositor" name="speaker_id" value={formData.speaker_id ?? ''} onChange={(e) => setFormData({ ...formData, speaker_id: e.target.value })} required placeholder="ID del speaker" />
            <InputField label="ID de serie" name="serie_id" value={formData.serie_id ?? ''} onChange={(e) => setFormData({ ...formData, serie_id: e.target.value })} placeholder="ID de serie (opcional)" />
            <InputField label="YouTube ID" name="youtube_video_id" value={formData.youtube_video_id ?? ''} onChange={(e) => setFormData({ ...formData, youtube_video_id: e.target.value })} placeholder="ID del video" />
          </div>
        )
      case 'study':
        return (
          <div className="grid gap-4">
            <InputField label="Título" name="title" value={formData.title ?? ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required placeholder="Título del estudio" />
            <InputField label="ID de autor" name="author_id" value={formData.author_id ?? ''} onChange={(e) => setFormData({ ...formData, author_id: e.target.value })} required placeholder="ID del autor" />
            <InputField label="ID de serie" name="serie_id" value={formData.serie_id ?? ''} onChange={(e) => setFormData({ ...formData, serie_id: e.target.value })} placeholder="ID de serie (opcional)" />
            <TextareaField label="Descripción" name="description" value={formData.description ?? ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required placeholder="Resumen del estudio" />
            <TextareaField label="Contenido" name="content" value={formData.content ?? ''} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required placeholder="Contenido completo" rows={6} />
            <InputField label="Thumbnail URL" name="thumbnail" value={formData.thumbnail ?? ''} onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })} placeholder="URL de miniatura" />
            <InputField label="Archivo" name="file" value={formData.file ?? ''} onChange={(e) => setFormData({ ...formData, file: e.target.value })} placeholder="URL del archivo" />
          </div>
        )
      case 'entry':
        return (
          <div className="grid gap-4">
            <InputField label="Título" name="title" value={formData.title ?? ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required placeholder="Título de la entrada" />
            <InputField label="Autor" name="author" value={formData.author ?? ''} onChange={(e) => setFormData({ ...formData, author: e.target.value })} required placeholder="Nombre del autor" />
            <TextareaField label="Extracto" name="excerpt" value={formData.excerpt ?? ''} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} required placeholder="Pequeña introducción" rows={3} />
            <TextareaField label="Contenido" name="content" value={formData.content ?? ''} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required placeholder="Texto completo" rows={6} />
            <SelectField label="Categoría" name="category" value={formData.category ?? ''} onChange={(e) => setFormData({ ...formData, category: e.target.value })} options={categories} required />
            <InputField label="URL de miniatura" name="thumbnail" value={formData.thumbnail ?? ''} onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })} placeholder="Opcional" />
            <CheckboxField label="Publicar ahora" name="published" checked={formData.published ?? false} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} />
          </div>
        )
      case 'event':
        return (
          <div className="grid gap-4">
            <InputField label="Título" name="title" value={formData.title ?? ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required placeholder="Nombre del servicio" />
            <SelectField label="Día" name="day" value={formData.day ?? ''} onChange={(e) => setFormData({ ...formData, day: e.target.value })} options={daysOfWeek} required />
            <InputField label="Hora" name="time" type="time" value={formData.time ?? ''} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="">
      {/* Header */}
      <div className="mb-2 sm:mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-xs sm:text-sm text-white/60 mt-1">Resumen general de la administración</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 py-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 md:p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-white/60 text-xs sm:text-sm truncate">{stat.label}</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-1 md:mt-2">{stat.value}</p>
                <p className="text-[#c9a55a] text-xs mt-1 md:mt-2 flex items-center gap-1 truncate">
                  <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3 flex-shrink-0" />
                  <span className="truncate">{stat.trend}</span>
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#c9a55a]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a55a]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 py-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="sm:col-span-1 lg:col-span-1 bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 md:p-5"
        >
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Acciones Rápidas</h2>
          {successMessage && (
            <div className="mb-3 sm:mb-4 rounded-lg border border-green-400/20 bg-green-500/10 p-2 sm:p-3 text-xs sm:text-sm text-green-200">
              {successMessage}
            </div>
          )}
          <div className="space-y-2 sm:space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.title}
                type="button"
                onClick={() => openActionModal(action.action as QuickActionType)}
                className={`w-full text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors hover:opacity-90 ${action.color}`}
              >
                {action.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="sm:col-span-1 lg:col-span-2 bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 md:p-5"
        >
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Actividad Reciente</h2>
          <div className="space-y-2 sm:space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-white">{activity.action}</p>
                  <p className="text-xs sm:text-sm text-white/60 truncate">{activity.item}</p>
                </div>
                <div className="flex items-center gap-1 text-white/40 text-xs flex-shrink-0">
                  <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span className="hidden sm:inline">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Module Links */}
      <Modal
        isOpen={activeAction !== null}
        onClose={closeActionModal}
        title={getModalTitle()}
        size="lg"
      >
        <div className="space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm text-white/60">{getModalDescription()}</p>
          {renderModalBody()}
          {submitError && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 sm:p-3 text-xs sm:text-sm text-red-200">
              {submitError}
            </div>
          )}
          <FormActions
            onCancel={closeActionModal}
            onSubmit={handleActionSubmit}
            isLoading={isSaving}
            submitLabel="Crear"
            cancelLabel="Cancelar"
          />
        </div>
      </Modal>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white/5 my-2 border border-white/10 rounded-lg p-3 sm:p-4 md:p-5"
      >
        <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Módulos de Administración</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
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
              className="flex flex-col items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 md:p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
            >
              <module.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 group-hover:text-[#c9a55a] transition-colors" />
              <span className="text-xs sm:text-sm text-center text-white/80 group-hover:text-white leading-tight">{module.title}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
