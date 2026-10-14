"use client";

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { InputField, TextareaField, SelectField, FormActions } from '@/components/admin/FormField';
import { validateForm, hasErrors, ValidationErrors } from '@/lib/form-validation';
import { 
  getStudies, 
  createStudy, 
  updateStudy, 
  deleteStudy,
  getStudySeries,
  getPersons,
  Study,
  StudySeries,
  Person
} from '@/lib/api-client';

const initialFormData = {
  title: '',
  description: '',
  content: '',
  author_id: '',
  serie_id: '',
  serie_order: '',
  thumbnail: '',
  file: '',
};

export default function StudiesAdmin() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [series, setSeries] = useState<StudySeries[]>([]);
  const [authors, setAuthors] = useState<Person[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState<Study | null>(null);
  const [deletingStudy, setDeletingStudy] = useState<Study | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState<ValidationErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    loadStudies();
    loadSeries();
    loadAuthors();
  }, [currentPage, searchQuery]);

  async function loadStudies() {
    setIsLoading(true);
    try {
      const response = await getStudies({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
        orderBy: 'created',
        order: 'desc',
      });
      setStudies(response.data);
      setTotalItems(response.pagination.total);
    } catch (error) {
      console.error('Error loading studies:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadSeries() {
    try {
      const response = await getStudySeries({ limit: 100 });
      setSeries(response.data);
    } catch (error) {
      console.error('Error loading series:', error);
    }
  }

  async function loadAuthors() {
    try {
      const response = await getPersons({ limit: 100 });
      setAuthors(response.data);
    } catch (error) {
      console.error('Error loading authors:', error);
    }
  }

  function handleAdd() {
    setEditingStudy(null);
    setFormData(initialFormData);
    setFormErrors({});
    setIsModalOpen(true);
  }

  function handleEdit(study: Study) {
    setEditingStudy(study);
    setFormErrors({});
    setFormData({
      title: study.title,
      description: study.description || '',
      content: study.content || '',
      author_id: study.author_id || '',
      serie_id: study.serie_id || '',
      serie_order: study.serie_order?.toString() || '',
      thumbnail: study.thumbnail || '',
      file: study.file || '',
    });
    setIsModalOpen(true);
  }

  function handleDelete(study: Study) {
    setDeletingStudy(study);
    setIsDeleteModalOpen(true);
  }

  async function handleSave() {
    // Validate form
    const errors = validateForm(
      formData,
      {
        title: { required: true, minLength: 3 },
        author_id: { required: true },
      },
      {
        title: 'Titulo',
        author_id: 'Autor',
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
        serie_order: formData.serie_order ? parseInt(formData.serie_order) : null,
        serie_id: formData.serie_id || null,
      };

      if (editingStudy) {
        await updateStudy(editingStudy.id, data);
        toast.success('Estudio actualizado correctamente');
      } else {
        await createStudy(data);
        toast.success('Estudio creado correctamente');
      }
      
      setIsModalOpen(false);
      loadStudies();
    } catch (error) {
      console.error('Error saving study:', error);
      toast.error('Error al guardar el estudio');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deletingStudy) return;
    
    setIsSaving(true);
    try {
      await deleteStudy(deletingStudy.id);
      setIsDeleteModalOpen(false);
      setDeletingStudy(null);
      loadStudies();
      toast.success('Estudio eliminado correctamente');
    } catch (error) {
      console.error('Error deleting study:', error);
      toast.error('Error al eliminar el estudio');
    } finally {
      setIsSaving(false);
    }
  }

  const columns = [
    {
      key: 'title',
      label: 'Titulo',
      sortable: true,
      render: (study: Study) => (
        <div className="flex items-center gap-3">
          {study.thumbnail ? (
            <img 
              src={study.thumbnail} 
              alt={study.title}
              className="w-12 h-8 object-cover rounded"
            />
          ) : (
            <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white/40" />
            </div>
          )}
          <span className="font-medium">{study.title}</span>
        </div>
      ),
    },
    {
      key: 'ibrm_person.name',
      label: 'Autor',
      render: (study: Study) => study.ibrm_person?.name || '-',
    },
    {
      key: 'ibrm_biblestudyserie.title',
      label: 'Serie',
      render: (study: Study) => study.ibrm_biblestudyserie?.title || '-',
    },
    {
      key: 'created',
      label: 'Fecha',
      sortable: true,
      render: (study: Study) => study.created ? new Date(study.created).toLocaleDateString('es-ES') : '-',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Estudios Biblicos</h1>
        <p className="text-white/60 mt-1">Gestiona los estudios biblicos de la iglesia</p>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={studies}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        searchPlaceholder="Buscar estudios..."
        addButtonLabel="Nuevo estudio"
      />

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStudy ? 'Editar estudio' : 'Nuevo estudio'}
        size="lg"
      >
        <div className="space-y-4">
          <InputField
            label="Titulo"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            error={formErrors.title}
          />

          <TextareaField
            label="Descripcion"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />

          <TextareaField
            label="Contenido"
            name="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={6}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Autor"
              name="author_id"
              value={formData.author_id}
              onChange={(e) => setFormData({ ...formData, author_id: e.target.value })}
              options={authors.map(a => ({ value: a.id, label: a.name }))}
              required
              error={formErrors.author_id}
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
              name="serie_order"
              type="number"
              value={formData.serie_order}
              onChange={(e) => setFormData({ ...formData, serie_order: e.target.value })}
            />
            <InputField
              label="URL archivo"
              name="file"
              type="url"
              value={formData.file}
              onChange={(e) => setFormData({ ...formData, file: e.target.value })}
            />
          </div>

          <InputField
            label="URL miniatura"
            name="thumbnail"
            type="url"
            value={formData.thumbnail}
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
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
        itemName={deletingStudy?.title}
        isLoading={isSaving}
      />
    </div>
  );
}
