"use client";

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { InputField, TextareaField, CheckboxField, FormActions } from '@/components/admin/FormField';
import { 
  getPersons, 
  createPerson, 
  updatePerson, 
  deletePerson,
  Person
} from '@/lib/api-client';

const initialFormData = {
  name: '',
  bio: '',
  avatar: '',
  email: '',
  is_pastor: false,
  is_ibrm_member: false,
  is_ibrm_pastor: false,
};

export default function PeopleAdmin() {
  const [people, setPeople] = useState<Person[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [deletingPerson, setDeletingPerson] = useState<Person | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isSaving, setIsSaving] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    loadPeople();
  }, [currentPage, searchQuery]);

  async function loadPeople() {
    setIsLoading(true);
    try {
      const response = await getPersons({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
      });
      setPeople(response.data);
      setTotalItems(response.pagination.total);
    } catch (error) {
      console.error('Error loading people:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleAdd() {
    setEditingPerson(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  }

  function handleEdit(person: Person) {
    setEditingPerson(person);
    setFormData({
      name: person.name,
      bio: person.bio || '',
      avatar: person.avatar || '',
      email: person.email || '',
      is_pastor: person.is_pastor,
      is_ibrm_member: person.is_ibrm_member,
      is_ibrm_pastor: person.is_ibrm_pastor,
    });
    setIsModalOpen(true);
  }

  function handleDelete(person: Person) {
    setDeletingPerson(person);
    setIsDeleteModalOpen(true);
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      if (editingPerson) {
        await updatePerson(editingPerson.id, formData);
      } else {
        await createPerson(formData);
      }
      
      setIsModalOpen(false);
      loadPeople();
    } catch (error) {
      console.error('Error saving person:', error);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deletingPerson) return;
    
    setIsSaving(true);
    try {
      await deletePerson(deletingPerson.id);
      setIsDeleteModalOpen(false);
      setDeletingPerson(null);
      loadPeople();
    } catch (error) {
      console.error('Error deleting person:', error);
    } finally {
      setIsSaving(false);
    }
  }

  const columns = [
    {
      key: 'name',
      label: 'Nombre',
      sortable: true,
      render: (person: Person) => (
        <div className="flex items-center gap-3">
          {person.avatar ? (
            <img 
              src={person.avatar} 
              alt={person.name}
              className="w-10 h-10 object-cover rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white/40" />
            </div>
          )}
          <div>
            <span className="font-medium block">{person.name}</span>
            {person.email && (
              <span className="text-xs text-white/40">{person.email}</span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'is_pastor',
      label: 'Pastor',
      render: (person: Person) => (
        <span className={`px-2 py-1 rounded text-xs ${person.is_pastor ? 'bg-purple-500/20 text-purple-400' : 'bg-white/10 text-white/40'}`}>
          {person.is_pastor ? 'Si' : 'No'}
        </span>
      ),
    },
    {
      key: 'is_ibrm_member',
      label: 'Miembro IBRM',
      render: (person: Person) => (
        <span className={`px-2 py-1 rounded text-xs ${person.is_ibrm_member ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white/40'}`}>
          {person.is_ibrm_member ? 'Si' : 'No'}
        </span>
      ),
    },
    {
      key: 'is_ibrm_pastor',
      label: 'Pastor IBRM',
      render: (person: Person) => (
        <span className={`px-2 py-1 rounded text-xs ${person.is_ibrm_pastor ? 'bg-[#c9a55a]/20 text-[#c9a55a]' : 'bg-white/10 text-white/40'}`}>
          {person.is_ibrm_pastor ? 'Si' : 'No'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Personas</h1>
        <p className="text-white/60 mt-1">Gestiona los pastores, predicadores y miembros</p>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={people}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        searchPlaceholder="Buscar personas..."
        addButtonLabel="Nueva persona"
      />

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPerson ? 'Editar persona' : 'Nueva persona'}
        size="md"
      >
        <div className="space-y-4">
          <InputField
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <TextareaField
            label="Biografia"
            name="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
          />

          <InputField
            label="URL avatar"
            name="avatar"
            type="url"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          />

          <div className="space-y-3 pt-2">
            <CheckboxField
              label="Es pastor"
              name="is_pastor"
              checked={formData.is_pastor}
              onChange={(e) => setFormData({ ...formData, is_pastor: e.target.checked })}
            />

            <CheckboxField
              label="Es miembro de IBRM"
              name="is_ibrm_member"
              checked={formData.is_ibrm_member}
              onChange={(e) => setFormData({ ...formData, is_ibrm_member: e.target.checked })}
            />

            <CheckboxField
              label="Es pastor de IBRM"
              name="is_ibrm_pastor"
              checked={formData.is_ibrm_pastor}
              onChange={(e) => setFormData({ ...formData, is_ibrm_pastor: e.target.checked })}
            />
          </div>

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
        itemName={deletingPerson?.name}
        isLoading={isSaving}
      />
    </div>
  );
}
