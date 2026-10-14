"use client";

import { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { InputField, TextareaField, SelectField, CheckboxField, FormActions } from '@/components/admin/FormField';
import { validateForm, hasErrors, ValidationErrors } from '@/lib/form-validation';
import { 
  getSermons, 
  createSermon, 
  updateSermon, 
  deleteSermon,
  getSermonSeries,
  getPersons,
  Sermon,
  SermonSeries,
  Person
} from '@/lib/api-client';

const initialFormData = {
  title: '',
  description: '',
  date: '',
  scripture: '',
  duration: '',
  video_url: '',
  youtube_video_id: '',
  thumbnail_url: '',
  speaker_id: '',
  serie_id: '',
  serie_orden: '',
  is_on_straming: false,
};

export default function SermonsAdmin() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [series, setSeries] = useState<SermonSeries[]>([]);
  const [speakers, setSpeakers] = useState<Person[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [deletingSermon, setDeletingSermon] = useState<Sermon | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState<ValidationErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    loadSermons();
    loadSeries();
    loadSpeakers();
  }, [currentPage, searchQuery]);

  async function loadSermons() {
    setIsLoading(true);
    try {
      const response = await getSermons({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
        orderBy: 'date',
        order: 'desc',
      });
      setSermons(response.data);
      setTotalItems(response.pagination.total);
    } catch (error) {
      console.error('Error loading sermons:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadSeries() {
    try {
      const response = await getSermonSeries({ limit: 100 });
      setSeries(response.data);
    } catch (error) {
      console.error('Error loading series:', error);
    }
  }

  async function loadSpeakers() {
    try {
      const response = await getPersons({ limit: 100 });
      setSpeakers(response.data);
    } catch (error) {
      console.error('Error loading speakers:', error);
    }
  }

  function handleAdd() {
    setEditingSermon(null);
    setFormData(initialFormData);
    setFormErrors({});
    setIsModalOpen(true);
  }

  function handleEdit(sermon: Sermon) {
    setEditingSermon(sermon);
    setFormErrors({});
    setFormData({
      title: sermon.title,
      description: sermon.description || '',
      date: sermon.date ? sermon.date.split('T')[0] : '',
      scripture: sermon.scripture || '',
      duration: sermon.duration || '',
      video_url: sermon.video_url || '',
      youtube_video_id: sermon.youtube_video_id || '',
      thumbnail_url: sermon.thumbnail_url || '',
      speaker_id: sermon.speaker_id || '',
      serie_id: sermon.serie_id || '',
      serie_orden: sermon.serie_orden?.toString() || '',
      is_on_straming: sermon.is_on_straming || false,
    });
    setIsModalOpen(true);
  }

  function handleDelete(sermon: Sermon) {
    setDeletingSermon(sermon);
    setIsDeleteModalOpen(true);
  }

  async function handleSave() {
    // Validate form
    const errors = validateForm(
      formData,
      {
        title: { required: true, minLength: 3 },
        date: { required: true },
        speaker_id: { required: true },
      },
      {
        title: 'Titulo',
        date: 'Fecha',
        speaker_id: 'Predicador',
      }
    );

    if (hasErrors(errors)) {
      setFormErrors(errors);
      toast.error('Por favor, corrige los errores del formulario');
      return;
    }

    setFormErrors({});
    setIsSaving(true);
    try {
      const data = {
        ...formData,
        serie_orden: formData.serie_orden ? parseInt(formData.serie_orden) : null,
        serie_id: formData.serie_id || null,
      };

      if (editingSermon) {
        await updateSermon(editingSermon.id, data);
        toast.success('Sermon actualizado correctamente');
      } else {
        await createSermon(data);
        toast.success('Sermon creado correctamente');
      }
      
      setIsModalOpen(false);
      loadSermons();
    } catch (error) {
      console.error('Error saving sermon:', error);
      toast.error('Error al guardar el sermon');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deletingSermon) return;
    
    setIsSaving(true);
    try {
      await deleteSermon(deletingSermon.id);
      setIsDeleteModalOpen(false);
      setDeletingSermon(null);
      loadSermons();
      toast.success('Sermon eliminado correctamente');
    } catch (error) {
      console.error('Error deleting sermon:', error);
      toast.error('Error al eliminar el sermon');
    } finally {
      setIsSaving(false);
    }
  }

  const columns = [
    {
      key: 'title',
      label: 'Titulo',
      sortable: true,
      render: (sermon: Sermon) => (
        <div className="flex items-center gap-3">
          {sermon.thumbnail_url ? (
            <img 
              src={sermon.thumbnail_url} 
              alt={sermon.title}
              className="w-12 h-8 object-cover rounded"
            />
          ) : (
            <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
              <Mic className="w-4 h-4 text-white/40" />
            </div>
          )}
          <span className="font-medium">{sermon.title}</span>
        </div>
      ),
    },
    {
      key: 'ibrm_person.name',
      label: 'Predicador',
      render: (sermon: Sermon) => sermon.ibrm_person?.name || '-',
    },
    {
      key: 'date',
      label: 'Fecha',
      sortable: true,
      render: (sermon: Sermon) => sermon.date ? new Date(sermon.date).toLocaleDateString('es-ES') : '-',
    },
    {
      key: 'ibrm_sermonserie.title',
      label: 'Serie',
      render: (sermon: Sermon) => sermon.ibrm_sermonserie?.title || '-',
    },
    {
      key: 'is_on_straming',
      label: 'En vivo',
      render: (sermon: Sermon) => (
        <span className={`px-2 py-1 rounded text-xs ${sermon.is_on_straming ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>
          {sermon.is_on_straming ? 'Si' : 'No'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Sermones</h1>
        <p className="text-white/60 mt-1">Gestiona los sermones de la iglesia</p>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={sermons}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        searchPlaceholder="Buscar sermones..."
        addButtonLabel="Nuevo sermon"
      />

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSermon ? 'Editar sermon' : 'Nuevo sermon'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Titulo"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              error={formErrors.title}
            />
            <InputField
              label="Fecha"
              name="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              error={formErrors.date}
            />
          </div>

          <TextareaField
            label="Descripcion"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Pasaje biblico"
              name="scripture"
              value={formData.scripture}
              onChange={(e) => setFormData({ ...formData, scripture: e.target.value })}
              placeholder="Ej: Juan 3:16"
            />
            <InputField
              label="Duracion"
              name="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="Ej: 45:30"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Predicador"
              name="speaker_id"
              value={formData.speaker_id}
              onChange={(e) => setFormData({ ...formData, speaker_id: e.target.value })}
              options={speakers.map(s => ({ value: s.id, label: s.name }))}
              required
              error={formErrors.speaker_id}
            />
            <SelectField
              label="Serie"
              name="serie_id"
              value={formData.serie_id}
              onChange={(e) => setFormData({ ...formData, serie_id: e.target.value })}
              options={series.map(s => ({ value: s.id, label: s.title }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Orden en serie"
              name="serie_orden"
              type="number"
              value={formData.serie_orden}
              onChange={(e) => setFormData({ ...formData, serie_orden: e.target.value })}
            />
            <InputField
              label="ID video YouTube"
              name="youtube_video_id"
              value={formData.youtube_video_id}
              onChange={(e) => setFormData({ ...formData, youtube_video_id: e.target.value })}
              placeholder="Ej: dQw4w9WgXcQ"
            />
          </div>

          <InputField
            label="URL video"
            name="video_url"
            type="url"
            value={formData.video_url}
            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
          />

          <InputField
            label="URL miniatura"
            name="thumbnail_url"
            type="url"
            value={formData.thumbnail_url}
            onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
          />

          <CheckboxField
            label="Esta en vivo ahora"
            name="is_on_straming"
            checked={formData.is_on_straming}
            onChange={(e) => setFormData({ ...formData, is_on_straming: e.target.checked })}
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
        itemName={deletingSermon?.title}
        isLoading={isSaving}
      />
    </div>
  );
}
