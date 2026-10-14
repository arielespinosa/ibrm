"use client";

import { useState, useEffect } from 'react';
import { Library, Mic, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { InputField, TextareaField, CheckboxField, FormActions } from '@/components/admin/FormField';
import { validateForm, hasErrors, ValidationErrors } from '@/lib/form-validation';
import { 
  getSermonSeries, 
  createSermonSeries, 
  updateSermonSeries, 
  deleteSermonSeries,
  getStudySeries,
  createStudySeries,
  updateStudySeries,
  deleteStudySeries,
  SermonSeries,
  StudySeries
} from '@/lib/api-client';

type SeriesType = 'sermon' | 'study';

const initialSermonSeriesForm = {
  title: '',
  description: '',
  thumbnail_url: '',
  is_current_dominical: false,
};

const initialStudySeriesForm = {
  title: '',
  description: '',
  thumbnail: '',
  recomended: false,
  is_current_dominical: false,
};

export default function SeriesAdmin() {
  const [activeTab, setActiveTab] = useState<SeriesType>('sermon');
  const [sermonSeries, setSermonSeries] = useState<SermonSeries[]>([]);
  const [studySeries, setStudySeries] = useState<StudySeries[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SermonSeries | StudySeries | null>(null);
  const [deletingItem, setDeletingItem] = useState<SermonSeries | StudySeries | null>(null);
  const [sermonFormData, setSermonFormData] = useState(initialSermonSeriesForm);
  const [studyFormData, setStudyFormData] = useState(initialStudySeriesForm);
  const [formErrors, setFormErrors] = useState<ValidationErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    if (activeTab === 'sermon') {
      loadSermonSeries();
    } else {
      loadStudySeries();
    }
  }, [currentPage, searchQuery, activeTab]);

  async function loadSermonSeries() {
    setIsLoading(true);
    try {
      const response = await getSermonSeries({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
      });
      setSermonSeries(response.data);
      setTotalItems(response.pagination.total);
    } catch (error) {
      console.error('Error loading sermon series:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadStudySeries() {
    setIsLoading(true);
    try {
      const response = await getStudySeries({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
      });
      setStudySeries(response.data);
      setTotalItems(response.pagination.total);
    } catch (error) {
      console.error('Error loading study series:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleAdd() {
    setEditingItem(null);
    setFormErrors({});
    if (activeTab === 'sermon') {
      setSermonFormData(initialSermonSeriesForm);
    } else {
      setStudyFormData(initialStudySeriesForm);
    }
    setIsModalOpen(true);
  }

  function handleEdit(item: SermonSeries | StudySeries) {
    setEditingItem(item);
    setFormErrors({});
    if (activeTab === 'sermon') {
      const sermon = item as SermonSeries;
      setSermonFormData({
        title: sermon.title,
        description: sermon.description || '',
        thumbnail_url: sermon.thumbnail_url || '',
        is_current_dominical: sermon.is_current_dominical,
      });
    } else {
      const study = item as StudySeries;
      setStudyFormData({
        title: study.title,
        description: study.description || '',
        thumbnail: study.thumbnail || '',
        recomended: study.recomended || false,
        is_current_dominical: study.is_current_dominical,
      });
    }
    setIsModalOpen(true);
  }

  function handleDelete(item: SermonSeries | StudySeries) {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  }

  async function handleSave() {
    // Validate form based on active tab
    const dataToValidate = activeTab === 'sermon' ? sermonFormData : studyFormData;
    const errors = validateForm(
      dataToValidate,
      { title: { required: true, minLength: 3 } },
      { title: 'Titulo' }
    );

    if (hasErrors(errors)) {
      setFormErrors(errors);
      toast.error('Por favor, corrige los errores del formulario');
      return;
    }

    setFormErrors({});
    setIsSaving(true);
    try {
      if (activeTab === 'sermon') {
        if (editingItem) {
          await updateSermonSeries(editingItem.id, sermonFormData);
          toast.success('Serie de sermones actualizada correctamente');
        } else {
          await createSermonSeries(sermonFormData);
          toast.success('Serie de sermones creada correctamente');
        }
        loadSermonSeries();
      } else {
        if (editingItem) {
          await updateStudySeries(editingItem.id, studyFormData);
          toast.success('Serie de estudios actualizada correctamente');
        } else {
          await createStudySeries(studyFormData);
          toast.success('Serie de estudios creada correctamente');
        }
        loadStudySeries();
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving series:', error);
      toast.error('Error al guardar la serie');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deletingItem) return;
    
    setIsSaving(true);
    try {
      if (activeTab === 'sermon') {
        await deleteSermonSeries(deletingItem.id);
        loadSermonSeries();
        toast.success('Serie de sermones eliminada correctamente');
      } else {
        await deleteStudySeries(deletingItem.id);
        loadStudySeries();
        toast.success('Serie de estudios eliminada correctamente');
      }
      setIsDeleteModalOpen(false);
      setDeletingItem(null);
    } catch (error) {
      console.error('Error deleting series:', error);
      toast.error('Error al eliminar la serie');
    } finally {
      setIsSaving(false);
    }
  }

  const sermonColumns = [
    {
      key: 'title',
      label: 'Titulo',
      sortable: true,
      render: (item: SermonSeries) => (
        <div className="flex items-center gap-3">
          {item.thumbnail_url ? (
            <img 
              src={item.thumbnail_url} 
              alt={item.title}
              className="w-12 h-8 object-cover rounded"
            />
          ) : (
            <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
              <Mic className="w-4 h-4 text-white/40" />
            </div>
          )}
          <span className="font-medium">{item.title}</span>
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Descripcion',
      render: (item: SermonSeries) => (
        <span className="text-white/60 truncate max-w-xs block">
          {item.description || '-'}
        </span>
      ),
    },
    {
      key: 'ibrm_sermon',
      label: 'Sermones',
      render: (item: SermonSeries) => item.ibrm_sermon?.length || 0,
    },
    {
      key: 'is_current_dominical',
      label: 'Actual',
      render: (item: SermonSeries) => (
        <span className={`px-2 py-1 rounded text-xs ${item.is_current_dominical ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>
          {item.is_current_dominical ? 'Si' : 'No'}
        </span>
      ),
    },
  ];

  const studyColumns = [
    {
      key: 'title',
      label: 'Titulo',
      sortable: true,
      render: (item: StudySeries) => (
        <div className="flex items-center gap-3">
          {item.thumbnail ? (
            <img 
              src={item.thumbnail} 
              alt={item.title}
              className="w-12 h-8 object-cover rounded"
            />
          ) : (
            <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white/40" />
            </div>
          )}
          <span className="font-medium">{item.title}</span>
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Descripcion',
      render: (item: StudySeries) => (
        <span className="text-white/60 truncate max-w-xs block">
          {item.description || '-'}
        </span>
      ),
    },
    {
      key: 'ibrm_biblestudy',
      label: 'Estudios',
      render: (item: StudySeries) => item.ibrm_biblestudy?.length || 0,
    },
    {
      key: 'recomended',
      label: 'Recomendado',
      render: (item: StudySeries) => (
        <span className={`px-2 py-1 rounded text-xs ${item.recomended ? 'bg-[#c9a55a]/20 text-[#c9a55a]' : 'bg-white/10 text-white/40'}`}>
          {item.recomended ? 'Si' : 'No'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Series</h1>
        <p className="text-white/60 mt-1">Gestiona las series de sermones y estudios</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => { setActiveTab('sermon'); setCurrentPage(1); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'sermon' 
              ? 'bg-[#c9a55a]/20 text-[#c9a55a]' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Mic className="w-4 h-4" />
          Series de Sermones
        </button>
        <button
          onClick={() => { setActiveTab('study'); setCurrentPage(1); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'study' 
              ? 'bg-[#c9a55a]/20 text-[#c9a55a]' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Series de Estudios
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={(activeTab === 'sermon' ? sermonColumns : studyColumns) as any}
        data={(activeTab === 'sermon' ? sermonSeries : studySeries) as any}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        searchPlaceholder="Buscar series..."
        addButtonLabel="Nueva serie"
      />

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Editar serie' : 'Nueva serie'}
        size="md"
      >
        {activeTab === 'sermon' ? (
          <div className="space-y-4">
            <InputField
              label="Titulo"
              name="title"
              value={sermonFormData.title}
              onChange={(e) => setSermonFormData({ ...sermonFormData, title: e.target.value })}
              required
              error={formErrors.title}
            />

            <TextareaField
              label="Descripcion"
              name="description"
              value={sermonFormData.description}
              onChange={(e) => setSermonFormData({ ...sermonFormData, description: e.target.value })}
              rows={3}
            />

            <InputField
              label="URL miniatura"
              name="thumbnail_url"
              type="url"
              value={sermonFormData.thumbnail_url}
              onChange={(e) => setSermonFormData({ ...sermonFormData, thumbnail_url: e.target.value })}
            />

            <CheckboxField
              label="Serie dominical actual"
              name="is_current_dominical"
              checked={sermonFormData.is_current_dominical}
              onChange={(e) => setSermonFormData({ ...sermonFormData, is_current_dominical: e.target.checked })}
            />

            <FormActions
              onCancel={() => setIsModalOpen(false)}
              onSubmit={handleSave}
              isLoading={isSaving}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <InputField
              label="Titulo"
              name="title"
              value={studyFormData.title}
              onChange={(e) => setStudyFormData({ ...studyFormData, title: e.target.value })}
              required
              error={formErrors.title}
            />

            <TextareaField
              label="Descripcion"
              name="description"
              value={studyFormData.description}
              onChange={(e) => setStudyFormData({ ...studyFormData, description: e.target.value })}
              rows={3}
            />

            <InputField
              label="URL miniatura"
              name="thumbnail"
              type="url"
              value={studyFormData.thumbnail}
              onChange={(e) => setStudyFormData({ ...studyFormData, thumbnail: e.target.value })}
            />

            <CheckboxField
              label="Recomendado"
              name="recomended"
              checked={studyFormData.recomended}
              onChange={(e) => setStudyFormData({ ...studyFormData, recomended: e.target.checked })}
            />

            <CheckboxField
              label="Serie dominical actual"
              name="is_current_dominical"
              checked={studyFormData.is_current_dominical}
              onChange={(e) => setStudyFormData({ ...studyFormData, is_current_dominical: e.target.checked })}
            />

            <FormActions
              onCancel={() => setIsModalOpen(false)}
              onSubmit={handleSave}
              isLoading={isSaving}
            />
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={deletingItem?.title}
        isLoading={isSaving}
      />
    </div>
  );
}
