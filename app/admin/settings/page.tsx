"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { 
  Settings, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Image, 
  Save,
  Church,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import { InputField, TextareaField, FormActions } from '@/components/admin/FormField';

interface SiteSettings {
  churchName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  favicon: string;
  socialFacebook: string;
  socialInstagram: string;
  socialYoutube: string;
  socialTwitter: string;
}

const defaultSettings: SiteSettings = {
  churchName: 'Iglesia Bautista Reformada de Murcia',
  tagline: 'Una iglesia para la gloria de Dios',
  description: 'Somos una iglesia comprometida con la predicacion fiel de la Palabra de Dios y el cuidado pastoral de sus miembros.',
  email: 'contacto@ibrm.es',
  phone: '+34 666 777 888',
  address: 'Calle Principal 123, 30001 Murcia, Espana',
  logo: '',
  favicon: '',
  socialFacebook: 'https://facebook.com/ibrm',
  socialInstagram: 'https://instagram.com/ibrm',
  socialYoutube: 'https://youtube.com/@ibrm',
  socialTwitter: '',
};

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('general');

  function handleSave() {
    setIsSaving(true);
    // Simulate save - would connect to API
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Configuracion guardada correctamente');
    }, 1000);
  }

  const sections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'contact', label: 'Contacto', icon: Mail },
    { id: 'social', label: 'Redes sociales', icon: Globe },
    { id: 'branding', label: 'Marca', icon: Image },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Configuracion</h1>
        <p className="text-white/60 mt-1">Ajusta la configuracion general del sitio web</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-[#c9a55a]/20 text-[#c9a55a] border-l-2 border-[#c9a55a]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
            {activeSection === 'general' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="p-2 bg-[#c9a55a]/20 rounded-lg">
                    <Church className="w-5 h-5 text-[#c9a55a]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Informacion General</h2>
                    <p className="text-sm text-white/60">Configura la informacion basica de la iglesia</p>
                  </div>
                </div>

                <InputField
                  label="Nombre de la iglesia"
                  name="churchName"
                  value={settings.churchName}
                  onChange={(e) => setSettings({ ...settings, churchName: e.target.value })}
                  required
                />

                <InputField
                  label="Eslogan"
                  name="tagline"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  placeholder="Una frase corta que describe la iglesia"
                />

                <TextareaField
                  label="Descripcion"
                  name="description"
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={4}
                  placeholder="Descripcion de la iglesia para SEO y redes sociales"
                />
              </div>
            )}

            {activeSection === 'contact' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Informacion de Contacto</h2>
                    <p className="text-sm text-white/60">Datos de contacto que se mostraran en el sitio</p>
                  </div>
                </div>

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                />

                <InputField
                  label="Telefono"
                  name="phone"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                />

                <TextareaField
                  label="Direccion"
                  name="address"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  rows={2}
                />
              </div>
            )}

            {activeSection === 'social' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Globe className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Redes Sociales</h2>
                    <p className="text-sm text-white/60">Enlaces a las redes sociales de la iglesia</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                      <Facebook className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <InputField
                        label="Facebook"
                        name="socialFacebook"
                        type="url"
                        value={settings.socialFacebook}
                        onChange={(e) => setSettings({ ...settings, socialFacebook: e.target.value })}
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/20 rounded-lg">
                      <Instagram className="w-5 h-5 text-pink-400" />
                    </div>
                    <div className="flex-1">
                      <InputField
                        label="Instagram"
                        name="socialInstagram"
                        type="url"
                        value={settings.socialInstagram}
                        onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <Youtube className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <InputField
                        label="YouTube"
                        name="socialYoutube"
                        type="url"
                        value={settings.socialYoutube}
                        onChange={(e) => setSettings({ ...settings, socialYoutube: e.target.value })}
                        placeholder="https://youtube.com/@..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'branding' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Image className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Marca e Imagenes</h2>
                    <p className="text-sm text-white/60">Logo y elementos visuales del sitio</p>
                  </div>
                </div>

                <InputField
                  label="URL del logo"
                  name="logo"
                  type="url"
                  value={settings.logo}
                  onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
                  placeholder="https://..."
                />

                <InputField
                  label="URL del favicon"
                  name="favicon"
                  type="url"
                  value={settings.favicon}
                  onChange={(e) => setSettings({ ...settings, favicon: e.target.value })}
                  placeholder="https://..."
                />

                {settings.logo && (
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-sm text-white/60 mb-2">Vista previa del logo:</p>
                    <img src={settings.logo} alt="Logo preview" className="max-h-20 object-contain" />
                  </div>
                )}
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#c9a55a] hover:bg-[#b8944a] text-black font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
