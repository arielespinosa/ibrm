"use client";

import { useState } from 'react';
import { FileText, Plus, Pencil, Trash2, Eye, Calendar, Clock } from 'lucide-react';
import Modal from '@/components/admin/Modal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { InputField, TextareaField, SelectField, CheckboxField, FormActions } from '@/components/admin/FormField';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  published: boolean;
  createdAt: string;
  thumbnail?: string;
}

// Static data for now - will be replaced with API when blog table is added
const staticPosts: BlogPost[] = [
  {
    id: '1',
    title: 'La importancia de la oracion diaria',
    excerpt: 'Descubre como la oracion puede transformar tu vida espiritual...',
    content: 'Contenido completo del articulo...',
    author: 'Pastor Juan',
    category: 'Devocional',
    published: true,
    createdAt: '2024-01-15',
    thumbnail: '',
  },
  {
    id: '2',
    title: 'Estudio sobre el libro de Romanos',
    excerpt: 'Un analisis profundo de la epistola de Pablo a los Romanos...',
    content: 'Contenido completo del articulo...',
    author: 'Pastor Pedro',
    category: 'Estudio Biblico',
    published: true,
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'Proximo retiro de jovenes',
    excerpt: 'Informacion sobre el retiro de jovenes programado para marzo...',
    content: 'Contenido completo del articulo...',
    author: 'Ministerio de Jovenes',
    category: 'Anuncios',
    published: false,
    createdAt: '2024-01-20',
  },
];

const categories = [
  { value: 'Devocional', label: 'Devocional' },
  { value: 'Estudio Biblico', label: 'Estudio Biblico' },
  { value: 'Anuncios', label: 'Anuncios' },
  { value: 'Testimonios', label: 'Testimonios' },
  { value: 'Noticias', label: 'Noticias' },
];

const initialFormData = {
  title: '',
  excerpt: '',
  content: '',
  author: '',
  category: '',
  published: false,
  thumbnail: '',
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>(staticPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isSaving, setIsSaving] = useState(false);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  function handleAdd() {
    setEditingPost(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  }

  function handleEdit(post: BlogPost) {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      published: post.published,
      thumbnail: post.thumbnail || '',
    });
    setIsModalOpen(true);
  }

  function handleDelete(post: BlogPost) {
    setDeletingPost(post);
    setIsDeleteModalOpen(true);
  }

  function handleSave() {
    setIsSaving(true);
    
    setTimeout(() => {
      if (editingPost) {
        setPosts(posts.map(p => 
          p.id === editingPost.id 
            ? { ...p, ...formData }
            : p
        ));
      } else {
        const newPost: BlogPost = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setPosts([newPost, ...posts]);
      }
      
      setIsModalOpen(false);
      setIsSaving(false);
    }, 500);
  }

  function handleConfirmDelete() {
    if (!deletingPost) return;
    
    setIsSaving(true);
    setTimeout(() => {
      setPosts(posts.filter(p => p.id !== deletingPost.id));
      setIsDeleteModalOpen(false);
      setDeletingPost(null);
      setIsSaving(false);
    }, 500);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog</h1>
          <p className="text-white/60 mt-1">Gestiona los articulos del blog de la iglesia</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#c9a55a] hover:bg-[#b8944a] text-black font-medium rounded-lg transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo articulo
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar articulos..."
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#c9a55a]/50"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#c9a55a]/50"
        >
          <option value="" className="bg-[#111111]">Todas las categorias</option>
          {categories.map(cat => (
            <option key={cat.value} value={cat.value} className="bg-[#111111]">{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111111] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{posts.length}</p>
              <p className="text-sm text-white/60">Total articulos</p>
            </div>
          </div>
        </div>
        <div className="bg-[#111111] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Eye className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{posts.filter(p => p.published).length}</p>
              <p className="text-sm text-white/60">Publicados</p>
            </div>
          </div>
        </div>
        <div className="bg-[#111111] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{posts.filter(p => !p.published).length}</p>
              <p className="text-sm text-white/60">Borradores</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
            {post.thumbnail ? (
              <img src={post.thumbnail} alt={post.title} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-gradient-to-br from-[#c9a55a]/20 to-[#c9a55a]/5 flex items-center justify-center">
                <FileText className="w-12 h-12 text-[#c9a55a]/40" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-[#c9a55a]/20 text-[#c9a55a] text-xs rounded">
                  {post.category}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs ${post.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {post.published ? 'Publicado' : 'Borrador'}
                </span>
              </div>
              <h3 className="font-semibold text-white mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-sm text-white/60 mb-3 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.createdAt).toLocaleDateString('es-ES')}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-1.5 hover:bg-white/10 rounded transition-colors"
                  >
                    <Pencil className="w-4 h-4 text-white/60" />
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    className="p-1.5 hover:bg-red-500/10 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-white/40">
          No se encontraron articulos
        </div>
      )}

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? 'Editar articulo' : 'Nuevo articulo'}
        size="lg"
      >
        <div className="space-y-4">
          <InputField
            label="Titulo"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <TextareaField
            label="Extracto"
            name="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={2}
            placeholder="Breve descripcion del articulo..."
          />

          <TextareaField
            label="Contenido"
            name="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={8}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Autor"
              name="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
            />
            <SelectField
              label="Categoria"
              name="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={categories}
              required
            />
          </div>

          <InputField
            label="URL imagen destacada"
            name="thumbnail"
            type="url"
            value={formData.thumbnail}
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
          />

          <CheckboxField
            label="Publicar articulo"
            name="published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
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
        itemName={deletingPost?.title}
        isLoading={isSaving}
      />
    </div>
  );
}
