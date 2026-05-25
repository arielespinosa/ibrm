"use client";

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { InputField, TextareaField, SelectField, FormActions } from '@/components/admin/FormField';
import { 
  getChurchServices, 
  createChurchService, 
  updateChurchService, 
  deleteChurchService,
  ChurchService
} from '@/lib/api-client';

const initialFormData = {
  title: '',
  day: '',
  time: '',
};

const daysOfWeek = [
  { value: 'Lunes', label: 'Lunes' },
  { value: 'Martes', label: 'Martes' },
  { value: 'Miercoles', label: 'Miercoles' },
  { value: 'Jueves', label: 'Jueves' },
  { value: 'Viernes', label: 'Viernes' },
  { value: 'Sabado', label: 'Sabado' },
  { value: 'Domingo', label: 'Domingo' },
];

export default function EventsAdmin() {
  const [services, setServices] = useState<ChurchService[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ChurchService | null>(null);
  const [deletingService, setDeletingService] = useState<ChurchService | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isSaving, setIsSaving] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    loadServices();
  }, [currentPage, searchQuery]);

  async function loadServices() {
    setIsLoading(true);
    try {
      const response = await getChurchServices({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
      });
      setServices(response.data);
      setTotalItems(response.pagination.total);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleAdd() {
    setEditingService(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  }

  function handleEdit(service: ChurchService) {
    setEditingService(service);
    setFormData({
      title: service.title,
      day: service.day || '',
      time: service.time || '',
    });
    setIsModalOpen(true);
  }

  function handleDelete(service: ChurchService) {
    setDeletingService(service);
    setIsDeleteModalOpen(true);
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      if (editingService) {
        await updateChurchService(editingService.id, formData);
      } else {
        await createChurchService(formData);
      }
      
      setIsModalOpen(false);
      loadServices();
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deletingService) return;
    
    setIsSaving(true);
    try {
      await deleteChurchService(deletingService.id);
      setIsDeleteModalOpen(false);
      setDeletingService(null);
      loadServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    } finally {
      setIsSaving(false);
    }
  }

  const columns = [
    {
      key: 'title',
      label: 'Servicio',
      sortable: true,
      render: (service: ChurchService) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#c9a55a]/20 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#c9a55a]" />
          </div>
          <span className="font-medium">{service.title}</span>
        </div>
      ),
    },
    {
      key: 'day',
      label: 'Dia',
      render: (service: ChurchService) => (
        <span className="text-white/80">{service.day || '-'}</span>
      ),
    },
    {
      key: 'time',
      label: 'Hora',
      render: (service: ChurchService) => (
        <div className="flex items-center gap-2 text-white/80">
          <Clock className="w-4 h-4 text-white/40" />
          {service.time || '-'}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Eventos y Servicios</h1>
        <p className="text-white/60 mt-1">Gestiona los servicios y eventos de la iglesia</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111111] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalItems}</p>
              <p className="text-sm text-white/60">Servicios programados</p>
            </div>
          </div>
        </div>
        <div className="bg-[#111111] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{services.filter(s => s.day === 'Domingo').length}</p>
              <p className="text-sm text-white/60">Servicios dominicales</p>
            </div>
          </div>
        </div>
        <div className="bg-[#111111] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{services.filter(s => s.day !== 'Domingo').length}</p>
              <p className="text-sm text-white/60">Otros servicios</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={services}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        searchPlaceholder="Buscar servicios..."
        addButtonLabel="Nuevo servicio"
      />

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? 'Editar servicio' : 'Nuevo servicio'}
        size="sm"
      >
        <div className="space-y-4">
          <InputField
            label="Titulo"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="Ej: Culto dominical"
          />

          <SelectField
            label="Dia"
            name="day"
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            options={daysOfWeek}
            required
          />

          <InputField
            label="Hora"
            name="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />

          <FormActions
            onCancel={() => setIsModalOpen(false)}
            onSubmit={handleSave}
            isLoading={isSaving}
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={deletingService?.title}
        isLoading={isSaving}
      />
    </div>
  );
}
