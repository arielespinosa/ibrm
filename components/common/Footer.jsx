import React from 'react';
import { Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border border-[#c9a55a] rounded-full flex items-center justify-center">     
                <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/0b4c6b327_ChatGPT_Image_2_mar_2026__20_24_35-removebg-preview.png"
                    alt="IBRM Logo"
                    className="w-full h-full object-contain"
                />            
              </div>
              <div>
                <h3 className="text-xl">Iglesia Bautista</h3>
                <p className="text-[#c9a55a] text-sm">Reformada de Murcia</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Piedras vivas en común unión en Cristo, llamados a predicar el evangelio al mundo.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.youtube.com/@Iglesia-ibrm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="mailto:contacto@ibrm.es"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c9a55a] transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-white mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-[#c9a55a] transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/mmet-us" className="text-gray-400 hover:text-[#c9a55a] transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="/believe" className="text-gray-400 hover:text-[#c9a55a] transition-colors">
                  Creencias
                </a>
              </li>
              <li>
                <a href="/sermons" className="text-gray-400 hover:text-[#c9a55a] transition-colors">
                  Sermones
                </a>
              </li>
              <li>
                <a href="/studies" className="text-gray-400 hover:text-[#c9a55a] transition-colors">
                  Estudios
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-400 hover:text-[#c9a55a] transition-colors">
                  Reuniones
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-[#c9a55a] transition-colors">
                  Blog
                </a>
              </li>
                <li>
                <a href="/blog" className="text-gray-400 hover:text-[#c9a55a] transition-colors">
                  Donations
                </a>
              </li>
       
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                Calle Pintor José María Párraga 1, Bajo 3, Alcantarilla, Murcia
              </li>
              <li className="pt-2">
                <span className="text-[#c9a55a]">Domingos</span> 11:30 AM
              </li>
              <li>
                <span className="text-[#c9a55a]">Jueves</span> 18:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Iglesia Bautista Reformada de Murcia. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-sm italic">
            Desarrollado por <a className='text-[#c9a55a]' href='https://www.linkedin.com/in/ariel-penalver/'>Ariel Peñalver Espinosa</a>
          </p>
        </div>
      </div>
    </footer>
  );
}