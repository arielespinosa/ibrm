"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Tag } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    title: "La Importancia de la Oración en la Vida Cristiana",
    excerpt: "La oración es el medio por el cual nos comunicamos con Dios. Es esencial para el crecimiento espiritual y la comunión con nuestro Padre celestial.",
    category: "Vida Cristiana",
    date: "20 Ene 2024",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    featured: true,
    hasDetail: true,
  },
  {
    id: 2,
    title: "Entendiendo la Justificación por la Fe",
    excerpt: "La doctrina de la justificación por la fe sola es central en el evangelio. Expliquemos lo que significa ser declarado justo ante Dios.",
    category: "Doctrina",
    date: "15 Ene 2024",
    image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&q=80",
  },
  {
    id: 3,
    title: "El Hogar Cristiano: Fundamentos Bíblicos",
    excerpt: "La familia es una institución ordenada por Dios. Principios bíblicos para edificar hogares que glorifiquen a Dios.",
    category: "Familia",
    date: "10 Ene 2024",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
  },
  {
    id: 4,
    title: "Meditaciones sobre el Salmo 23",
    excerpt: "El Salmo 23 es uno de los pasajes más amados de las Escrituras. Exploramos las riquezas de este salmo.",
    category: "Devocional",
    date: "5 Ene 2024",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
  },
  {
    id: 5,
    title: "Compartiendo el Evangelio con Sabiduría",
    excerpt: "Principios bíblicos para el evangelismo personal y cómo comunicar las buenas nuevas de manera fiel.",
    category: "Evangelismo",
    date: "1 Ene 2024",
    image: "https://images.unsplash.com/photo-1445633743309-b60418bedbf2?w=800&q=80",
  },
  {
    id: 6,
    title: "La Soberanía de Dios en Tiempos Difíciles",
    excerpt: "Cuando enfrentamos pruebas, la doctrina de la soberanía de Dios nos consuela y nos ancla.",
    category: "Doctrina",
    date: "28 Dic 2023",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80",
  },
  {
    id: 7,
    title: "La Gracia Irresistible: Dios Llama y el Hombre Responde",
    excerpt: "Una de las doctrinas más incomprendidas y a la vez más consoladoras del evangelio: Dios llama eficazmente a los suyos.",
    category: "Doctrina",
    date: "15 Dic 2023",
    image: "https://images.unsplash.com/photo-1533000759938-aa0ba70beceb?w=800&q=80",
  },
];

const CATS = ['Todos', 'Doctrina', 'Vida Cristiana', 'Devocional', 'Familia', 'Evangelismo'];

export default function Blog() {
  const [cat, setCat] = useState('Todos');

  const filtered = cat === 'Todos' ? POSTS : POSTS.filter(p => p.category === cat);
  const featured = filtered.find(p => p.featured) || filtered[0];
  const rest = filtered.filter(p => p.id !== featured?.id);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="relative pt-32 pb-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/rsc/img/blog-cover.png" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-3">Artículos</p>
          <h1 className="font-display text-5xl md:text-7xl text-white mb-6">Devocionales <br/> y Blog</h1>
          <div className="w-12 h-px bg-[#c9a55a]" />
        </div>
      </div>

      {/* Cats */}
      <div className="border-b border-white/5 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-4 flex gap-1 flex-wrap">
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-1.5 text-xs tracking-wide transition-all duration-200 ${
                cat === c
                  ? 'bg-[#c9a55a] text-black font-semibold'
                  : 'text-white/40 hover:text-white border border-white/10 hover:border-white/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Featured */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group grid lg:grid-cols-2 gap-0 mb-12 cursor-pointer"
            onClick={() => console.log("Hola")}
          >
            <div className="relative overflow-hidden aspect-video lg:aspect-auto">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/80 lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent lg:hidden" />
            </div>
            <div className="bg-[#111] border border-white/5 p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#c9a55a] text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest">
                  {featured.category}
                </span>
                <span className="text-white/20 text-xs">{featured.date}</span>
              </div>
              <h2 className="font-display text-2xl lg:text-3xl text-white mb-4 group-hover:text-[#c9a55a] transition-colors">
                {featured.title}
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
              <button
                className="flex items-center gap-2 text-[#c9a55a] text-sm group/btn w-fit"
                onClick={() => console.log("Hola")}
              >
                Leer artículo
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {rest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-[#0a0a0a] group cursor-pointer hover:bg-white/2 transition-colors"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-3 h-3 text-[#c9a55a]" />
                  <span className="text-[#c9a55a] text-[10px] uppercase tracking-widest">{post.category}</span>
                  <span className="text-white/20 text-xs ml-auto">{post.date}</span>
                </div>
                <h3 className="text-white text-base font-medium leading-snug mb-3 group-hover:text-[#c9a55a] transition-colors">
                  {post.title}
                </h3>
                <p className="text-white/30 text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}