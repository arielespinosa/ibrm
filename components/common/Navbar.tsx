"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Sermon } from '@/api/types';
import { fetchSermons } from '@/api/objects-fetcher';


interface NavbarProps {
    currentPageName: string;
    transparent: boolean;
    isMobileMenuOpen: boolean, 
    setIsMobileMenuOpen: (open: boolean) => void;
}

export const navLinks = [
  { name: 'Inicio', page: '/' },
  { name: 'Nosotros', page: '/meet-us' },
  { name: 'Creencias', page: '/beliefs' },
  { name: 'Sermones', page: '/sermons' },
  { name: 'Estudios', page: '/studies' },
  { name: 'Reuniones', page: '/services' },
 /*  { name: 'Blog', page: '/blog' }, */
 /*  { name: 'Donaciones', page: '/donations' }, */
];

export default function Navbar({attr}: {attr: NavbarProps}) {
    const [streaming, setStreaming] = useState<Sermon>();

    useEffect(() => {
        async function loadStreaming(){
            const currentDate = new Date().toISOString().split('T')[0];
            const filterFields = [
                {field: "is_on_straming", value: true},
                {field: "date", value: currentDate},
            ]
            const data = await fetchSermons({filter:filterFields});
            setStreaming(data[0]);
        }
        loadStreaming();
    }, [])

    return (
        <motion.header
       initial={{ y: -80 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  style={{ width: '100vw' }}
  className={`fixed top-0 inset-x-0 z-50 overflow-x-hidden transition-all duration-500 ${
    attr.transparent ? 'bg-transparent' : 'bg-black/80 backdrop-blur-xl'
  }`}
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
                    <span className="text-[#c9a55a]">IBRM</span>
                </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link, key) => (
                <a key={key} href={link.page}
                    className={`text-sm tracking-wide transition-colors duration-200 relative group ${
                    attr.currentPageName === link.page ? 'text-[#c9a55a]' : 'text-white/60 hover:text-white'
                    }`}
                >
                    {link.name}
                    <span className={`absolute -bottom-0.5 left-0 h-px bg-[#c9a55a] transition-all duration-300 ${
                    attr.currentPageName === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </a>
                ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
                {streaming &&
                    <a
                        href={`https://www.youtube.com/watch?v=${streaming.youtube_video_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#c9a55a] hover:bg-[#b8944a] text-black text-sm font-medium px-4 py-2 transition-colors duration-200"
                    >
                        <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" /> Ver en vivo
                    </a>
                }
            </div>
            

            {/* Mobile toggle */}
            <button
                onClick={() => attr.setIsMobileMenuOpen(!attr.isMobileMenuOpen)}
                className="lg:hidden text-white p-1"
            >
                {attr.isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
            {attr.isMobileMenuOpen && (
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
                >
                <div className="px-6 py-6 space-y-4">
                    {navLinks.map((link) => (
                    <a
                        key={link.page}
                        href={link.page}
                        className={`block text-sm py-2 transition-colors ${
                        attr.currentPageName === link.page ? 'text-[#c9a55a]' : 'text-white/60'
                        }`}
                    >
                        {link.name}
                    </a>
                    ))}
                    {streaming &&
                        <a
                            href={`https://www.youtube.com/watch?v=${streaming.youtube_video_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-[#c9a55a] text-black text-sm font-medium px-4 py-2 w-fit mt-2"
                            >
                            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                            Ver en vivo
                        </a>
                    }
                </div>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.header>
    );
}