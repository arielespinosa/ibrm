import { motion } from 'framer-motion';
import { BibleStudy } from '@/api/types';
import { supabaseObjectsBaseUrl } from '@/lib/utils';

export default function StudySerieCardList({serieStudies}:{serieStudies: BibleStudy[]}) {
  
  return (
    <div className="space-y-px bg-white/5">
        {serieStudies.map((study, i) => (
        <a key={study.id} href={`studies/${study.id}`}>
            <motion.div               
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="bg-[#0a0a0a] p-6 grid sm:grid-cols-[100px_1fr_auto] gap-4 items-center group hover:bg-white/2 transition-colors"
            >
            <div className="overflow-hidden w-24 h-16 flex-shrink-0 hidden sm:block">
                <img src={`${supabaseObjectsBaseUrl}${study.thumbnail}`} alt={study.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>
            <div>
                <h3 className="text-white text-sm font-medium mt-0.5 group-hover:text-[#c9a55a] transition-colors">{study.title}</h3>
                <p className="text-white/25 text-xs mt-1 line-clamp-1">{study.description}</p>
            </div>
            </motion.div>
        </a>
        ))}
    </div>
  );
}