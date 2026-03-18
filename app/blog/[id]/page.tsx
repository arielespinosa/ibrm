import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';

const ARTICLE = {
  id: 1,
  title: "La Importancia de la Oración en la Vida Cristiana",
  category: "Vida Cristiana",
  date: "20 de Enero, 2024",
  time: "10:00 AM",
  author: "Pr. Pedro Francisco Pérez",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
  content: [
    {
      type: "intro",
      text: "La oración no es simplemente un ritual religioso ni una práctica opcional para el cristiano. Es el medio divinamente ordenado por el cual el alma entra en comunión íntima con el Dios vivo. Es el aliento del creyente, el canal por el que la gracia desciende y la fe se fortalece."
    },
    {
      type: "heading",
      text: "¿Qué es la oración?"
    },
    {
      type: "paragraph",
      text: "La oración es, en su esencia más profunda, una conversación con Dios. No se trata de fórmulas repetidas sin reflexión, sino de un derramar del corazón ante el Señor. El Catecismo de Westminster define la oración como 'ofrecer nuestros deseos a Dios en el nombre de Cristo, con confesión de nuestros pecados y reconocimiento agradecido de sus misericordias'. Esta definición nos revela que la oración es multidimensional: abarca la alabanza, la confesión, la acción de gracias y la súplica."
    },
    {
      type: "heading",
      text: "La oración como medio de gracia"
    },
    {
      type: "paragraph",
      text: "Los reformadores entendían la oración como uno de los medios ordinarios de gracia. Dios ha prometido obrar mediante la oración respondida. No porque nuestra oración mueva el brazo de Dios como si Él necesitara ser persuadido, sino porque Dios en su soberanía ha dispuesto que Sus propósitos se cumplan a través de las oraciones de Su pueblo."
    },
    {
      type: "paragraph",
      text: "El apóstol Pablo exhorta a los Filipenses: 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias' (Filipenses 4:6). Esta no es una sugerencia piadosa, es un mandato apostólico respaldado por una promesa: 'y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús' (v.7)."
    },
    {
      type: "heading",
      text: "La disciplina de la oración"
    },
    {
      type: "paragraph",
      text: "Orar no es algo que el cristiano haga de manera espontánea y sin esfuerzo. La Escritura habla de 'perseverar en la oración' (Romanos 12:12), de 'orar sin cesar' (1 Tesalonicenses 5:17). Esto implica disciplina, constancia y un ejercicio deliberado de la fe. Los grandes santos de la historia de la Iglesia —Calvino, Lutero, Owen— fueron ante todo hombres de oración."
    },
    {
      type: "paragraph",
      text: "La oración privada, familiar y corporativa forman juntas la columna vertebral de la vida devocional cristiana. El culto público del domingo no reemplaza la oración personal, ni la devoción personal sustituye la oración congregacional. Cada una tiene su lugar y su función en la economía de la gracia."
    },
    {
      type: "heading",
      text: "Reflexión Final"
    },
    {
      type: "reflection",
      text: "Si algo nos dice el estado de nuestra vida de oración, es el estado de nuestra alma. Un cristiano que no ora es como una vid sin agua: puede mantenerse vivo por un tiempo, pero no florecerá ni dará fruto. La oración no es lo que hacemos para merecer la gracia de Dios, sino la respuesta natural de un corazón que ha sido transformado por esa gracia. Que cada uno de nosotros, examinando su vida, encuentre más motivos para arrodillarse ante el Señor y menos razones para confiar en sí mismo. Porque al final, toda la vida cristiana auténtica es una oración continua: 'Hágase tu voluntad así en la tierra como en el cielo.'"
    }
  ]
};

export default function ArticuloBlog() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={ARTICLE.image}
          alt={ARTICLE.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 px-6 lg:px-8 pb-12 max-w-4xl mx-auto">
          <span className="bg-[#c9a55a] text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest inline-block mb-4">
            {ARTICLE.category}
          </span>
          <h1 className="font-display text-3xl md:text-5xl text-white leading-tight">
            {ARTICLE.title}
          </h1>
        </div>
      </div>

      {/* Meta */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8 border-b border-white/5">
        <div className="flex flex-wrap items-center gap-6 text-white/30 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#c9a55a]" />
            <span className="text-white/60">{ARTICLE.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#c9a55a]" />
            <span>{ARTICLE.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#c9a55a]" />
            <span>{ARTICLE.time}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 lg:px-8 py-12"
      >
        <div className="space-y-6">
          {ARTICLE.content.map((block, i) => {
            if (block.type === 'intro') {
              return (
                <p key={i} className="text-white/70 text-lg leading-relaxed font-medium border-l-2 border-[#c9a55a] pl-6 italic">
                  {block.text}
                </p>
              );
            }
            if (block.type === 'heading') {
              return (
                <h2 key={i} className="font-display text-2xl text-white mt-10 mb-2">
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'paragraph') {
              return (
                <p key={i} className="text-white/50 text-base leading-relaxed">
                  {block.text}
                </p>
              );
            }
            if (block.type === 'reflection') {
              return (
                <div key={i} className="mt-10 bg-white/3 border border-[#c9a55a]/20 p-8">
                  <p className="text-[#c9a55a] text-xs tracking-[0.3em] uppercase mb-4">Reflexión Final</p>
                  <p className="text-white/60 text-base leading-relaxed italic">
                    {block.text}
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="mt-16 pt-8 border-t border-white/5">
          <a href="/blog" className="inline-flex items-center gap-2 text-white/30 hover:text-[#c9a55a] text-sm transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />Volver al Blog
          </a>
        </div>
      </motion.div>
    </div>
  );
}