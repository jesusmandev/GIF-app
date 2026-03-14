import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Gif } from "../interface/gif.interface";

interface Props {
  gifs: Gif[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { stiffness: 200, damping: 20 } }
};

export const GifList = ({ gifs }: Props) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const downloadGif = async (gif: Gif) => {
    try {
      setDownloading(gif.id);
      const response = await fetch(gif.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${gif.title.replace(/\s+/g, '_')}.gif`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error descargando el GIF:', error);
    } finally {
      setDownloading(null);
    }
  };

  const copyToClipboard = (gif: Gif) => {
    navigator.clipboard.writeText(gif.url);
    setCopied(gif.id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (gifs.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col items-center justify-center p-12 text-center"
      >
        <div className="w-20 h-20 mb-6 relative opacity-60">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-400" />
          <div className="absolute bottom-2 right-2 w-10 h-1 bg-indigo-400 rotate-45 rounded-full" />
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent mb-2">
          Busca tu GIF favorito
        </h2>
        <p className="text-slate-400 text-lg max-w-md">
          Usa la barra de búsqueda para encontrar miles de GIFs flotantes en esta nebulosa.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 py-8">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="masonry-grid"
      >
        <AnimatePresence>
          {gifs.map(gif => (
            <motion.div 
              key={gif.id} 
              variants={itemVariants}
              layout
              className="masonry-item relative group"
            >
              <div className="neo-glass overflow-hidden transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(14,165,233,0.3)] border border-transparent hover:border-neo-cyan/30">
                {/* Image container */}
                <div className="relative w-full overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={gif.url} 
                    alt={gif.title} 
                    loading="lazy"
                    className="w-full h-auto block object-cover rounded-t-[2rem]"
                  />
                  
                  {/* Glass overlay actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f232e]/90 via-[#1f232e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <div className="flex gap-3 justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <button 
                        className="neo-button-secondary px-5 py-2 flex items-center gap-2 hover:text-neo-cyan"
                        onClick={() => downloadGif(gif)}
                        disabled={downloading === gif.id}
                        title="Descargar GIF"
                      >
                        {downloading === gif.id ? (
                          <>
                            <svg className="w-4 h-4 animate-spin text-neo-cyan" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Descargando...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Descargar
                          </>
                        )}
                      </button>
                      
                      <button 
                        className="neo-button-secondary px-5 py-2 flex items-center gap-2 hover:text-neo-blue"
                        onClick={() => copyToClipboard(gif)}
                        title="Copiar enlace"
                      >
                        {copied === gif.id ? (
                          <>
                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Copiado
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            Copiar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Info section below image */}
                <div className="p-5 border-t border-white/5">
                  <h3 className="text-sm font-medium text-slate-200 line-clamp-1 group-hover:text-neo-cyan transition-colors">
                    {gif.title || 'Untitled GIF'}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                    <span className="px-3 py-1 bg-white/5 rounded-full border border-white/5">
                      {gif.width} × {gif.height}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
