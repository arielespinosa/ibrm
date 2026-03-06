import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Youtube, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border border-amber-500 rounded-full flex items-center justify-center">
                <span className="text-amber-500 text-xl">✝</span>
              </div>
              <div>
                <h3 className="font-serif text-xl">Iglesia Bautista</h3>
                <p className="text-amber-400 text-sm">Reformada de Murcia</p>
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
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
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
                <Link to={createPageUrl('Home')} className="text-gray-400 hover:text-amber-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Sermones')} className="text-gray-400 hover:text-amber-400 transition-colors">
                  Sermones
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Estudios')} className="text-gray-400 hover:text-amber-400 transition-colors">
                  Estudios
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Blog')} className="text-gray-400 hover:text-amber-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Nosotros')} className="text-gray-400 hover:text-amber-400 transition-colors">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                Calle Pintor José María Párraga 1, Bajo 3
              </li>
              <li>
                Alcantarilla, Murcia
              </li>
              <li className="pt-2">
                <span className="text-amber-400">Domingos</span> 11:30 AM
              </li>
              <li>
                <span className="text-amber-400">Jueves</span> 18:00 PM
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
            Sola Scriptura • Sola Fide • Sola Gratia • Solus Christus • Soli Deo Gloria
          </p>
        </div>
      </div>
    </footer>
  );
}