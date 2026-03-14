import { motion } from 'framer-motion';

interface Props {
  title: string;
  description: string;
}

export const CustomHeader = ({ title, description }: Props) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center py-10 px-4 w-full"
    >
      <div className="px-8 py-6 relative">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white drop-shadow-lg"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h1>
        
        {description && (
          <motion.p 
            className="text-slate-400 text-lg md:text-xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
