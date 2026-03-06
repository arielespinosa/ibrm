"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', page: 'Home' },
  { name: 'Nosotros', page: 'Nosotros' },
  { name: 'Creencias', page: 'Creencias' },
  { name: 'Sermones', page: 'Sermones' },
  { name: 'Estudios', page: 'Estudios' },
  { name: 'Reuniones', page: 'Reuniones' },
  { name: 'Blog', page: 'Blog' },
  { name: 'Donaciones', page: 'Donaciones' },
];

export default function Navbar({transparent=false}) {
    const currentPageName = "Home"; // This would typically come from your routing logic
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${transparent ? 'bg-transparent' : 'bg-black/80 backdrop-blur-xl'}`}
      >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
                <div className="w-10 h-10 flex-shrink-0 overflow-hidden">
                <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/0b4c6b327_ChatGPT_Image_2_mar_2026__20_24_35-removebg-preview.png"
                    alt="IBRM Logo"
                    className="w-full h-full object-contain"
                />
                </div>
                <span className="font-display text-white text-lg tracking-wide hidden sm:block">
                <span className="text-[#c9a55a]">IBR</span>M
                </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                <a href="#"
                    className={`text-sm tracking-wide transition-colors duration-200 relative group ${
                    currentPageName === link.page ? 'text-[#c9a55a]' : 'text-white/60 hover:text-white'
                    }`}
                >
                    {link.name}
                    <span className={`absolute -bottom-0.5 left-0 h-px bg-[#c9a55a] transition-all duration-300 ${
                    currentPageName === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </a>
                ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
                <a
                href="https://www.youtube.com/@Iglesia-ibrm/streams"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#c9a55a] hover:bg-[#b8944a] text-black text-sm font-medium px-4 py-2 transition-colors duration-200"
                >
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                En Vivo
                </a>
            </div>

            {/* Mobile toggle */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white p-1"
            >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
                >
                <div className="px-6 py-6 space-y-4">
                    {navLinks.map((link) => (
                    <Link
                        key={link.page}
                        to={createPageUrl(link.page)}
                        className={`block text-sm py-2 transition-colors ${
                        currentPageName === link.page ? 'text-[#c9a55a]' : 'text-white/60'
                        }`}
                    >
                        {link.name}
                    </Link>
                    ))}
                    <a
                    href="https://www.youtube.com/@Iglesia-ibrm/streams"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#c9a55a] text-black text-sm font-medium px-4 py-2 w-fit mt-2"
                    >
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    Ver En Vivo
                    </a>
                </div>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.header>
    );
}