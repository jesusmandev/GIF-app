import type { FC } from "react";
import { motion } from "framer-motion";

interface Props {
  searches: string[];
  onLabelClicked: (term: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { stiffness: 300, damping: 20 } }
};

export const PreviousSearches: FC<Props> = ({ searches, onLabelClicked }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center gap-4 w-full py-6 px-4"
    >
      <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500 font-medium">Búsquedas Recientes</h2>
      
      <motion.ul 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-wrap items-center justify-center gap-4 max-w-3xl"
      >
        {searches.map(term => (
          <motion.li 
            key={term}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onLabelClicked(term)}
            className="px-6 py-2 cursor-pointer text-sm neo-button-secondary"
          >
            {term}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}
