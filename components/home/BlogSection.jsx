import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function BlogSection({ posts = [] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Placeholder posts
  const placeholderPosts = [
    {
      id: 1,
      title: "La Importancia de la Oración en la Vida Cristiana",
      excerpt: "La oración es el medio por el cual nos comunicamos con Dios. Es esencial para el crecimiento espiritual...",
      author: "Pastor",
      created_date: "2024-01-20",
      category: "vida_cristiana",
      featured_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
    },
    {
      id: 2,
      title: "Entendiendo la Justificación por la Fe",
      excerpt: "La doctrina de la justificación por la fe sola es central en el evangelio. Expliquemos lo que significa...",
      author: "Pastor",
      created_date: "2024-01-15",
      category: "doctrina",
      featured_image: "https://images.unsplash.com/photo-1519491050282-cf00c82424bf?w=600&q=80"
    },
    {
      id: 3,
      title: "El Hogar Cristiano: Fundamentos Bíblicos",
      excerpt: "La familia es una institución ordenada por Dios. Veamos cómo las Escrituras nos guían en el hogar...",
      author: "Pastor",
      created_date: "2024-01-10",
      category: "familia",
      featured_image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80"
    }
  ];

  const postsToShow = posts.length > 0 ? posts.slice(0, 3) : placeholderPosts;

  const categoryLabels = {
    devocional: 'Devocional',
    doctrina: 'Doctrina',
    vida_cristiana: 'Vida Cristiana',
    familia: 'Familia',
    evangelismo: 'Evangelismo'
  };

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <span className="text-amber-600 tracking-[0.3em] uppercase text-sm font-medium">
              Blog
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-4">
              Artículos Recientes
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mt-6" />
          </div>
          <Link to={createPageUrl('Blog')}>
            <Button
              variant="ghost"
              className="mt-6 md:mt-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50 group"
            >
              Ver todos los artículos
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 group cursor-pointer"
          >
            <Link to={createPageUrl('Blog')}>
              <div className="relative h-80 lg:h-full overflow-hidden">
                <img
                  src={postsToShow[0]?.featured_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"}
                  alt={postsToShow[0]?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="bg-amber-500 text-white px-3 py-1 text-sm mb-4 inline-block">
                    {categoryLabels[postsToShow[0]?.category] || 'Artículo'}
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl text-white mb-4 group-hover:text-amber-300 transition-colors">
                    {postsToShow[0]?.title}
                  </h3>
                  <div className="flex items-center gap-4 text-white/70 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {postsToShow[0]?.created_date && format(new Date(postsToShow[0].created_date), "d 'de' MMMM, yyyy", { locale: es })}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {postsToShow[0]?.author}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side Posts */}
          <div className="space-y-8">
            {postsToShow.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={createPageUrl('Blog')}>
                  <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                      <img
                        src={post.featured_image || "https://images.unsplash.com/photo-1519491050282-cf00c82424bf?w=200&q=80"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-amber-600 text-xs uppercase tracking-wide">
                        {categoryLabels[post.category] || 'Artículo'}
                      </span>
                      <h3 className="font-serif text-lg text-gray-900 mt-1 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-2">
                        {post.created_date && format(new Date(post.created_date), "d MMM, yyyy", { locale: es })}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}