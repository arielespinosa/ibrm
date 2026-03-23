import React from 'react';
import { Youtube, Mail, Facebook, Phone } from 'lucide-react';

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
                <svg className="w-6 h-6 text-white-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M549.7 124.1C543.5 100.4 524.9 81.8 501.4 75.5 458.9 64 288.1 64 288.1 64S117.3 64 74.7 75.5C51.2 81.8 32.7 100.4 26.4 124.1 15 167 15 256.4 15 256.4s0 89.4 11.4 132.3c6.3 23.6 24.8 41.5 48.3 47.8 42.6 11.5 213.4 11.5 213.4 11.5s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.2 337.6l0-162.4 142.7 81.2-142.7 81.2z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100086207482452"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <svg className="w-6 h-6 text-white-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z"/>
                </svg>
              </a>
              <a
                href="https://whatsapp.com/channel/0029VaD9hXpDzgTKzuVItH3d"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <svg className="w-7 h-7 text-white-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/>
                </svg>
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
     {/*          <li>
                <a href="/blog" className="text-gray-400 hover:text-[#c9a55a] transition-colors">
                  Donations
                </a>
              </li> */}
       
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex flex-center items-center pt-2 gap-2">
                <Mail className="w-4 h-4" /> contacto@ibrm.es
              </li>
              <li className="flex flex-center items-center gap-2">
                <Phone className="w-4 h-4" /> 688 989 813 - 656 698 852
              </li>
              <li className="pt-2">
                Calle Pintor José María Párraga 1, Bajo 3, Alcantarilla, Murcia
              </li> 
              <li className="pt-2 pb-0">
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